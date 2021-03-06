import { Theme, useTheme } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import ReactNativeBiometrics from 'react-native-biometrics'
import { Button } from 'react-native-elements'
import Snackbar from 'react-native-snackbar'
import InputCode, { InputCodeHandler } from '../components/InputCode'
import { getSettings } from '../lib/asyncStorage'

interface OnStartSecurityProps {
  setOnStartSecurity: Function
}

const WINDOW_HEIGHT = Dimensions.get('window').height

const OnStartSecurity = ({ setOnStartSecurity }: OnStartSecurityProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { t } = useTranslation()
  const inputCodeRef = useRef<InputCodeHandler>(null)
  const [code, setCode] = useState('')

  const getSavedPin = async() => {
    const { pinNumber } = await getSettings()
    return pinNumber
  }

  const getBiometricConfirmation = async() => {
    const { useBiometrics } = await getSettings()
    if (useBiometrics) {
      try {
        const { success } = await ReactNativeBiometrics.simplePrompt({ promptMessage: 'Enter Your Biometrics' })
        if (success) {
          setOnStartSecurity(false)
        } else {
          Snackbar.show({
            text: t('biometrics_cancelled'),
            fontFamily: 'poppins',
            textColor: theme.colors.text,
            backgroundColor: theme.colors.primary
          })
        }
      } catch (error) {
        console.log(error)
      } 
    }
  }

  useEffect(() => {
    getBiometricConfirmation()
  }, [])

  const compareCodes = async(entered: string) => {
    const savedPin = await getSavedPin()
    if (savedPin == entered) {
      setOnStartSecurity(false)
    } else {
      Snackbar.show({
        text: t('incorrect_code'),
        fontFamily: 'poppins',
        textColor: theme.colors.text,
        backgroundColor: theme.colors.primary
      })
      setCode('')
    }
  }

  const onChangeCode = useCallback((value) => {
    setCode(value)
  }, [])

  const onFullFillCode = useCallback((value) => {
    compareCodes(value)
  }, [inputCodeRef])

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerInfo}>
          <View style={styles.goBackContainer} />
          <View style={styles.pageName}>
            <Text style={[styles.text, { fontSize: 35, fontFamily: 'poppins-bold' }]}>
              {t('on_start_security_title')}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputCode
          code={code}
          length={4}
          ref={inputCodeRef}
          onChangeCode={onChangeCode}
          onFullFill={onFullFillCode}
        />
      </View>
      <View style={styles.buttonsContainer}>
        {/*<Button
          containerStyle={styles.buttonContainerStyle}
          buttonStyle={{ borderWidth: 2, borderColor: theme.colors.primary }}
          titleStyle={styles.text}
          title={t('use_biometrics')}
        />*/}
        <Button
          containerStyle={styles.buttonContainerStyle}
          onPress={() => setCode("")}
          buttonStyle={styles.clearButtonStyle}
          titleStyle={styles.text}
          title={t('clear')}
        />
      </View>
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  headerContainer: {
    width: '100%',
    height: WINDOW_HEIGHT * 0.15,
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text
  },
  headerInfo: {
    width: '75%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  headerOptions: {
    width: '25%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  goBackContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '40%'
  },
  pageName: {
    width: '100%',
    display: 'flex',
    paddingLeft: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    height: '60%'
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonsContainer: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainerStyle: {
    width: '40%',
    marginHorizontal: 5
  },
  clearButtonStyle: {
    backgroundColor: theme.colors.background,
    borderWidth: 2,
    borderColor: theme.colors.primary
  }
})

export default OnStartSecurity