import { Theme, useTheme } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import FormInput from '../components/FormInput'
import HeaderNavigationBar from '../components/HeaderNavigationBar'
import { PasslogUserDataProps, PasswordProps } from '../interface/interfaces'
import { setPasswordsInStorage } from '../lib/asyncStorage'
import { createId } from '../lib/createId'
import { usePasslogUserData } from '../services/PasslogUserDataProvider'

interface CreatePasswordScreenProps {
  route: any
  navigation: any
}

const CreatePasswordScreen = ({ route, navigation }: CreatePasswordScreenProps) => {
  const currentDate = new Date()
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { passwords, setPasswords, renderPasslogDataHandler }: PasslogUserDataProps = usePasslogUserData()
  const [name, setName] = useState("")
  const [user, setUser] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [comments, setComments] = useState("")
  const [eyeIcon, setEyeIcon] = useState("eye-off")
  const [showPassword, setShowPassword] = useState(false)

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
    const newPasswordInfo: PasswordProps = {
      id: createId(),
      profileName: name,
      user: user,
      email: email,
      password: password,
      comments: comments,
      date: `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`
    }

    console.log(newPasswordInfo)
    passwords!.push(newPasswordInfo)
    setPasswords!(passwords)
    await setPasswordsInStorage(passwords!)
    navigation.goBack()
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
            width="50%"
            icon={{ type: 'font-awesome', name: 'user-circle' }}
            value={name}
            onChangeText={(value: string) => setName(value)}
          />
          <FormInput
            placeholder="my_user"
            label="User name"
            width="50%"
            icon={{ type: 'font-awesome', name: 'user-circle' }}
            value={user}
            onChangeText={(value: string) => setUser(value)}
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
            label="The password"
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
            label="Your comments"
            placeholder="Write your comments here..."
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