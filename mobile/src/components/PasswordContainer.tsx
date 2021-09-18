import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { PasswordProps } from '../interface/interfaces'
import { passwordIcon } from '../lib/getPasswordIcon'
import { reduceIncrementColor } from '../lib/reduceIncrementColor'

interface PasswordContainerProps {
  password: PasswordProps
  goToScreen: Function
}

const PasswordContainer = ({ password, goToScreen }: PasswordContainerProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { icon, iconFamily } = passwordIcon(password.profileName)

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => goToScreen('passwordInfo', { passwordInfo: password })}
    >
      <LinearGradient
        colors={[theme.colors.card, reduceIncrementColor(theme.colors.card, 'reduce', 20)]}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.profileName}>
          <View style={[styles.profileNameInfo, password.user == '' && { flexDirection: 'row', alignItems: 'center' }]}>
            {password.user || password.user != '' ? (
              <Text
                style={[styles.text, { fontSize: 25, fontFamily: 'poppins-bold' }]}
              >
                {password.profileName}
              </Text>
            ) : (
              <Text
                style={[styles.text, { fontSize: 28, fontFamily: 'poppins-bold' }]}
              >
                {password.profileName}
              </Text>
            )}
            <Text
              style={[styles.text, { color: reduceIncrementColor(theme.colors.text, 'reduce', 80) }]}
            >
              {password.user}
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
          <Text style={[styles.text]}>{password.email}</Text>
        </View>
      </LinearGradient>
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
    //backgroundColor: theme.colors.background,
    borderRadius: 20,
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