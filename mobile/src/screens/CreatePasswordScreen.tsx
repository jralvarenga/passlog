import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import HeaderNavigationBar from '../components/HeaderNavigationBar'

const CreatePasswordScreen = () => {
  const theme = useTheme()
  const styles = styleSheet(theme)

  return (
    <View>
      <HeaderNavigationBar title="Create Password" />
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  
})

export default CreatePasswordScreen