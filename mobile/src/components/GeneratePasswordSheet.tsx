import React, { useCallback, useEffect, useMemo, useState } from 'react'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { StyleSheet, Text, View } from 'react-native'
import { Theme, useTheme } from '@react-navigation/native'
import { Button, Icon } from 'react-native-elements'
import { generatePassword } from '../lib/generatePassword'
import Clipboard from '@react-native-clipboard/clipboard'
import Snackbar from 'react-native-snackbar'

interface GeneratePasswordSheetProps {
  bottomSheetRef: any,
  handleSheetChanges: any
  goToScreen: Function
}

const GeneratePasswordSheet = ({ bottomSheetRef, handleSheetChanges, goToScreen }: GeneratePasswordSheetProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const snapPoints = useMemo(() => ['10%', '45%', '55%'], [])
  const [backdropPressBehavior, setBackdropPressBehavior] = useState<'none' | 'close' | 'collapse'>('collapse')
  const [password, setPassword] = useState(generatePassword())

  const renderBackdrop = useCallback((props) => (
    <BottomSheetBackdrop {...props} pressBehavior={backdropPressBehavior} />
  ), [backdropPressBehavior])

  const refreshPassword = () => {
    const newPassword = generatePassword()
    setPassword(newPassword)
  }

  useEffect(() => {
    Clipboard.addListener(() => console.log('changed clipboard'))
    
    return Clipboard.removeAllListeners()
  }, [])

  const copyPassword = () => {
    Clipboard.setString(password)

    Snackbar.show({
      text: 'Password copied',
      fontFamily: 'poppins',
      textColor: theme.colors.text,
      backgroundColor: theme.colors.primary
    })
  }

  const createNewPasswordProfile = () => {
    goToScreen('createPassword', {
      generatedPassword: password
    })
  }

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
          <View style={{ flex: 1}}>
            <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 24 }]}>
              Secure Password:
            </Text>
          </View>
          <View style={{ flex: 3 }}>
            <View style={styles.passwordContainer}>
              <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 22 }]}>
                {password}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  name="refresh"
                  color={theme.colors.text}
                  onPress={refreshPassword}
                  containerStyle={[styles.iconContainerStyle, { marginRight: 8 }]}
                  type="ionicon"
                />
                <Icon
                  name="copy"
                  color={theme.colors.text}
                  onPress={copyPassword}
                  containerStyle={[styles.iconContainerStyle, { marginRight: 10 }]}
                  type="ionicon"
                />
              </View>
            </View>
          </View>
          <View style={{ flex: 4, alignItems: 'flex-end' }}>
            <Button
              titleStyle={styles.text}
              title="Create password profile"
              onPress={createNewPasswordProfile}
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
  }
})

export default GeneratePasswordSheet