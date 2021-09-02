import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { passwordIcon } from '../lib/getPasswordIcon'
import { reduceIncrementColor } from '../lib/reduceIncrementColor'

interface PasswordContainerProps {
  name: string
  email: string
  user: string
  password: string
}

const PasswordContainer = ({ name, email, user, password }: PasswordContainerProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)

  const { icon, iconFamily } = passwordIcon(name)

  return (
    <View style={styles.container}>
      <View style={styles.profileName}>
        <View style={styles.profileNameInfo}>
          {user == '' ? (
            <Text h3>{name}</Text>
          ) : (
            <Text h4>{name}</Text>
          )}
          <Text style={{ color: reduceIncrementColor(theme.colors.text, 'reduce', 80) }}>
            {user}
          </Text>
        </View>
        <View style={styles.profileNameIcon}>
          {icon != '' && (
            iconFamily == 'ionicons' ? (
              <Ionicons
                name={icon}
                size={30}
                color={theme.colors.text}
              />
            ) : (
              <MaterialIcon
                name={icon}
                size={30}
                color={theme.colors.text}
              />
            )
          )}
        </View>
      </View>
      <View style={styles.profileInfo}>
        <Text>{email}</Text>
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