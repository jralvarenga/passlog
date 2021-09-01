import React from 'react'
import PasswordsScreen from './PasswordsScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CardsScreen from './CardsScreen'
import SettingsScreen from './SettingsScreen'

const Tab = createBottomTabNavigator()

const HomeScreen = () => {

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
      }}
    >
      
      <Tab.Screen
        name="Passwords"
        component={PasswordsScreen}
        options={{
          title: "Passwords",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "key" : "key-outline"}
              size={size}
            />
          )
        }}
      />

      <Tab.Screen
        name="Cards"
        component={CardsScreen}
        options={{
          title: "Cards",
          tabBarIcon: ({ focused, color }: any) => (
            <Ionicons
              name={focused ? "md-card-sharp" : "md-card-outline"}
              size={25}
            />
          )
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ focused, color }: any) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={25}
            />
          )
        }}
      />

    </Tab.Navigator>
  )
}

export default HomeScreen