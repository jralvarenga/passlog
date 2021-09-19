import { Theme, useTheme } from '@react-navigation/native'
import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-elements'
import Snackbar from 'react-native-snackbar'
import BottomSheet from '../components/BottomSheet'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import FormInput from '../components/FormInput'
import { SettingsProps, UserSettingsProps } from '../interface/interfaces'
import { removeUserSettings, setUserSettings as setUserSettingsInStorage } from '../lib/asyncStorage'
import { deleteAccountHandler, loginInFirebaseAuth, returnCurrentUser, signOutHandler } from '../lib/auth'
import { deleteUserDocument, deleteUserPasslogData } from '../lib/firestore'
import { usePasslogUserData } from '../services/PasslogUserDataProvider'

interface AccountSettingsScreenProps {
  navigation: any
}

const windowHeight = Dimensions.get('window').height
const bottomSheetHeight = 0.3
const signInToDeleteSheetHeight = 0.5

const AccountSettingsScreen = ({ navigation }: AccountSettingsScreenProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { setUser, setUserSettings, userSettings, settings, setSettings, renderPasslogDataHandler } = usePasslogUserData()
  const user = returnCurrentUser()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showWipeData, setShowWipeData] = useState(false)
  const [showDeleteAccount, setShowDeleteAccount] = useState(false)
  const [signInToDelete, setSignInToDelete] = useState(false)
  const [loading, setLoading] = useState(false)
  const optionActions = [
    {
      title: 'Wipe cloud data',
      function: () => setShowWipeData(true)
    },
    {
      title: 'Delete account',
      function: () => setShowDeleteAccount(true)
    }
  ]

  const signOutButtonHandler = async() => {
    await signOutHandler()
    await removeUserSettings()
    setUser!(null)
    renderPasslogDataHandler!()
    navigation.goBack()
  }

  const wipeCloudData = async() => {
    setLoading(true)
    try {
      await deleteUserPasslogData()
      // @ts-ignore
      const newUserSettings: UserSettingsProps = {
        ...userSettings,
        alwaysSync: false
      }
      setUserSettings!(newUserSettings)
      setUserSettingsInStorage(newUserSettings)
      renderPasslogDataHandler!()
      setLoading(false)
      setShowWipeData(false)
      navigation.goBack()
    } catch (error) {
      setLoading(false)
      Snackbar.show({
        text: "There has been a problem, try later",
        fontFamily: 'poppins',
        textColor: theme.colors.text,
        backgroundColor: theme.colors.primary
      })
    }
  }

  const deleteAccount = async() => {
    setLoading(true)
    try {
      const { user } = await loginInFirebaseAuth(email, password)
      const loginUid = user.uid
      if (loginUid == userSettings?.uid) {
        await deleteAccountHandler()
        await deleteUserDocument()
        await removeUserSettings()
        setUser!(null)
        renderPasslogDataHandler!()
        navigation.goBack()
      } else {
        setLoading(false)
        Snackbar.show({
          text: "This is not your account",
          fontFamily: 'poppins',
          textColor: theme.colors.text,
          backgroundColor: theme.colors.primary
        })
        return
      }
    } catch (error) {
      setLoading(false)
      Snackbar.show({
        text: "There has been a problem, try later",
        fontFamily: 'poppins',
        textColor: theme.colors.text,
        backgroundColor: theme.colors.primary
      })
    }
  }

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar backgroundColor="#000" />
      <View style={styles.userInfoContainer}>
        <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 28 }]}>
          {user?.displayName}
        </Text>
        <Text style={styles.text}>
          {user?.email}
        </Text>
      </View>
      <View style={styles.optionsContainer}>
        {optionActions.map((item, i) => (
          <TouchableOpacity
            key={i}
            onPress={item.function}
            activeOpacity={0.7}
            style={styles.optionBox}
          >
            <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 20 }]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.signOutContainer}>
        <Button
          title="Sign out"
          onPress={signOutButtonHandler}
          buttonStyle={styles.signOutButton}
          containerStyle={styles.signOutButtonContainer}
          titleStyle={[styles.text, { fontFamily: 'poppins-bold' }]}
          icon={{ name: "exit", type: "ionicon", color: theme.colors.text, size: 25 }}
        />
      </View>
      <BottomSheet
        visible={showWipeData}
        setVisible={setShowWipeData}
        bottomSheetHeight={bottomSheetHeight}
      >
        <View style={styles.bottomSheet}>
          <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 25, }]}>
            Wipe data
          </Text>
          <View style={{ marginTop: 15 }}>
            <Text style={[styles.text, { textAlign: 'center' }]}>
              Are you sure you want this, this will only delete your data in the cloud and it's irreversible
            </Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Button
              loading={loading}
              onPress={wipeCloudData}
              containerStyle={{ width: '100%' }}
              buttonStyle={{ backgroundColor: '#ff2e2e' }}
              titleStyle={styles.text}
              title="Wipe now"
            />
          </View>
        </View>
      </BottomSheet>
      <BottomSheet
        visible={showDeleteAccount}
        setVisible={setShowDeleteAccount}
        bottomSheetHeight={bottomSheetHeight}
      >
        <View style={styles.bottomSheet}>
          <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 25, }]}>
            Delete account
          </Text>
          <View style={{ marginTop: 15 }}>
            <Text style={[styles.text, { textAlign: 'center' }]}>
              Are you sure you want this, your account will be lost and all your data in the cloud
            </Text>
            <Text style={[styles.text, { textAlign: 'center' }]}>
              You need to sign in again
            </Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Button
              loading={loading}
              onPress={() => {
                setShowDeleteAccount(false)
                setSignInToDelete(true)
              }}
              containerStyle={{ width: '100%' }}
              buttonStyle={{ backgroundColor: '#ff2e2e' }}
              titleStyle={styles.text}
              title="Sign in to delete"
            />
          </View>
        </View>
      </BottomSheet>
      <BottomSheet
        visible={signInToDelete}
        setVisible={setSignInToDelete}
        bottomSheetHeight={signInToDeleteSheetHeight}
      >
        <View style={[styles.bottomSheet, { height: windowHeight*signInToDeleteSheetHeight }]}>
          <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 25, }]}>
            Sign in to delete
          </Text>
          <View style={{ marginTop: 15 }}>
            <FormInput
              value={email}
              onChangeText={(value: string) => setEmail(value)}
              label="Your email"
              placeholder=""
              inputProps={{
                keyboardType: 'email-address',
                autoCompleteType: 'email',
                autoCapitalize: 'none',
                returnKeyType: "next",
              }}
            />
            <FormInput
              value={password}
              onChangeText={(value: string) => setPassword(value)}
              label="Your password"
              placeholder=""
              inputProps={{
                autoCapitalize: 'none',
                autoCompleteType: 'password',
                returnKeyType: "done",
              }}
            />
          </View>
          <View style={{ marginTop: 15 }}>
            <Button
              loading={loading}
              onPress={deleteAccount}
              containerStyle={{ width: '100%' }}
              buttonStyle={{ backgroundColor: '#ff2e2e' }}
              titleStyle={styles.text}
              title="Delete account"
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text
  },
  userInfoContainer: {
    flex: 1.5,
    width: '95%',
    justifyContent: 'center'
  },
  optionsContainer: {
    flex: 5,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  optionBox: {
    width: '45%',
    minHeight: 100,
    padding: 10,
    borderRadius: 15,
    margin: '2%',
    backgroundColor: theme.colors.card
  },
  signOutContainer: {
    flex: 1,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  signOutButton: {
    backgroundColor: '#ff2e2e',
  },
  signOutButtonContainer: {
    width: '100%',
  },
  bottomSheet: {
    height: windowHeight * bottomSheetHeight,
    flex: 1,
    padding: 15,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  }
})

export default AccountSettingsScreen