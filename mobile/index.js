import React from 'react'
import { AppRegistry } from 'react-native'
import App from './App'
import {name as appName} from './app.json'
import messaging from '@react-native-firebase/messaging'
import { Text } from 'react-native'
import './i18n.ts'

messaging().setBackgroundMessageHandler(async(message) => {
  const title = message.notification?.title ? message.notification?.title : '--No title--'

  console.log(`New Passlog notification: ${title}`)
})

function HeadlessCheck({isHeadless}) {
  return isHeadless ? null : <App />
}

Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.allowFontScaling = false

AppRegistry.registerComponent(appName, () => HeadlessCheck)
