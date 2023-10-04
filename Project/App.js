import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { firebase } from './config';

import Login from './src/Login';
import Register from './src/Register';
import Dashboard from './src/Dashboard';
import Header from './components/Header';

const Stack = createStackNavigator();

function myStack() {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}


function App() {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if(initializing) return null;

  if(!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name='Login' 
          component={Login} 
          options={{
            headerTitle: () => <Header name="Fundraiser App" />,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: '#00e4d0',
              shadowColor: '#fff',
              elevation: 25
            }
          }}
        />
        <Stack.Screen 
          name='Registration' 
          component={Register} 
          options={{
            headerTitle: () => <Header name="Fundraiser App" />,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: '#00e4d0',
              shadowColor: '#fff',
              elevation: 25
            }
          }}
        />
      </Stack.Navigator>
    )
  }

  return (
    <Stack.Navigator>
      <Stack.Screen 
          name='Dashboard' 
          component={Dashboard} 
          options={{
            headerTitle: () => <Header name="Fundraiser App Dashboard" />,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: '#00e4d0',
              shadowColor: '#fff',
              elevation: 25
            }
          }}
        />
    </Stack.Navigator>
  )
};

export default myStack;

