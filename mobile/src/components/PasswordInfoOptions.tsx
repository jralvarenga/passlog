import React, { useCallback, useMemo, useState } from 'react'
import BottomSheet, { BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { StyleSheet, Text, View } from 'react-native'
import { Theme, useTheme } from '@react-navigation/native'
import { reduceIncrementColor } from '../lib/reduceIncrementColor'
import { Button } from 'react-native-elements'
import { PasswordProps } from '../interface/interfaces'

interface PasswordInfoOptionsProps {
  bottomSheetRef: any,
  handleSheetChanges: any
  passwordInfo: PasswordProps
  savePasswordChanges: Function
}

const PasswordInfoOptions = ({ bottomSheetRef, handleSheetChanges, passwordInfo, savePasswordChanges }: PasswordInfoOptionsProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const snapPoints = useMemo(() => ['5%', '80%'], [])
  const [backdropPressBehavior, setBackdropPressBehavior] = useState<'none' | 'close' | 'collapse'>('collapse')
  const [name, setName] = useState("")
  const [user, setUser] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [comments, setComments] = useState("")

  const addNewChanges = () => {
    const newData: PasswordProps = {
      id: passwordInfo.id,
      profileName: name != '' ? name : passwordInfo.profileName,
      user: user != '' ? user : passwordInfo.user,
      email: email != '' ? email : passwordInfo.email,
      password: password != '' ? password : passwordInfo.password,
      comments: comments != '' ? comments : passwordInfo.comments,
      date: 'new date'
    }

    savePasswordChanges(newData)
  }

  const renderBackdrop = useCallback((props) => (
    <BottomSheetBackdrop {...props} pressBehavior={backdropPressBehavior} />
  ), [backdropPressBehavior])

  return (
      <BottomSheet
        /* @ts-ignore */
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: theme.colors.background }}
        handleIndicatorStyle={{ backgroundColor: theme.colors.text }}
        backdropComponent={renderBackdrop}
      >
        <View style={styles.contentContainer}>
          <View style={{ flex: 0.7 }}>
            <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 24 }]}>
              Password Settings
            </Text>
          </View>
          <View style={{ flex: 5 }}>
            <View style={styles.formInputContainer}>
              <BottomSheetTextInput
                style={[styles.inputStyle, { width: '47%' }]}
                placeholderTextColor={reduceIncrementColor(theme.colors.text, 'reduce', 100)}
                value={name}
                onChangeText={(value) => setName(value)}
                placeholder={`Change ${passwordInfo.profileName}`}
              />
              <BottomSheetTextInput
                style={[styles.inputStyle, { width: '47%' }]}
                placeholderTextColor={reduceIncrementColor(theme.colors.text, 'reduce', 100)}
                value={user}
                onChangeText={(value) => setUser(value)}
                placeholder={passwordInfo.user != '' ? `Change ${passwordInfo.user}` : 'New user'}
              />
            </View>
            <View style={styles.formInputContainer}>
              <BottomSheetTextInput
                style={styles.inputStyle}
                placeholderTextColor={reduceIncrementColor(theme.colors.text, 'reduce', 100)}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(value) => setEmail(value)}
                placeholder={`Change ${passwordInfo.email}`}
              />
            </View>
            <View style={styles.formInputContainer}>
              <BottomSheetTextInput
                style={styles.inputStyle}
                placeholderTextColor={reduceIncrementColor(theme.colors.text, 'reduce', 100)}
                value={password}
                autoCapitalize="none"
                autoCompleteType="off"
                onChangeText={(value) => setPassword(value)}
                placeholder={`Change ${passwordInfo.password}`}
              />
            </View>
            <View style={styles.formInputContainer}>
              <BottomSheetTextInput
                style={styles.inputStyle}
                placeholderTextColor={reduceIncrementColor(theme.colors.text, 'reduce', 100)}
                value={comments}
                onChangeText={(value) => setComments(value)}
                multiline
                numberOfLines={4}
                placeholder={`Add Comments`}
              />
            </View>
            <View style={[styles.formInputContainer, { justifyContent: 'center' }]}>
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
    padding: 12,
    backgroundColor: theme.colors.background
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text
  },
  passwordContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 35
  },
  iconContainerStyle: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: 100,
  },
  inputStyle: {
    width: '100%',
    borderRadius: 10,
    fontSize: 16,
    fontFamily: 'poppins',
    color: theme.colors.text,
    backgroundColor: theme.colors.card
  },
  formInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  }
})

export default PasswordInfoOptions