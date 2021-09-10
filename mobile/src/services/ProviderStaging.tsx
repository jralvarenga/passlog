import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { ThemeProvider as ElementsThemeProvider } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { getSettings } from '../lib/asyncStorage'
import OnStartSecurity from '../screens/OnStartSecurity'
import Navigator from './Navigator'
import { PasslogUserDataProvider } from './PasslogUserDataProvider'
import { darkElementsTheme, darkTheme } from './theme'

const ProviderStaging = () => {
  const [onStartSecurity, setOnStartSecurity] = useState(false)

  const getOnStartSettings = async() => {
    const { usePin } = await getSettings()
    if (usePin) {
      setOnStartSecurity(usePin)
    }
  }

  useEffect(() => {
    getOnStartSettings()
  }, [])

  if (onStartSecurity) {
    return (
      <NavigationContainer theme={darkTheme}>
        <ElementsThemeProvider theme={darkElementsTheme}>
            <>
              <StatusBar backgroundColor={darkTheme.colors.background} barStyle="light-content" />
              <OnStartSecurity
                setOnStartSecurity={setOnStartSecurity}
              />
            </>
        </ElementsThemeProvider>
      </NavigationContainer>
    )
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={darkTheme}>
        <ElementsThemeProvider theme={darkElementsTheme}>
          <PasslogUserDataProvider>
            <>
              <StatusBar backgroundColor={darkTheme.colors.background} barStyle="light-content" />
              <Navigator />
            </>
          </PasslogUserDataProvider>
        </ElementsThemeProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default ProviderStaging