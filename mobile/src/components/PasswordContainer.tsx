import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
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
    <TouchableOpacity activeOpacity={0.7} style={styles.container}>
      <View style={styles.profileName}>
        <View style={[styles.profileNameInfo, user == '' && { flexDirection: 'row', alignItems: 'center' }]}>
          {user == '' ? (
            <Text
              style={[styles.text, { fontSize: 28, fontFamily: 'poppins-bold' }]}
            >
              {name}
            </Text>
          ) : (
            <Text
              style={[styles.text, { fontSize: 25, fontFamily: 'poppins-bold' }]}
            >
              {name}
            </Text>
          )}
          <Text
            style={[styles.text, { color: reduceIncrementColor(theme.colors.text, 'reduce', 80) }]}
          >
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
        <Text style={[styles.text]}>{email}</Text>
        <Icon
          name="keyboard-arrow-down"
          type="material"
          color={reduceIncrementColor(theme.colors.text, 'reduce', 80)}
          onPress={() => console.log('xd')}
        />
      </View>
    </TouchableOpacity>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 130,
    padding: 15,
    marginVertical: 12,
    backgroundColor: theme.colors.card,
    borderRadius: 20
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text
  },
  profileName: {
    flex: 3,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileNameInfo: {
    width: '80%',
    display: 'flex'
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
    justifyContent: 'space-between'
  }
})

export default PasswordContainer