import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const RegistroScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrate</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombres"
        placeholderTextColor="#FFA500"
        name="first_name"
      />
      <TextInput
        style={styles.input}
        placeholder="Apellidos"
        placeholderTextColor="#FFA500"
        name="lastname"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefono"
        placeholderTextColor="#FFA500"
        name="telefono"
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#FFA500"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#FFA500"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#FFA500',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegistroScreen;
