import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { Dimensions, StyleSheet, View, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import PasslogIcon from '../../assets/icons/passlog_logo.svg'
import LottieView from 'lottie-react-native'
import { reduceIncrementColor } from '../lib/reduceIncrementColor'

interface TopBarProps {
  title: string,
  showIcon?: boolean
  iconFunction: Function
  icon?: { name: string, type: string }
}

const windowHeight = Dimensions.get('window').height

const TopBar = ({ title, iconFunction, showIcon, icon }: TopBarProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)

  return (
    <View style={styles.topBar}>
      <LottieView
        source={require('../../assets/animations/topbar-bg.json')}
        autoPlay
        loop
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <PasslogIcon style={{ marginLeft: -45, marginRight: -30 }}  width={140} height={60} />
        <Text style={styles.text}>{title}</Text>
      </View>
      {showIcon && (
        <Icon
          name={icon!.name}
          color={theme.colors.text}
          size={40}
          type={icon!.type}
          iconStyle={styles.iconContainerStyle}
          /* @ts-ignore */
          onPress={iconFunction}
        />
      )}
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  topBar: {
    width: '100%',
    padding: 20,
    height: windowHeight * 0.16,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.primary
  },
  text: {
    fontFamily: 'poppins-bold',
    fontSize: 32,
    color: theme.colors.text
  },
  iconContainerStyle: {
    padding: 12,
    paddingRight: 14,
    paddingLeft: 14,
    backgroundColor: reduceIncrementColor(theme.colors.primary, 'reduce', 20),
    borderRadius: 100
  }
})

export default TopBar