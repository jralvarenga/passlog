import React, { useCallback, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Theme, useTheme } from '@react-navigation/native'
import HeaderNavigationBar from '../components/HeaderNavigationBar'
import { Switch } from 'react-native-elements'
import InputCode, {InputCodeHandler} from '../components/InputCode'

const OnStartSecurity = () => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const [usePin, setUsePin] = useState(true)
  const [useBiometrics, setUseBiometrics] = useState(false)
  const [code, setCode] = useState("")
  const inputCodeRef = useRef<InputCodeHandler>(null)

  const onChangeCode = useCallback((value) => {
    console.log(value)
    setCode(value)
  }, [])

  const onFullFill = useCallback((value) => {
    console.log(value)
    setTimeout(() => {
      setCode('')
      inputCodeRef.current!.focus()
    }, 100)
  }, [inputCodeRef])

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
      </View>
      <View style={styles.inputPinContainer}>
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
    flex: 2,
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
  }
})

export default OnStartSecurity