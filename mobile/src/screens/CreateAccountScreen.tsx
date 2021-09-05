import { useTheme } from '@react-navigation/native'
import React from 'react'
import { StatusBar, View } from 'react-native'
import HeaderNavigationBar from '../components/HeaderNavigationBar'

const CreateAccountScreen = () => {
  const theme = useTheme()

  return (
    <View>
      <StatusBar backgroundColor={theme.colors.background} />
      <HeaderNavigationBar
        title="Create account"
      />
    </View>
  )
}

export default CreateAccountScreen