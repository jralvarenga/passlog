import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Theme, useTheme } from '@react-navigation/native'
import HeaderNavigationBar from '../components/HeaderNavigationBar'
import { Button, Switch } from 'react-native-elements'
import InputCode, {InputCodeHandler} from '../components/InputCode'
import ReactNativeBiometrics from 'react-native-biometrics'

const OnStartSecurityScreen = () => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const [usePin, setUsePin] = useState(false)
  const [canUseBiometrics, setCanUseBiometrics] = useState(false)
  const [useBiometrics, setUseBiometrics] = useState(false)
  const [code, setCode] = useState("")
  const inputCodeRef = useRef<InputCodeHandler>(null)
  const [saveCodeButton, setSaveCodeButton] = useState(false)

  const onChangeCode = useCallback((value) => {
    setCode(value)
  }, [])

  const onFullFill = useCallback((value) => {
    setSaveCodeButton(true)
  }, [inputCodeRef])

  const biometricExists = async() => {
    const { available, biometryType } = await ReactNativeBiometrics.isSensorAvailable()
    if (available) {
      setCanUseBiometrics(true)
    }
  }

  const saveCode = async() => {
    console.log('Saved')
  }

  useEffect(() => {
    biometricExists()
  }, [])

  return (
    <View style={styles.container}>
      <HeaderNavigationBar
        title="On start security"
      />
      <View style={styles.optionsContainer}>
        <View style={styles.optionBox}>
          <Text style={[styles.text, { fontSize: 18, fontFamily: 'poppins-bold' }]}>
            Use pin code
          </Text>
          <Switch
            value={usePin}
            onChange={() => setUsePin(!usePin)}
            color={theme.colors.primary}
          />
        </View>
        {canUseBiometrics && (
          <View style={styles.optionBox}>
            <Text style={[styles.text, { fontSize: 18, fontFamily: 'poppins-bold' }]}>
              Use biometrics
            </Text>
            <Switch
              value={useBiometrics}
              onChange={() => setUseBiometrics(!useBiometrics)}
              color={theme.colors.primary}
            />
          </View>
        )}
      </View>
      <View style={styles.inputPinContainer}>
        <Text style={[styles.text, { fontFamily: 'poppins-bold', marginBottom: 10 }]}>
          Set or change your pin
        </Text>
        <View>
          {usePin && (
            <InputCode
              code={code}
              length={4}
              ref={inputCodeRef}
              onChangeCode={onChangeCode}
              onFullFill={onFullFill}
              //passcode
              //passcodeChar="*"
            />
          )}
        </View>
        {saveCodeButton && (
          <Button
            containerStyle={{ width: 150 }}
            titleStyle={styles.text}
            onPress={saveCode}
            title="Save pin"
          />
        )}
      </View>
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
    flex: 1.2,
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
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
})

export default OnStartSecurityScreen