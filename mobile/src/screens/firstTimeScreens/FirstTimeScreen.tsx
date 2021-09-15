import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const FirstTimeScreen = () => {
  const theme = useTheme()
  const styles = styleSheet(theme)

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize: 30, fontFamily: 'poppins-bold' }]}>
        Welcome to Passlog
      </Text>
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text
  },
})

export default FirstTimeScreen