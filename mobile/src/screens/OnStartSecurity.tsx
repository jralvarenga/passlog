import { Theme, useTheme } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Snackbar from 'react-native-snackbar'
import InputCode, { InputCodeHandler } from '../components/InputCode'
import { getSettings } from '../lib/asyncStorage'

interface OnStartSecurityProps {
  setOnStartSecurity: Function
}

const windowHeight = Dimensions.get('window').height

const OnStartSecurity = ({ setOnStartSecurity }: OnStartSecurityProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const inputCodeRef = useRef<InputCodeHandler>(null)
  const [code, setCode] = useState('')

  const getSavedPin = async() => {
    const { pinNumber } = await getSettings()
    console.log(pinNumber)
    return pinNumber
  }

  useEffect(() => {
  }, [])

  const compareCodes = async(entered: string) => {
    const savedPin = await getSavedPin()
    if (savedPin == entered) {
      setOnStartSecurity(false)
    } else {
      Snackbar.show({
        text: 'Incorrect Code',
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
              On Start Security
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
    height: windowHeight * 0.15,
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
    paddingTop: '15%'
  }
})

export default OnStartSecurity