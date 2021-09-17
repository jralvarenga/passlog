import { Theme, useTheme } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { Button, } from 'react-native-elements'
import Snackbar from 'react-native-snackbar'
import FormInput from '../components/FormInput'
import HeaderNavigationBar from '../components/HeaderNavigationBar'
import { PasswordProps } from '../interface/interfaces'
import { setPasswordsInStorage } from '../lib/asyncStorage'
import { createId } from '../lib/createId'
import { encryptPassword } from '../lib/encripter'
import { createNewPasslogDocument } from '../lib/firestore'
import { usePasslogUserData } from '../services/PasslogUserDataProvider'

interface CreatePasswordScreenProps {
  route: any
  navigation: any
}

const CreatePasswordScreen = ({ route, navigation }: CreatePasswordScreenProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { passwords, setPasswords, userSettings, renderPasslogDataHandler } = usePasslogUserData()
  const [name, setName] = useState("")
  const [user, setUser] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [comments, setComments] = useState("")
  const [eyeIcon, setEyeIcon] = useState("eye-off")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const nameRef = useRef<TextInput>(null)
  const userRef = useRef<TextInput>(null)
  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)
  const commentsRef = useRef<TextInput>(null)

  useEffect(() => {
    if (route.params.generatedPassword) {
      console.log(route.params.generatedPassword)
      setPassword(route.params.generatedPassword)
    }
  }, [])

  const changePasswordVisibility = () => {
    if (showPassword) {
      setShowPassword(false)
      setEyeIcon("eye")
    } else {
      setShowPassword(true)
      setEyeIcon("eye-off")
    }
  }

  const createPassword = async() => {
    setLoading(true)
    try {
      const currentDate = new Date()
      currentDate.setMinutes(currentDate.getMinutes() + currentDate.getTimezoneOffset())
      let newPasswordInfo: PasswordProps = {
        id: createId(),
        profileName: name,
        user: user,
        email: email,
        password: password,
        comments: comments,
        date: `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`
      }

      passwords!.push(newPasswordInfo)
      setPasswords!(passwords)
      await setPasswordsInStorage(passwords!)
      if (userSettings?.alwaysSync) {
        newPasswordInfo = encryptPassword(newPasswordInfo)
        await createNewPasslogDocument(newPasswordInfo, 'passwords')
      }
      renderPasslogDataHandler!()
      setLoading(false)
      navigation.goBack()
    } catch (error: any) {
      setLoading(false)
      Snackbar.show({
        text: error.message,
        fontFamily: 'poppins',
        textColor: theme.colors.text,
        backgroundColor: theme.colors.primary
      })
    }
  }

  return (
    <View style={styles.container}>
      <HeaderNavigationBar
        title="Create Password"
        showIcon
        icon={{ type: 'ionicon', name: eyeIcon }}
        iconFunction={changePasswordVisibility}
      />
      <View style={styles.passwordInfoContainer}>
        <View style={styles.passwordNameContainer}>
          <FormInput
            placeholder="Name"
            label="Password name"
            ref={nameRef}
            width="50%"
            icon={{ type: 'font-awesome', name: 'user-circle' }}
            value={name}
            onChangeText={(value: string) => setName(value)}
            inputProps={{
              returnKeyType: 'next',
              onSubmitEditing: () => userRef.current?.focus()
            }}
          />
          <FormInput
            placeholder="my_user"
            label="User name"
            ref={userRef}
            width="50%"
            icon={{ type: 'font-awesome', name: 'user-circle' }}
            value={user}
            onChangeText={(value: string) => setUser(value)}
            inputProps={{
              returnKeyType: 'next',
              onSubmitEditing: () => emailRef.current?.focus()
            }}
          />
        </View>
        <View>
          <FormInput
            label="An email or credential"
            ref={emailRef}
            placeholder="email132@adress.com"
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
            label="The password"
            placeholder="your_password123"
            ref={passwordRef}
            icon={{ type: 'material', name: 'lock' }}
            value={password}
            onChangeText={(value: string) => setPassword(value)}
            inputProps={{
              autoCapitalize: 'none',
              autoCompleteType: 'off',
              secureTextEntry: !showPassword,
              returnKeyType: 'done',
            }}
          />
        </View>
        <View>
          <FormInput
            label="Your comments"
            placeholder="Write your comments here..."
            ref={commentsRef}
            icon={{ type: 'font-awesome', name: 'comment', }}
            value={comments}
            onChangeText={(value: string) => setComments(value)}
            inputProps={{
              numberOfLines: 6,
              multiline: true
            }}
          />
        </View>
      </View>
      <View style={styles.createButtonContainer}>
        <Button
          title="Create"
          onPress={createPassword}
          loading={loading}
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
    justifyContent: 'space-evenly'
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

export default CreatePasswordScreen