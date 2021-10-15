import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { Theme, useTheme } from '@react-navigation/native'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, Image, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import { Button } from 'react-native-elements'
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
  const styles = styleSheet(theme)
  const { t } = useTranslation()
  const { setUser, settings, setSettings, renderPasslogDataHandler } = usePasslogUserData()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const emailRef = useRef<TextInput>()
  const passwordRef = useRef<TextInput>()

  const loginHandler = async() => {
    if (email == '' || password == '') {
      Snackbar.show({
        text: t('all_fields_required'),
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
      let errorMessage: string
      if (error.code == 'auth/invalid-password' || error.code == 'auth/invalid-email') {
        errorMessage = t('wrong_password')
      } else {
        errorMessage = t('server_problem')
      }
      Snackbar.show({
        text: errorMessage,
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
            {t('welcome_to_passlog')}
          </Text>
          <Text style={[styles.text, { textAlign: 'center', fontSize: 14 }]}>
            {t('use_passlog_credentials')}
          </Text>
        </View>
        <View style={styles.inputsContainer}>
          <FormInput
            label={t('email_label')}
            onChangeText={(value: string) => setEmail(value)}
            placeholder={t('email_example')}
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
            label={t('password_label')}
            onChangeText={(value: string) => setPassword(value)}
            placeholder={t('password_example')}
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
            title={t('login_button')}
          />
        </View>
      </View>
      <View style={styles.noAccountContainer}>
        <View style={styles.dontHaveAccountContainer}>
          <Text
            onPress={() => navigation.navigate('createAccount')}
            style={[styles.text, { fontSize: 14, textAlign: 'center' }]}
          >
            {t('dont_have_account')} <Text style={{ fontFamily: 'poppins-bold', color: theme.colors.primary, textDecorationLine: 'underline' }}>{t('create_account_here')}</Text>
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
})

export default LoginScreen