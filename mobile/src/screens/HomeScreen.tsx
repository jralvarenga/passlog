import React from 'react'
import PasswordsScreen from './PasswordsScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CardsScreen from './CardsScreen'
import SettingsScreen from './SettingsScreen'
import { useTheme } from '@react-navigation/native'
import { reduceIncrementColor } from '../lib/reduceIncrementColor'
import { Dimensions } from 'react-native'

const Tab = createBottomTabNavigator()

const HomeScreen = () => {
  const theme = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        //tabBarLabelPosition: 'beside-icon',
        tabBarActiveBackgroundColor: reduceIncrementColor(theme.colors.background, 'reduce', -25),
        tabBarInactiveBackgroundColor: reduceIncrementColor(theme.colors.background, 'reduce', -15),
        tabBarLabelStyle: {
          fontSize: 16,
          fontFamily: 'poppins'
        },
        tabBarStyle: {
          height: 80,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 0,
          backgroundColor: reduceIncrementColor(theme.colors.background, 'reduce', -10)
        },
        tabBarItemStyle: {
          borderRadius: 20,
          margin: 5,
          padding: 10,
        },
        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: reduceIncrementColor(theme.colors.text, 'reduce', 150)
      }}
    >
      
      <Tab.Screen
        name="Passwords"
        component={PasswordsScreen}
        options={{
          title: "Passwords",
          /*tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons
              name={focused ? "key" : "key-outline"}
              size={size}
              color={color}
            />
          )*/
        }}
      />

      <Tab.Screen
        name="Cards"
        component={CardsScreen}
        options={{
          title: "Cards",
          /*tabBarIcon: ({ focused, color, size }: any) => (
            <MaterialIcons
              name={focused ? "credit-card" : "credit-card-outline"}
              size={size}
              color={color}
            />
          )*/
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          /*tabBarIcon: ({ focused, color, size }: any) => (
            <Ionicons
              name={focused ? "md-settings-sharp" : "md-settings-outline"}
              size={size}
              color={color}
            />
          )*/
        }}
      />

    </Tab.Navigator>
  )
}

export default HomeScreen