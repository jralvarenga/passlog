import React from 'react'
import { createStackNavigator, TransitionPresets  } from '@react-navigation/stack'
import CreatePasswordScreen from '../screens/CreatePasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import { useTheme } from '@react-navigation/native';
import PasswordInfoScreen from '../screens/PasswordInfoScreen';
import LoginScreen from '../screens/LoginScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';

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
      <Stack.Screen
        name="login"
        options={{
          gestureEnabled: true,
          ...TransitionPresets.ModalSlideFromBottomIOS
        }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="createAccount"
        component={CreateAccountScreen}
      />
    </Stack.Navigator>
  )
}

export default Navigator