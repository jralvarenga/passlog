import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { Theme, useTheme } from '@react-navigation/native'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import { Button } from 'react-native-elements'
import Snackbar from 'react-native-snackbar'
import BottomSheet from '../components/BottomSheet'
import FormInput from '../components/FormInput'
import HeaderNavigationBar from '../components/HeaderNavigationBar'
import { SettingsProps, UserSettingsProps } from '../interface/interfaces'
import { setSettingsInStorage, setUserSettings } from '../lib/asyncStorage'
import { createAccountInFirebaseAuth } from '../lib/auth'
import { createUserDocument } from '../lib/firestore'
import { usePasslogUserData } from '../services/PasslogUserDataProvider'

const WINDOW_HEIGHT = Dimensions.get('window').height
const BOTTOM_SHEET_HEIGHT = 0.3

const CreateAccountScreen = ({ navigation }: any) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { t } = useTranslation()
  const { setUser, settings, setSettings, renderPasslogDataHandler } = usePasslogUserData()
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatedPassword, setRepeatedPassword] = useState("")
  const [eyeIcon, setEyeIcon] = useState("eye-off")
  const [showPassword, setShowPassword] = useState(false)
  const [showVerifySheet, setShowVerifySheet] = useState(false)
  const [loading, setLoading] = useState(false)
  const nameRef = useRef<TextInput>(null)
  const lastNameRef = useRef<TextInput>(null)
  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)
  const repeatPasswordsRef = useRef<TextInput>(null)

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
    if (name == '' || lastName == '' || repeatedPassword == '' || email == '' || password == '') {
      Snackbar.show({
        text: t('all_fields_required'),
        fontFamily: 'poppins',
        textColor: theme.colors.text,
        backgroundColor: theme.colors.primary
      })
      return
    }
    if (password != repeatedPassword) {
      Snackbar.show({
        text: t('passwords_not_match'),
        fontFamily: 'poppins',
        textColor: theme.colors.text,
        backgroundColor: theme.colors.primary
      })
      return
    }
    const userName = `${name.replace(' ', '')} ${lastName.replace(' ', '')}`
    setLoading(true)
    try {
      const user = await createAccountInFirebaseAuth(email, password, userName)
      await createUserDocument(user.uid)
      const userDefaultSettings: UserSettingsProps = {
        uid: user.uid,
        name: userName,
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
      setShowVerifySheet(true)
      setLoading(false)
    } catch (e: any) {
      setLoading(false)
      Snackbar.show({
        text: t('server_problem'),
        fontFamily: 'poppins',
        textColor: theme.colors.text,
        backgroundColor: theme.colors.primary
      })
    }
  }

  const goHome = async() => {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.colors.background} />
      <HeaderNavigationBar
        title={t('create_account_title')}
        showIcon
        icon={{ type: 'ionicon', name: eyeIcon }}
        iconFunction={changePasswordVisibility}
      />
      <View style={styles.passwordInfoContainer}>
        <View style={styles.passwordNameContainer}>
          <FormInput
            label={t('first_name_label')}
            placeholder={t('first_name_example')}
            width="50%"
            ref={nameRef}
            icon={{ type: 'font-awesome', name: 'user-circle' }}
            value={name}
            onChangeText={(value: string) => setName(value)}
            inputProps={{
              returnKeyType: 'next',
              autoCompleteType: 'name',
              onSubmitEditing: () => lastNameRef.current?.focus()
            }}
          />
          <FormInput
            label={t('last_name_label')}
            placeholder={t('last_name_example')}
            width="50%"
            icon={{ type: 'font-awesome', name: 'user-circle' }}
            value={lastName}
            onChangeText={(value: string) => setLastName(value)}
            inputProps={{
              returnKeyType: 'next',
              autoCompleteType: 'name',
              onSubmitEditing: () => emailRef.current?.focus()
            }}
          />
        </View>
        <View>
          <FormInput
            label={t('your_email_label')}
            placeholder={t('email_example')}
            icon={{ type: 'ionicons', name: 'mail' }}
            value={email}
            onChangeText={(value: string) => setEmail(value)}
            inputProps={{
              keyboardType: 'email-address',
              autoCapitalize: 'none',
              returnKeyType: 'next',
              onSubmitEditing: () => passwordRef.current?.focus()
            }}
          />
        </View>
        <View>
          <FormInput
            label={t('your_password_label')}
            placeholder={t('password_example')}
            icon={{ type: 'material', name: 'lock' }}
            value={password}
            onChangeText={(value: string) => setPassword(value)}
            inputProps={{
              autoCapitalize: 'none',
              autoCompleteType: 'off',
              secureTextEntry: !showPassword,
              returnKeyType: 'next',
              onSubmitEditing: () => repeatPasswordsRef.current?.focus()
            }}
          />
        </View>
        <View>
          <FormInput
            label={t('repeat_password_label')}
            placeholder={t('password_example')}
            icon={{ type: 'material', name: 'lock' }}
            value={repeatedPassword}
            onChangeText={(value: string) => setRepeatedPassword(value)}
            inputProps={{
              autoCapitalize: 'none',
              autoCompleteType: 'off',
              secureTextEntry: !showPassword,
              returnKeyType: 'done',
            }}
          />
        </View>
      </View>
      <View style={styles.createButtonContainer}>
        <Button
          title={t('create_account_button')}
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
        bottomSheetHeight={BOTTOM_SHEET_HEIGHT}
      >
        <View style={styles.bottomSheetContainer}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 24 }]}>
              {t('verify_account_title')}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.text, { textAlign: 'center' }]}>
              {t('sended_verification_email')}
            </Text>
          </View>
          <View style={{ flex: 1.2, alignItems: 'flex-end', justifyContent: 'center', flexDirection: 'row' }}>
            <Button
              title={t('go_home')}
              loading={loading}
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
    height: WINDOW_HEIGHT * BOTTOM_SHEET_HEIGHT,
    flex: 1,
    padding: 15,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  }
})

export default CreateAccountScreen