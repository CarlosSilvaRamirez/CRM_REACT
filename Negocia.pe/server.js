const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

const app = express();
app.use(bodyParser.json());

// Configura la conexión a la base de datos
const db = mysql.createPool({
  host: 'database-1.ck6ibo6sc49a.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'negocialabsackeyy1',
  database: 'database1',
});

// Ruta de autenticación
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      res.status(401).json({ error: 'Usuario no encontrado' });
      return;
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ error: 'Credenciales incorrectas' });
      return;
    }

    res.json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error de servidor' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
