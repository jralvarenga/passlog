import { Theme, useNavigation, useTheme } from '@react-navigation/native'
import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'

interface HeaderNavigationBarProps {
  title: string
  showMenuIcon?: boolean,
}

const windowHeight = Dimensions.get('window').height

const HeaderNavigationBar = ({ title, showMenuIcon }: HeaderNavigationBarProps) => {
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
        {showMenuIcon && (
          <Icon
            name="menu"
            type="ionicons"
            color={theme.colors.text}
            size={40}
          />
        )}
      </View>
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    width: '100%',
    height: windowHeight * 0.15,
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
    width: '75%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  headerOptions: {
    width: '25%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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