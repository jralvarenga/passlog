import React from 'react'
import { createStackNavigator, TransitionPresets  } from '@react-navigation/stack'
import CreatePasswordScreen from '../screens/CreatePasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import { useTheme } from '@react-navigation/native';
import PasswordInfoScreen from '../screens/PasswordInfoScreen';

const Stack = createStackNavigator();

const Navigator = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,

        ...TransitionPresets.SlideFromRightIOS
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="createPassword"
        component={CreatePasswordScreen}
      />
      <Stack.Screen
        name="passwordInfo"
        component={PasswordInfoScreen}
      />
    </Stack.Navigator>
  )
}

export default Navigator