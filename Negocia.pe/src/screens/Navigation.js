import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import ChatsGeneralesScreen from './ChatsGeneralesScreen';
import ChatScreen from './ChatScreen';
import { NavigationContainer } from '@react-navigation/native';




const Stack = createStackNavigator();

const Navigation = ({ authenticated, setAuthenticated }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login">
          {props => (
            <LoginScreen
              {...props}
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          )}
        </Stack.Screen>
        {authenticated ? (
          <>
            <Stack.Screen name="ChatsGeneralesScreen" component={ChatsGeneralesScreen} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
          </>
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
