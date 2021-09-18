import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-elements'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import { removeUserSettings } from '../lib/asyncStorage'
import { returnCurrentUser, signOutHandler } from '../lib/auth'
import { usePasslogUserData } from '../services/PasslogUserDataProvider'

interface AccountSettingsScreenProps {
  navigation: any
}

const AccountSettingsScreen = ({ navigation }: AccountSettingsScreenProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { setUser, renderPasslogDataHandler } = usePasslogUserData()
  const user = returnCurrentUser()
  const optionActions = [
    {
      title: 'Wipe cloud data',
      function: () => console.log('wipe')
    },
    {
      title: 'Delete account',
      function: () => console.log('delete')
    }
  ]

  const signOutButtonHandler = async() => {
    await signOutHandler()
    await removeUserSettings()
    setUser!(null)
    renderPasslogDataHandler!()
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar backgroundColor="#000" />
      <View style={styles.userInfoContainer}>
        <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 28 }]}>
          {user?.displayName}
        </Text>
        <Text style={styles.text}>
          {user?.email}
        </Text>
      </View>
      <View style={styles.optionsContainer}>
        {optionActions.map((item, i) => (
          <TouchableOpacity
            key={i}
            onPress={item.function}
            activeOpacity={0.7}
            style={styles.optionBox}
          >
            <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 20 }]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.signOutContainer}>
        <Button
          title="Sign out"
          onPress={signOutButtonHandler}
          buttonStyle={styles.signOutButton}
          containerStyle={styles.signOutButtonContainer}
          titleStyle={[styles.text, { fontFamily: 'poppins-bold' }]}
          icon={{ name: "exit", type: "ionicon", color: theme.colors.text, size: 25 }}
        />
      </View>
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text
  },
  userInfoContainer: {
    flex: 1.5,
    width: '95%',
    justifyContent: 'center'
  },
  optionsContainer: {
    flex: 5,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  optionBox: {
    width: '45%',
    minHeight: 100,
    padding: 10,
    borderRadius: 15,
    margin: '2%',
    backgroundColor: theme.colors.card
  },
  signOutContainer: {
    flex: 1,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  signOutButton: {
    backgroundColor: '#ff2e2e',
  },
  signOutButtonContainer: {
    width: '100%',
  },
})

export default AccountSettingsScreen