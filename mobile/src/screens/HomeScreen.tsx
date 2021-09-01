import React from 'react'
import PasswordsScreen from './PasswordsScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CardsScreen from './CardsScreen'
import SettingsScreen from './SettingsScreen'
import { useTheme } from '@react-navigation/native'
import { reduceIncrementColor } from '../lib/reduceIncrementColor'

const Tab = createBottomTabNavigator()

const HomeScreen = () => {
  const theme = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveBackgroundColor: theme.colors.background,
        tabBarInactiveBackgroundColor: theme.colors.background,

        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: reduceIncrementColor(theme.colors.text, 'reduce', 150)
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
              color={color}
            />
          )
        }}
      />

      <Tab.Screen
        name="Cards"
        component={CardsScreen}
        options={{
          title: "Cards",
          tabBarIcon: ({ focused, color, size }: any) => (
            <Ionicons
              name={focused ? "md-card-sharp" : "md-card-outline"}
              size={size}
              color={color}
            />
          )
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ focused, color, size }: any) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={color}
            />
          )
        }}
      />

    </Tab.Navigator>
  )
}

export default HomeScreen