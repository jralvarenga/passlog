import React, { useState } from 'react'
import { Theme, useTheme } from '@react-navigation/native'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-elements'
import Snackbar from 'react-native-snackbar'
import BottomSheet from '../components/BottomSheet'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import FormInput from '../components/FormInput'
import { UserSettingsProps } from '../interface/interfaces'
import { removeUserSettings, setUserSettings as setUserSettingsInStorage } from '../lib/asyncStorage'
import { deleteAccountHandler, loginInFirebaseAuth, returnCurrentUser, signOutHandler } from '../lib/auth'
import { deleteUserDocument, deleteUserPasslogData } from '../lib/firestore'
import { usePasslogUserData } from '../services/PasslogUserDataProvider'
import { useTranslation } from 'react-i18next'

interface AccountSettingsScreenProps {
  navigation: any
}

const WINDOW_HEIGHT = Dimensions.get('window').height
const BOTTOM_SHEET_HEIGHT = 0.3
const SIGNIN_TO_DELETE_SHEET_HEIGHT = 0.5

const AccountSettingsScreen = ({ navigation }: AccountSettingsScreenProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { t } = useTranslation()
  const { setUser, setUserSettings, userSettings, renderPasslogDataHandler } = usePasslogUserData()
  const user = returnCurrentUser()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showWipeData, setShowWipeData] = useState(false)
  const [showDeleteAccount, setShowDeleteAccount] = useState(false)
  const [signInToDelete, setSignInToDelete] = useState(false)
  const [loading, setLoading] = useState(false)
  const optionActions = [
    {
      title: t('wipe_cloud_data_title'),
      function: () => setShowWipeData(true)
    },
    {
      title: t('delete_account_title'),
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
        text: t('server_problem'),
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
          text: t('this_is_not_your_account'),
          fontFamily: 'poppins',
          textColor: theme.colors.text,
          backgroundColor: theme.colors.primary
        })
        return
      }
    } catch (error) {
      setLoading(false)
      Snackbar.show({
        text: t('server_problem'),
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
          title={t('log_out')}
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
        bottomSheetHeight={BOTTOM_SHEET_HEIGHT}
      >
        <View style={styles.bottomSheet}>
          <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 25, }]}>
            {t('wipe_cloud_data_title')}
          </Text>
          <View style={{ marginTop: 15 }}>
            <Text style={[styles.text, { textAlign: 'center' }]}>
              {t('wipe_cloud_data_message')}
            </Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Button
              loading={loading}
              onPress={wipeCloudData}
              containerStyle={{ width: '100%' }}
              buttonStyle={{ backgroundColor: '#ff2e2e' }}
              titleStyle={styles.text}
              title={t('wipe_button')}
            />
          </View>
        </View>
      </BottomSheet>
      <BottomSheet
        visible={showDeleteAccount}
        setVisible={setShowDeleteAccount}
        bottomSheetHeight={BOTTOM_SHEET_HEIGHT}
      >
        <View style={styles.bottomSheet}>
          <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 25, }]}>
            {t('delete_account_title')}
          </Text>
          <View style={{ marginTop: 15 }}>
            <Text style={[styles.text, { textAlign: 'center' }]}>
              {t('delete_account_message_1')}
            </Text>
            <Text style={[styles.text, { textAlign: 'center' }]}>
            {t('delete_account_message_2')}
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
              title={t('login_to_delete')}
            />
          </View>
        </View>
      </BottomSheet>
      <BottomSheet
        visible={signInToDelete}
        setVisible={setSignInToDelete}
        bottomSheetHeight={SIGNIN_TO_DELETE_SHEET_HEIGHT}
      >
        <View style={[styles.bottomSheet, { height: WINDOW_HEIGHT*SIGNIN_TO_DELETE_SHEET_HEIGHT }]}>
          <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 25, }]}>
            {t('login_to_delete')}
          </Text>
          <View style={{ marginTop: 15 }}>
            <FormInput
              value={email}
              onChangeText={(value: string) => setEmail(value)}
              label={t('email_label')}
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
              label={t('password_label')}
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
              title={t('delete_account_button')}
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
    height: WINDOW_HEIGHT * BOTTOM_SHEET_HEIGHT,
    flex: 1,
    padding: 15,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  }
})

export default AccountSettingsScreen