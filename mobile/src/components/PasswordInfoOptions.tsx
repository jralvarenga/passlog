import React, { useCallback, useMemo, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Theme, useTheme } from '@react-navigation/native'
import { Button } from 'react-native-elements'
import { PasswordProps } from '../interface/interfaces'
import BottomSheet from './BottomSheet'
import FormInput from './FormInput'

interface PasswordInfoOptionsProps {
  visible: boolean
  setVisible: Function
  passwordInfo: PasswordProps
  savePasswordChanges: Function
  deletePassword: Function
}

const windowHeight = Dimensions.get('window').height
const bottomSheetHeight = 0.85

const PasswordInfoOptions = ({ visible, setVisible, passwordInfo, savePasswordChanges, deletePassword }: PasswordInfoOptionsProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const [name, setName] = useState("")
  const [user, setUser] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [comments, setComments] = useState("")

  const addNewChanges = () => {
    const currentDate = new Date()
    const newData: PasswordProps = {
      id: passwordInfo.id,
      profileName: name != '' ? name : passwordInfo.profileName,
      user: user != '' ? user : passwordInfo.user,
      email: email != '' ? email : passwordInfo.email,
      password: password != '' ? password : passwordInfo.password,
      comments: comments != '' ? comments : passwordInfo.comments,
      date: `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`
    }

    savePasswordChanges(newData)
  }

  return (
      <BottomSheet
        visible={visible}
        setVisible={setVisible}
        bottomSheetHeight={bottomSheetHeight}
      >
        <View style={styles.contentContainer}>
          <View style={{ flex: 0.7 }}>
            <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 24 }]}>
              Password Settings
            </Text>
          </View>
          <View style={{ flex: 5 }}>
            <View style={styles.formInputContainer}>
              <FormInput
                label="New Name"
                value={name}
                width="47%"
                onChangeText={(value: string) => setName(value)}
                placeholder={passwordInfo.profileName}
              />
              <FormInput
                label="New User"
                value={user}
                width="47%"
                onChangeText={(value: string) => setUser(value)}
                placeholder={passwordInfo.user != '' ? `${passwordInfo.user}` : 'New user'}
              />
            </View>
            <View style={styles.formInputContainer}>
              <FormInput
                label="New Email"
                value={email}
                onChangeText={(value: string) => setEmail(value)}
                placeholder={passwordInfo.email}
                inputProps={{
                  keyboardType: "email-address",
                  autoCapitalize: 'none'
                }}
              />
            </View>
            <View style={styles.formInputContainer}>
              <FormInput
                label="New Password"
                value={password}
                onChangeText={(value: string) => setPassword(value)}
                placeholder={passwordInfo.password}
                inputProps={{
                  autoCapitalize: 'none',
                  autoCompleteType: 'off',
                  secureTextEntry: false
                }}
              />
            </View>
            <View style={styles.formInputContainer}>
              <FormInput
                label="New Comments"
                value={comments}
                onChangeText={(value: string) => setComments(value)}
                placeholder="Add Comments"
                inputProps={{
                  multiline: true,
                  numberOfLines: 4
                }}
              />
            </View>
            <View style={[styles.formInputContainer, { justifyContent: 'center', marginTop: 10 }]}>
              <Button
                titleStyle={styles.text}
                onPress={addNewChanges}
                title="Save changes"
              />
            </View>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
            <Button
              buttonStyle={{ backgroundColor: '#ff2e2e' }}
              titleStyle={styles.text}
              /* @ts-ignore */
              onPress={deletePassword}
              title="Delete password"
            />
          </View>
        </View>
      </BottomSheet>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  contentContainer: {
    flex: 1,
    height: windowHeight * bottomSheetHeight,
    padding: 10,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text
  },
  formInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: -10
  }
})

export default PasswordInfoOptions