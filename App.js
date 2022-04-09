import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/authentication/LoginScreen';
import SignupScreen from './screens/authentication/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import TabNavigation from './tabNavigation/TabNavigation';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Signup" component={SignupScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Cart" component={CartScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Home" component={TabNavigation}
          options={{
            headerShown: false,
            headerTitle:'LABDHI VINAY',
            headerTitleStyle: {
              color: '#1C2833'
            },
            headerStyle: {
              backgroundColor: '#D35400',
            }
          }} 
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});