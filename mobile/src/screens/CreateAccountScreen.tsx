import { Theme, useTheme } from '@react-navigation/native'
import React, { useState } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import FormInput from '../components/FormInput'
import HeaderNavigationBar from '../components/HeaderNavigationBar'

const CreateAccountScreen = () => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatedPassword, setRepeatedPassword] = useState("")
  const [eyeIcon, setEyeIcon] = useState("eye-off")
  const [showPassword, setShowPassword] = useState(false)
  

  const changePasswordVisibility = () => {
    if (showPassword) {
      setShowPassword(false)
      setEyeIcon("eye")
    } else {
      setShowPassword(true)
      setEyeIcon("eye-off")
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.colors.background} />
      <HeaderNavigationBar
        title="Create Account"
        showIcon
        icon={{ type: 'ionicon', name: eyeIcon }}
        iconFunction={changePasswordVisibility}
      />
      <View style={styles.passwordInfoContainer}>
        <View style={styles.passwordNameContainer}>
          <FormInput
            placeholder="Steve"
            label="First name"
            width="50%"
            icon={{ type: 'font-awesome', name: 'user-circle' }}
            value={name}
            onChangeText={(value: string) => setName(value)}
          />
          <FormInput
            placeholder="Dolphin"
            label="Last name"
            width="50%"
            icon={{ type: 'font-awesome', name: 'user-circle' }}
            value={lastName}
            onChangeText={(value: string) => setLastName(value)}
          />
        </View>
        <View>
          <FormInput
            label="An email or credential"
            placeholder="email132@adress.com"
            icon={{ type: 'ionicons', name: 'mail' }}
            value={email}
            onChangeText={(value: string) => setEmail(value)}
            inputProps={{
              keyboardType: 'email-address',
              autoCapitalize: 'none'
            }}
          />
        </View>
        <View>
          <FormInput
            label="Your password"
            placeholder="your_password123"
            icon={{ type: 'material', name: 'lock' }}
            value={password}
            onChangeText={(value: string) => setPassword(value)}
            inputProps={{
              autoCapitalize: 'none',
              autoCompleteType: 'off',
              secureTextEntry: !showPassword
            }}
          />
        </View>
        <View>
          <FormInput
            label="Repeat the password"
            placeholder="your_password123"
            icon={{ type: 'material', name: 'lock' }}
            value={repeatedPassword}
            onChangeText={(value: string) => setRepeatedPassword(value)}
            inputProps={{
              autoCapitalize: 'none',
              autoCompleteType: 'off',
              secureTextEntry: !showPassword
            }}
          />
        </View>
      </View>
      <View style={styles.createButtonContainer}>
        <Button
          title="Create account"
          titleStyle={[styles.text, { fontFamily: 'poppins-bold' }]}
          containerStyle={{
            width: '45%',
          }}
        />
      </View>
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text
  },
  passwordInfoContainer: {
    width: '100%',
    padding: 5,
    height: '70%',
    display: 'flex',
  },
  createButtonContainer: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center'
  },
  passwordNameContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default CreateAccountScreen