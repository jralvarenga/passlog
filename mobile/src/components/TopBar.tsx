import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'

interface TopBarProps {
  title: string
}

const windowHeight = Dimensions.get('window').height

const TopBar = ({ title }: TopBarProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)

  return (
    <View style={styles.topBar}>
      <Text h2>{title}</Text>
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  topBar: {
    width: '100%',
    padding: 20,
    height: windowHeight * 0.18,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default TopBar