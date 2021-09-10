import { Theme, useTheme } from '@react-navigation/native'
import React, { useRef, useState } from 'react'
import { Dimensions, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import { Button, SocialIcon } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormInput from '../components/FormInput'
import { reduceIncrementColor } from '../lib/reduceIncrementColor'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const LoginScreen = ({ navigation }: any) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const emailRef = useRef()
  const passwordRef = useRef()

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
              /* @ts-ignore */
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
              returnKeyType: "done"
            }}
          />
        </View>
        <View style={styles.loginButtonContainer}>
          <Button
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
    width: windowWidth,
    height: windowWidth * 750/1125,
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