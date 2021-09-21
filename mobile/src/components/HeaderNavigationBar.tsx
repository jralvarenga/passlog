import { Theme, useNavigation, useTheme } from '@react-navigation/native'
import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'

interface HeaderNavigationBarProps {
  title: string
  showIcon?: boolean
  iconFunction?: Function
  icon?: {
    type: string
    name: string
  }
}

const WINDOW_HEIGHT = Dimensions.get('window').height

const HeaderNavigationBar = ({ title, showIcon, icon, iconFunction }: HeaderNavigationBarProps) => {
  const theme = useTheme()
  const navigation = useNavigation()
  const styles = styleSheet(theme)

  return (
    <View style={styles.container}>
      <View style={styles.headerInfo}>
        <View style={styles.goBackContainer}>
          <Icon
            name="keyboard-arrow-left"
            type="material"
            color={theme.colors.text}
            size={40}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.pageName}>
          <Text style={[styles.text, { fontSize: 28, fontFamily: 'poppins-bold' }]}>
            {title}
          </Text>
        </View>
      </View>
      <View style={styles.headerOptions}>
        <View style={styles.goBackContainer}></View>
        <View style={[styles.pageName, { alignItems: 'center', justifyContent: 'center' }]}>
          {showIcon && (
            <Icon
              name={icon!.name}
              type={icon!.type}
              color={theme.colors.text}
              /* @ts-ignore */
              onPress={iconFunction}
              size={30}
            />
          )}
        </View>
      </View>
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    width: '100%',
    height: WINDOW_HEIGHT * 0.15,
    display: 'flex',
    flexDirection: 'row',
    padding: 10
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text
  },
  headerInfo: {
    width: '80%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  headerOptions: {
    width: '25%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  goBackContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '40%'
  },
  pageName: {
    width: '100%',
    display: 'flex',
    paddingLeft: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    height: '60%'
  },
})

export default HeaderNavigationBar