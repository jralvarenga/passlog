import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { Theme, useTheme } from '@react-navigation/native'
import React, { useRef, useState } from 'react'
import { Dimensions, Image, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import { Button, SocialIcon } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import Snackbar from 'react-native-snackbar'
import FormInput from '../components/FormInput'
import { SettingsProps, UserSettingsProps } from '../interface/interfaces'
import { setSettingsInStorage, setUserSettings } from '../lib/asyncStorage'
import { loginInFirebaseAuth } from '../lib/auth'
import { reduceIncrementColor } from '../lib/reduceIncrementColor'
import { usePasslogUserData } from '../services/PasslogUserDataProvider'

const WINDOW_WIDTH = Dimensions.get('window').width

const LoginScreen = ({ navigation }: any) => {
  const theme = useTheme()
  const { setUser, settings, setSettings, renderPasslogDataHandler } = usePasslogUserData()
  const styles = styleSheet(theme)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const emailRef = useRef<TextInput>()
  const passwordRef = useRef<TextInput>()

  const loginHandler = async() => {
    if (email == '' || password == '') {
      Snackbar.show({
        text: "All fields are required are required",
        fontFamily: 'poppins',
        textColor: theme.colors.text,
        backgroundColor: theme.colors.primary
      })
      return
    }
    try {
      const { user } = await loginInFirebaseAuth(email, password)
      const userDefaultSettings: UserSettingsProps = {
        uid: user.uid,
        name: user.displayName!,
        alwaysSync: false
      }
      const newSettings: SettingsProps = {
        ...settings,
        askForAlwaysSync: true
      }
      await setSettingsInStorage(newSettings)
      await setUserSettings(userDefaultSettings)
      setUser!(user)
      setSettings!(newSettings)
      renderPasslogDataHandler!()
      navigation.navigate('Home')
    } catch (e: any) {
      const error: FirebaseAuthTypes.NativeFirebaseAuthError = e
      Snackbar.show({
        text: error.message,
        fontFamily: 'poppins',
        textColor: theme.colors.text,
        backgroundColor: theme.colors.primary
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={theme.colors.primary} />
      <View style={styles.imgContainer}>
        <Image
          source={require('./img/login-bg.png')}
          style={styles.imgStyle}
        />
      </View>
      <View style={styles.loginContainer}>
        <View style={styles.loginTitle}>
          <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 28, textAlign: 'center' }]}>
            Welcome to Passlog
          </Text>
          <Text style={[styles.text, { textAlign: 'center', fontSize: 14 }]}>
            Use your Passlog creedential below and login to your account
          </Text>
        </View>
        <View style={styles.inputsContainer}>
          <FormInput
            label="Email"
            onChangeText={(value: string) => setEmail(value)}
            placeholder="email@direction.com"
            ref={emailRef}
            value={email}
            icon={{ type: 'ionicons', name: 'mail' }}
            inputProps={{
              keyboardType: 'email-address',
              autoCompleteType: 'email',
              autoCapitalize: 'none',
              returnKeyType: "next",
              onSubmitEditing: () => passwordRef.current!.focus()
            }}
          />
          <FormInput
            label="Password"
            onChangeText={(value: string) => setPassword(value)}
            placeholder="myawesomepassword"
            value={password}
            ref={passwordRef}
            icon={{ type: 'material', name: 'lock' }}
            inputProps={{
              autoCapitalize: 'none',
              autoCompleteType: 'password',
              secureTextEntry: true,
              returnKeyType: "done",
              onSubmitEditing: () => {
                passwordRef.current?.blur()
                loginHandler()
              }
            }}
          />
        </View>
        <View style={styles.loginButtonContainer}>
          <Button
            onPress={loginHandler}
            buttonStyle={{ padding: 12 }}
            titleStyle={[styles.text, { fontFamily: 'poppins-bold' }]}
            title="Log In"
          />
        </View>
      </View>
      <View style={styles.noAccountContainer}>
        {/*<View style={styles.accountProviders}>
          <SocialIcon
            type="google"
          />
          <SocialIcon
            type="github"
          />
          <SocialIcon
            type="facebook"
          />
          </View>*/}
        <View style={styles.dontHaveAccountContainer}>
          <Text
          onPress={() => navigation.navigate('createAccount')}
            style={[styles.text, { fontSize: 14, textAlign: 'center' }]}
          >
            ¿Don't have an account? <Text style={{ fontFamily: 'poppins-bold', color: theme.colors.primary, textDecorationLine: 'underline' }}>Create one</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    flex: 1
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text,
  },
  imgStyle: {
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH * 750/1125,
    overflow: 'hidden'
  },
  loginContainer: {
    flex: 5,
    backgroundColor: reduceIncrementColor(theme.colors.background, 'reduce', -20),
    borderRadius: 60,
    alignItems: 'center'
  },
  noAccountContainer: {
    flex: 1,
    alignItems: 'center'
  },
  loginTitle: {
    flex: 2,
    width: '85%',
    justifyContent: 'center'
  },
  inputsContainer: {
    flex: 3,
    width: '95%',
  },
  loginButtonContainer: {
    flex: 1,
    width: '80%'
  },
  dontHaveAccountContainer: {
    flex: 1,
    width: '95%',
    justifyContent: 'center'
  },
  accountProviders: {
    flex: 2,
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default LoginScreen