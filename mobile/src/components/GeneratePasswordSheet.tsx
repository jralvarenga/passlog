import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Theme, useTheme } from '@react-navigation/native'
import { Button, Icon } from 'react-native-elements'
import { generatePassword } from '../lib/generatePassword'
import Clipboard from '@react-native-clipboard/clipboard'
import Snackbar from 'react-native-snackbar'
import BottomSheet from './BottomSheet'
import { useTranslation } from 'react-i18next'

interface GeneratePasswordSheetProps {
  goToScreen: Function
  visible: boolean
  setVisible: Function
}

const WINDOW_HEIGHT = Dimensions.get('window').height
const BOTTOM_SHEET_HEIGHT = 0.35

const GeneratePasswordSheet = ({ goToScreen, visible, setVisible }: GeneratePasswordSheetProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { t } = useTranslation()
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
      text: t('password_copied'),
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
        bottomSheetHeight={BOTTOM_SHEET_HEIGHT}
      >
        <View style={styles.contentContainer}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 24 }]}>
              {t('secure_password')}
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
              title={t('create_password')}
              onPress={createNewPasswordProfile}
            />
          </View>
        </View>
      </BottomSheet>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  contentContainer: {
    height: WINDOW_HEIGHT * BOTTOM_SHEET_HEIGHT,
    flex: 1,
    padding: 15,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
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