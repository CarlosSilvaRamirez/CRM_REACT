import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ButtonComponent from '../components/ButtonComponent';

const WelcomeScreen = ({ navigation }) => {
  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a Negocia.pe</Text>
      <ButtonComponent style={styles.buttom}
        title="Inicio de Sesión"
        onPress={() => navigation.navigate('Login')}
      />
      <ButtonComponent
        title="Registro"
        onPress={() => navigation.navigate('Registro')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
   color: 'orange',
  },

});

export default WelcomeScreen;
