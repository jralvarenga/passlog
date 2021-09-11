import { Theme, useTheme } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import Snackbar from 'react-native-snackbar'
import BottomSheet from '../components/BottomSheet'
import FormInput from '../components/FormInput'
import HeaderNavigationBar from '../components/HeaderNavigationBar'
import { createAccountInFirebaseAuth } from '../lib/firebase'
import { usePasslogUserData } from '../services/PasslogUserDataProvider'

const windowHeight = Dimensions.get('window').height
const bottomSheetHeight = 0.3

const CreateAccountScreen = ({ navigation }: any) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { setUser, renderPasslogDataHandler } = usePasslogUserData()
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatedPassword, setRepeatedPassword] = useState("")
  const [eyeIcon, setEyeIcon] = useState("eye-off")
  const [showPassword, setShowPassword] = useState(false)
  const [showVerifySheet, setShowVerifySheet] = useState(false)

  const changePasswordVisibility = () => {
    if (showPassword) {
      setShowPassword(false)
      setEyeIcon("eye")
    } else {
      setShowPassword(true)
      setEyeIcon("eye-off")
    }
  }

  const createAccountHandler = async() => {
    if (password != repeatedPassword) {
      Snackbar.show({
        text: "The passwords don't match",
        fontFamily: 'poppins',
        textColor: theme.colors.text,
        backgroundColor: theme.colors.primary
      })
      return
    }
    const userName = `${name.replace(' ', '')} ${lastName.replace(' ', '')}`
    try {
      const user = await createAccountInFirebaseAuth(email, password, userName)
      setUser!(user)
      renderPasslogDataHandler!()
      setShowVerifySheet(true)
    } catch (error) {
      console.log(error)
    }
  }

  const goHome = async() => {
    navigation.navigate('Home')
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
          onPress={createAccountHandler}
          titleStyle={[styles.text, { fontFamily: 'poppins-bold' }]}
          containerStyle={{
            width: '45%',
          }}
        />
      </View>
      <BottomSheet
        visible={showVerifySheet}
        //setVisible={setShowVerifySheet}
        bottomSheetHeight={bottomSheetHeight}
      >
        <View style={styles.bottomSheetContainer}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 24 }]}>
              Verify account
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.text, { textAlign: 'center' }]}>
              We've sent you a verification email, do it now or you can do it later,
            </Text>
          </View>
          <View style={{ flex: 1.2, alignItems: 'flex-end', justifyContent: 'center', flexDirection: 'row' }}>
            <Button
              title="Go home"
              onPress={goHome}
              titleStyle={[styles.text, { fontFamily: 'poppins-bold' }]}
              containerStyle={{
                width: '45%',
              }}
            />
          </View>
        </View>
      </BottomSheet>
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
  },
  bottomSheetContainer: {
    height: windowHeight * bottomSheetHeight,
    flex: 1,
    padding: 15,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  }
})

export default CreateAccountScreen