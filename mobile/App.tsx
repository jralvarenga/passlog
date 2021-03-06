import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import ProviderStaging from './src/services/ProviderStaging'
import messaging from '@react-native-firebase/messaging'
import { rateAppHandler } from './src/lib/rateAppHandler'
import { Linking, StatusBar } from 'react-native'
import { darkTheme } from './src/services/theme'

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
    setupCloudMessaging()

    // On app open gets notification
    const unsubscribe = messaging().onMessage(async(message) => {
      const title = message.notification?.title ? message.notification?.title : '--No title--'
      console.log(`On message: ${title}`)
      const idTitle = title.toLowerCase().replace(' ', '-')
      if (idTitle == 'are-you-enjoying-passlog?' || idTitle == 'rate-passlog!!' || idTitle == 'estás-disfrutando-passlog?' || idTitle == 'califica-passlog!!') {
        rateAppHandler()
      }
      if (idTitle == 'try-calculary' || idTitle == 'prueba-calculary') {
        Linking.openURL('https://play.google.com/store/apps/details?id=com.failedbump.calculary')
      }
    });

    // In background notification open app
    messaging().onNotificationOpenedApp(async(message) => {
      const title = message.notification?.title ? message.notification?.title : '--No title--'
      console.log(`Notification open app: ${title}`)
      const idTitle = title.toLowerCase().replace(' ', '-')
      if (idTitle == 'are-you-enjoying-passlog?' || idTitle == 'rate-passlog!!' || idTitle == 'estás-disfrutando-passlog?' || idTitle == 'califica-passlog!!') {
        rateAppHandler()
      }
      if (idTitle == 'try-calculary' || idTitle == 'prueba-calculary') {
        Linking.openURL('https://play.google.com/store/apps/details?id=com.failedbump.calculary')
      }
    })

    // In sleep app receive notification
    messaging().getInitialNotification().then((message) => {
      if (message) {
        const title = message.notification?.title ? message.notification?.title : '--No title--'
        console.log(`Initial notification: ${title}`)
        
        const idTitle = title.toLowerCase().replace(' ', '-')
        if (idTitle == 'are-you-enjoying-passlog?' || idTitle == 'rate-passlog!!' || idTitle == 'estás-disfrutando-passlog?' || idTitle == 'califica-passlog!!') {
          rateAppHandler()
        }
        if (idTitle == 'try-calculary' || idTitle == 'prueba-calculary') {
          Linking.openURL('https://play.google.com/store/apps/details?id=com.failedbump.calculary')
        }
      }
    })

    return unsubscribe
  }, [])

  return (
    <>
      <StatusBar backgroundColor={darkTheme.colors.background}  />
      <ProviderStaging />
    </>
  )
}

export default App