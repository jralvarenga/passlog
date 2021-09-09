import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Theme, useTheme } from '@react-navigation/native'
import { Button, Icon } from 'react-native-elements'
import { generatePassword } from '../lib/generatePassword'
import Clipboard from '@react-native-clipboard/clipboard'
import Snackbar from 'react-native-snackbar'
import BottomSheet from './BottomSheet'

interface GeneratePasswordSheetProps {
  goToScreen: Function
  visible: boolean
  setVisible: Function
}

const windowHeight = Dimensions.get('window').height
const bottomSheetPercentage = 0.35

const GeneratePasswordSheet = ({ goToScreen, visible, setVisible }: GeneratePasswordSheetProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const [password, setPassword] = useState(generatePassword())

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
        visible={visible}
        setVisible={setVisible}
        heightPercentage={1 - bottomSheetPercentage}
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
          <View style={styles.buttonContainer}>
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
    height: windowHeight * bottomSheetPercentage,
    flex: 1,
    padding: 15,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
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
  buttonContainer: {
    flex: 4,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  }
})

export default GeneratePasswordSheet