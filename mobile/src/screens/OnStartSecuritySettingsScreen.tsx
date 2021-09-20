import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Theme, useTheme } from '@react-navigation/native'
import HeaderNavigationBar from '../components/HeaderNavigationBar'
import { Button, Switch } from 'react-native-elements'
import InputCode, {InputCodeHandler} from '../components/InputCode'
import ReactNativeBiometrics from 'react-native-biometrics'
import { usePasslogUserData } from '../services/PasslogUserDataProvider'
import { SettingsProps } from '../interface/interfaces'
import { setSettingsInStorage } from '../lib/asyncStorage'
import Snackbar from 'react-native-snackbar'
import { useTranslation } from 'react-i18next'

const OnStartSecuritySettingsScreen = () => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { t } = useTranslation()
  const { settings, setSettings, renderPasslogDataHandler } = usePasslogUserData()
  const [usePin, setUsePin] = useState(false)
  const [canUseBiometrics, setCanUseBiometrics] = useState(false)
  const [useBiometrics, setUseBiometrics] = useState(false)
  const [biometricType, setBiometricType] = useState<'Biometrics' | 'Face ID' | 'Touch ID' | 'none'>('none')
  const [code, setCode] = useState('')
  const inputCodeRef = useRef<InputCodeHandler>(null)
  const [saveCodeButton, setSaveCodeButton] = useState(false)

  const biometricExists = async() => {
    const { available, biometryType } = await ReactNativeBiometrics.isSensorAvailable()
    if (biometryType == ReactNativeBiometrics.TouchID) {
      setBiometricType('Touch ID')
    } else if (biometryType == ReactNativeBiometrics.FaceID) {
      setBiometricType('Face ID')
    } else if (biometryType == ReactNativeBiometrics.Biometrics) {
      setBiometricType('Biometrics')
    } else {
      setBiometricType('none')
    }

    if (available) {
      setCanUseBiometrics(true)
    }
  }

  const saveNewSettings = async() => {
    const newSettings: SettingsProps = {
      usePin: usePin,
      useBiometrics: useBiometrics,
      pinNumber: code,
      askForAlwaysSync: settings?.askForAlwaysSync ? settings?.askForAlwaysSync : false,
      firstTime: settings?.firstTime ? settings?.firstTime : false
    }
    setSettings!(newSettings)
    renderPasslogDataHandler!()

    await setSettingsInStorage(newSettings)

    Snackbar.show({
      text: t('settings_changed'),
      fontFamily: 'poppins',
      textColor: theme.colors.text,
      backgroundColor: theme.colors.primary
    })
  }

  useEffect(() => {
    biometricExists()
    setUsePin(settings?.usePin ? settings?.usePin : false)
    setUseBiometrics(settings?.useBiometrics ? settings?.useBiometrics : false)
    setCode(settings?.pinNumber ? settings?.pinNumber : '')
  }, [])

  const onChangeCode = useCallback((value) => {
    setCode(value)
  }, [])

  const onFullFillCode = useCallback(() => {
    setSaveCodeButton(true)
  }, [inputCodeRef])

  const usePinCodeHandler = async(state: boolean) => {
    if (state == true) {
      setUsePin(true)
    } else {
      console.log('unsubcribe')
      setUsePin(false)
      setUseBiometrics(false)
      setCode('')

      const newSettings: SettingsProps = {
        usePin: false,
        useBiometrics: false,
        pinNumber: "",
        askForAlwaysSync: settings?.askForAlwaysSync ? settings?.askForAlwaysSync : false,
        firstTime: settings?.firstTime ? settings?.firstTime : false
      }
      setSettings!(newSettings)
      renderPasslogDataHandler!()
  
      await setSettingsInStorage(newSettings)
  
      Snackbar.show({
        text: t('settings_changed'),
        fontFamily: 'poppins',
        textColor: theme.colors.text,
        backgroundColor: theme.colors.primary
      })
    }
  }

  const useBiometricsHandler = (state: boolean) => {
    if (usePin && code != '') {
      if (state) {
        setUseBiometrics(true)
        setSaveCodeButton(true)
      } else {
        setUseBiometrics(false)
      }
    } else {
      setUseBiometrics(state)
    }
  }

  return (
    <View style={styles.container}>
      <HeaderNavigationBar
        title={t('on_start_security_title')}
      />
      <View style={styles.optionsContainer}>
        <View style={styles.optionBox}>
          <Text style={[styles.text, { fontSize: 18, fontFamily: 'poppins-bold' }]}>
            {t('use_pin_code')}
          </Text>
          <Switch
            value={usePin}
            onChange={() => usePinCodeHandler(!usePin)}
            color={theme.colors.primary}
          />
        </View>
        {canUseBiometrics && (
          <View style={styles.optionBox}>
            <Text style={[styles.text, { fontSize: 18, fontFamily: 'poppins-bold' }]}>
              {t('use_biometric_type', { type: biometricType })}
            </Text>
            <Switch
              value={useBiometrics}
              onChange={() => useBiometricsHandler(!useBiometrics)}
              color={theme.colors.primary}
            />
          </View>
        )}
      </View>
      {usePin && (
        <View style={styles.inputPinContainer}>
          <View>
            <Text style={[styles.text, { fontFamily: 'poppins-bold', marginBottom: 10, textAlign: 'center' }]}>
              {t('set_pin')}
            </Text>
            <InputCode
              code={code}
              length={4}
              ref={inputCodeRef}
              onChangeCode={onChangeCode}
              onFullFill={onFullFillCode}
              //passcode
              //passcodeChar="*"
            />
          </View>
          {saveCodeButton && (
            <Button
              containerStyle={{ width: 180, marginBottom: '20%' }}
              titleStyle={styles.text}
              onPress={saveNewSettings}
              title={t('save_settings')}
            />
          )}
        </View>
      )}
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text,
  },
  optionsContainer: {
    width: '95%',
    flex: 2.2,
  },
  optionBox: {
    padding: 15,
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderColor: theme.colors.card,
    borderRadius: 15
  },
  inputPinContainer: {
    flex: 3,
    width: '95%',
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  }
})

export default OnStartSecuritySettingsScreen