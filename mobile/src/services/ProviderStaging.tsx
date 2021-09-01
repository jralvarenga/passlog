import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StatusBar } from 'react-native'
import { ThemeProvider as ElementsThemeProvider } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigator from './Navigator'
import { darkElementsTheme, darkTheme } from './theme'

const ProviderStaging = () => {

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={darkTheme}>
        <ElementsThemeProvider theme={darkElementsTheme}>
          <StatusBar backgroundColor={darkTheme.colors.background} barStyle="light-content" />
          <Navigator />
        </ElementsThemeProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default ProviderStaging