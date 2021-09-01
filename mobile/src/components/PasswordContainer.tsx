import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { reduceIncrementColor } from '../lib/reduceIncrementColor'

const PasswordContainer = () => {
  const theme = useTheme()
  const styles = styleSheet(theme)

  return (
    <View style={styles.container}>
      <View style={styles.profileName}>
        <View style={styles.profileNameInfo}>
          <Text h4>Profile name</Text>
          <Text style={{ color: reduceIncrementColor(theme.colors.text, 'reduce', 80) }}>
            User name xdxd
          </Text>
        </View>
        <View style={styles.profileNameIcon}>
          <Ionicons
            name="logo-google"
            size={30}
            color={theme.colors.text}
          />
        </View>
      </View>
      <View style={styles.profileInfo}>
        <Text>emailemail123@email.com</Text>
      </View>
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 130,
    padding: 12,
    marginVertical: 12,
    backgroundColor: theme.colors.card,
    borderRadius: 20
  },
  profileName: {
    flex: 3,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileNameInfo: {
    width: '80%'
  },
  profileNameIcon: {
    width: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileInfo: {
    flex: 1.5,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }
})

export default PasswordContainer