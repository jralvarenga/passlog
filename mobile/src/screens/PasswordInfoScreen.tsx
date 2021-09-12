import { Theme, useTheme } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import HeaderNavigationBar from '../components/HeaderNavigationBar'
import { PasswordProps } from '../interface/interfaces'
import { reduceIncrementColor } from '../lib/reduceIncrementColor'
import PasswordInfoOptions from '../components/PasswordInfoOptions'
import Snackbar from 'react-native-snackbar'
import { usePasslogUserData } from '../services/PasslogUserDataProvider'
import { setPasswordsInStorage } from '../lib/asyncStorage'
import Clipboard from '@react-native-clipboard/clipboard'
import { deletePasslogDocument, updatePasslogDocument } from '../lib/firestore'
import { encryptPassword } from '../lib/encripter'

interface PasswordInfoScreenProps {
  route: any
  navigation: any
}

const PasswordInfoScreen = ({ route, navigation }: PasswordInfoScreenProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { passwords, setPasswords, userSettings, renderPasslogDataHandler }= usePasslogUserData()
  const [passwordInfo, setPasswordInfo] = useState<PasswordProps>(route.params.passwordInfo)
  const [showBottomSheet, setShowBottomSheet] = useState(false)

  useEffect(() => {
    Clipboard.addListener(() => console.log('changed clipboard'))
    
    return Clipboard.removeAllListeners()
  }, [])

  const showBottomSheetHandler = () => {
    setShowBottomSheet(true)
  }

  const savePasswordChanges = async(newData: PasswordProps) => {
    const newPasswords = passwords?.map((password) => {
      if (password.id == newData.id) {
        return newData
      } else {
        return password
      }
    })
    setPasswordInfo(newData)
    setPasswords!(newPasswords)
    await setPasswordsInStorage(newPasswords!)
    if (userSettings?.alwaysSync) {
      newData = encryptPassword(newData)
      await updatePasslogDocument(newData, 'passwords')
    }
    setShowBottomSheet(false)
    renderPasslogDataHandler!()

    Snackbar.show({
      text: 'Saved changes',
      textColor: theme.colors.text,
      backgroundColor: theme.colors.primary
    })
  }

  const deletePassword = async() => {
    setShowBottomSheet(false)
    const id = passwordInfo.id
    const index = passwords!.map((password) => password.id).indexOf(id)
    passwords!.splice(index, 1)
    setPasswords!(passwords)

    await setPasswordsInStorage(passwords!)
    if (userSettings?.alwaysSync) {
      await deletePasslogDocument(id, 'passwords')
    }
    renderPasslogDataHandler!()
    navigation.goBack()
  }

  const copyPasswordInfo = (info: string) => {
    Clipboard.addListener(() => console.log('clipboard'))
    switch (info) {
      case 'email':
        Clipboard.setString(passwordInfo.email)
        Snackbar.show({
          text: 'Email copied',
          fontFamily: 'poppins',
          textColor: theme.colors.text,
          backgroundColor: theme.colors.primary
        })
      break
      case 'password':
        Clipboard.setString(passwordInfo.password)
        Snackbar.show({
          text: 'Password copied',
          fontFamily: 'poppins',
          textColor: theme.colors.text,
          backgroundColor: theme.colors.primary
        })
      break
      default:
      break
    }
    Clipboard.removeAllListeners()
  }

  return (
    <View style={{ flex: 1 }}>
      <HeaderNavigationBar
        title={passwordInfo!.profileName}
        showIcon
        icon={{ name: "menu", type: 'feather' }}
        iconFunction={showBottomSheetHandler}
      />
      {passwordInfo.user != '' && (
        <Text
          selectable
          selectionColor={theme.colors.primary}
          style={[styles.text, { marginLeft: 15 }]}
        >
          Password of {passwordInfo.user}
        </Text>
      )}
      <View style={styles.passwordInfo}>
        <View style={styles.emailPasswordContainer}>
          <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name="mail"
              type="ionicon"
              size={25}
              color={theme.colors.text}
            />
            <View style={styles.emailPasswordBox}>
              <Text
                selectable
                selectionColor={theme.colors.primary}
                style={styles.text}
              >
                {passwordInfo.email}
              </Text>
            </View>
          </View>
          <Icon
            name="copy"
            color={theme.colors.text}
            onPress={() => copyPasswordInfo('email')}
            containerStyle={[styles.copyIconContainerStyle]}
            type="ionicon"
          />
        </View>
        <View style={styles.emailPasswordContainer}>
          <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name="lock-open"
              type="ionicon"
              size={28}
              color={theme.colors.text}
            />
            <View style={styles.emailPasswordBox}>
              <Text
                selectable
                selectionColor={theme.colors.primary}
                style={styles.text}>
                {passwordInfo.password}
              </Text>
            </View>
          </View>
          <Icon
            name="copy"
            onPress={() => copyPasswordInfo('password')}
            color={theme.colors.text}
            containerStyle={[styles.copyIconContainerStyle]}
            type="ionicon"
          />
        </View>
      </View>
      <Text style={[styles.text, { marginLeft: 15 }]}>
        Last update on {passwordInfo.date}
      </Text>
      <View style={styles.commentsContainer}>
        <View style={styles.commentsBox}>
          {passwordInfo.comments != "" ? (
            <Text selectable style={styles.text}>
              {passwordInfo.comments}
            </Text>
          ) : (
            <Text style={[styles.text, { color: reduceIncrementColor(theme.colors.text, 'reduce', 100) }]}>
              No Comments
            </Text>
          )}
        </View>
      </View>
      <PasswordInfoOptions
        visible={showBottomSheet}
        setVisible={setShowBottomSheet}
        savePasswordChanges={savePasswordChanges}
        passwordInfo={passwordInfo}
        deletePassword={deletePassword}
      />
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text,
  },
  passwordInfo: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  },
  emailPasswordContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  emailPasswordBox: {
    width: '90%',
    marginLeft: 10,
    backgroundColor: theme.colors.card,
    padding: 10,
    paddingLeft: 15,
    borderRadius: 15
  },
  commentsContainer: {
    flex: 3,
    padding: 15
  },
  copyIconContainerStyle: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: 100,
  },
  commentsBox: {
    borderWidth: 2,
    borderColor: theme.colors.card,
    borderRadius: 20,
    height: '90%',
    padding: 15
  }
})

export default PasswordInfoScreen