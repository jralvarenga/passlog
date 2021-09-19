import { Linking } from 'react-native'
import InAppReview from 'react-native-in-app-review'
import Snackbar from 'react-native-snackbar'
import { darkTheme } from '../services/theme'

export const rateAppHandler = () => {
  const isAvailable = InAppReview.isAvailable()
  if (isAvailable) {
    InAppReview.RequestInAppReview().then((finished) => {
      if (finished) {
        Snackbar.show({
          text: 'Thanks for rating the app',
          fontFamily: 'poppins',
          textColor: darkTheme.colors.text,
          backgroundColor: darkTheme.colors.primary
        })
      }
    }).catch(() => {
      Snackbar.show({
        text: 'There has been an error',
        fontFamily: 'poppins',
        textColor: darkTheme.colors.text,
        backgroundColor: darkTheme.colors.primary
      })
      Linking.openURL('https://play.google.com/store/apps/details?id=com.passlog&reviewId=0')
    })
  }
}