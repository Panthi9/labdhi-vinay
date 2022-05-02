import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import LoginScreen from './screens/authentication/LoginScreen';
import SignupScreen from './screens/authentication/SignupScreen';
import CartScreen from './screens/CartScreen';
import TabNavigation from './tabNavigation/TabNavigation';
import ProfileScreen from './screens/ProfileScreen';
import OrderScreen from './screens/OrderScreen';
import ContactUsScreen from './screens/ContactUsScreen';
import appReducer from './appReducer';


const store = createStore(appReducer);
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Home" component={TabNavigation}
            options={{
              headerShown: false,
              headerTitle: 'LABDHI VINAY',
              headerTitleStyle: {
                color: '#1C2833'
              },
              headerStyle: {
                backgroundColor: '#D35400',
              }
            }}
          />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Signup" component={SignupScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Cart" component={CartScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Profile" component={ProfileScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Order" component={OrderScreen} />
          <Stack.Screen options={{ headerShown: false }} name="ContactUs" component={ContactUsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}