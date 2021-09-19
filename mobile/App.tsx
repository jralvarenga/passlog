import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import ProviderStaging from './src/services/ProviderStaging'
import messaging from '@react-native-firebase/messaging'

const App = () => {

  const setupCloudMessaging = async() => {
    await messaging().registerDeviceForRemoteMessages()

    const authStatus = await messaging().requestPermission()
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL

    if (!enabled) {
      console.log("Don't have permition for notifications")
    }
  }

  useEffect(() => {
    setupCloudMessaging();

    // On app open gets notification
    const unsubscribe = messaging().onMessage(async(message) => {
      const title = message.notification?.title ? message.notification?.title : '--No title--'
      console.log(`On message: ${title}`)
    });

    // In background notification open app
    messaging().onNotificationOpenedApp(async(message) => {
      const title = message.notification?.title ? message.notification?.title : '--No title--'
      console.log(`Notification open app: ${title}`)
    })

    // In sleep app receive notification
    messaging().getInitialNotification().then((message) => {
      if (message) {
        const title = message.notification?.title ? message.notification?.title : '--No title--'
        console.log(`Initial notification: ${title}`)
      }
    })

    return unsubscribe
  }, [])

  return (
    <ProviderStaging />
  )
}

export default App