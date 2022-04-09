import React from 'react';
import { Text, View, Image, Icon } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: '#D35400',
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'red',

        })}
      >
        <Tab.Screen name="Home"
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#D35400',
            },
            tabBarLabel: '',
            tabBarIcon: (tabInfo) => {
              return tabInfo.focused ? (
                <View style={{padding:10, marginTop:40, backgroundColor:'#1C2833', borderRadius:150/2}}>
                  <Image
                    source={require(`../assets/trolley-white.png`)}
                    style={{
                      height: 30,
                      width: 30,
                    }}
                  />
                </View>
              ) : 
              <View style={{padding:10, marginTop:40}}><Image
                source={require(`../assets/trolley-dark.png`)}
                style={{
                  height: 28,
                  width: 28,
                }}
              />
              </View>;
            }
          }}
          component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingScreen}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#D35400',
            },
            tabBarLabel: '',
            tabBarIcon: (tabInfo) => {
              return tabInfo.focused ? (
                <View style={{padding:10, marginTop:40,backgroundColor:'#1C2833', borderRadius:150/2}}>
                <Image
                  source={require(`../assets/setting-white.png`)}
                  style={{
                    height: 30,
                    width: 30,
                  }}
                />
                </View>
              ) : 
              <View style={{padding:10, marginTop:40}}>
              <Image
                source={require(`../assets/setting-dark.png`)}
                style={{
                  height: 28,
                  width: 28,
                }}
              />
              </View>;
            }
          }} />
      </Tab.Navigator>
    </>
  );
}