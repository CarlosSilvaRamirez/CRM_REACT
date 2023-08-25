import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/screens/Navigation';
import { NavigationContainer } from '@react-navigation/native';


const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      <Navigation
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
    </NavigationContainer>
  );
};

export default App;
