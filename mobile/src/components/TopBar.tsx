import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { Dimensions, StyleSheet, View, Text } from 'react-native'
import { Icon, Tooltip } from 'react-native-elements'
import PasslogLogo from './PasslogLogo'
//import PasslogIcon from '../../assets/icons/passlog_logo.svg'

interface TopBarProps {
  title: string
}

const windowHeight = Dimensions.get('window').height

const TopBar = ({ title }: TopBarProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)

  return (
    <View style={styles.topBar}>
      <Text style={styles.text}>{title}</Text>
      <Icon
        name="key"
        color={theme.colors.text}
        size={60}
        type="foundation"
      />
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  topBar: {
    width: '100%',
    padding: 20,
    height: windowHeight * 0.20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    fontFamily: 'poppins-bold',
    fontSize: 35,
    letterSpacing: 1.5,
    color: theme.colors.text
  },
})

export default TopBar