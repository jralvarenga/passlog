import React from 'react'
import PasswordsScreen from './PasswordsScreen'
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CardsScreen from './CardsScreen'
import SettingsScreen from './SettingsScreen'
import { useTheme } from '@react-navigation/native'
import { View } from 'react-native'
import { TabBar } from '../components/bottomTabBar/TabBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import NotesScreen from './NotesScreen'

const Tab = createBottomTabNavigator()

const HomeScreen = () => {
  const theme = useTheme()

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false
        }}
        tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
      >
        <Tab.Screen name="key" component={PasswordsScreen} />
        <Tab.Screen name="credit-card" component={CardsScreen} />
        <Tab.Screen name="book" component={NotesScreen} />
        <Tab.Screen name="settings" component={SettingsScreen} />
      </Tab.Navigator>
      {useSafeAreaInsets().bottom > 0 && (
        <View
          style={{
            height: useSafeAreaInsets().bottom - 5,
            backgroundColor: "white",
          }}
        />
      )}
    </View>
  )
}

export default HomeScreen