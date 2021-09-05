import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { Dimensions, StyleSheet, View, Text } from 'react-native'
import { Icon, Tooltip } from 'react-native-elements'
import PasslogIcon from '../../assets/icons/passlog_logo.svg'

interface TopBarProps {
  title: string,
  iconFunction: Function
}

const windowHeight = Dimensions.get('window').height

const TopBar = ({ title, iconFunction }: TopBarProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)

  return (
    <View style={styles.topBar}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <PasslogIcon style={{ marginLeft: -45, marginRight: -30 }}  width={140} height={60} />
        <Text style={styles.text}>{title}</Text>
      </View>
      <Icon
        name="locked"
        color={theme.colors.text}
        size={25}
        type="fontisto"
        iconStyle={styles.iconContainerStyle}
        /* @ts-ignore */
        onPress={iconFunction}
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
    fontSize: 32,
    color: theme.colors.text
  },
  iconContainerStyle: {
    padding: 18,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: theme.colors.card,
    borderRadius: 100
  }
})

export default TopBar