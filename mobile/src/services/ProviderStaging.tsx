import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import Navigator from './Navigator'
import { darkTheme } from './theme'

const ProviderStaging = () => {

  return (
    <NavigationContainer theme={darkTheme}>
      <Navigator />
    </NavigationContainer>
  )
}

export default ProviderStaging