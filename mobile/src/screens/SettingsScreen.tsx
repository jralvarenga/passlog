import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'

interface SettingsScreenProps {
  navigation: any
}

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar backgroundColor={theme.colors.background} />
      <View style={styles.userInfoContainer}>
        <View style={{ width: '100%' }}>
          <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 30 }]}>
            Steve Dolphin
          </Text>
          <Text style={[styles.text]}>
            stevedolphin123@email.com
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={[styles.text, { fontFamily: 'poppins-bold' }]}>
            13 passwords & 5 cards in Passlog
          </Text>
        </View>
      </View>
      <View style={styles.backUpContainer}>
        <View style={styles.backupSpaceContainer}>
          <Text style={[styles.text, { fontFamily: 'poppins-bold', textAlign: 'center' }]}>
            986 KiB used in Storage
          </Text>
          <Text style={[styles.text, { fontFamily: 'poppins-bold', textAlign: 'center' }]}>
            136 KiB available in Cloud
          </Text>
        </View>
        <View style={styles.backupSettingsContainer}>
          <Button
            containerStyle={{ width: '49%' }}
            title="Cloud settings"
            titleStyle={[styles.text, { fontFamily: 'poppins-bold' }]}
          />
          <Button
            containerStyle={{ width: '49%' }}
            buttonStyle={{ backgroundColor: "#fff" }}
            titleStyle={{ color: "#1a1a1a", fontFamily: 'poppins-bold' }}
            title="Saved password"
            icon={{ name: "logo-google", type: "ionicon", color: "#1a1a1a" }}
          />
        </View>
      </View>
      <View style={styles.appSettingsContainer}>
        <Button
          title="App Settings"
          onPress={() => navigation.navigate('login')}
          buttonStyle={{ justifyContent: 'flex-start', padding: 15, backgroundColor: theme.colors.card }}
          titleStyle={[styles.text, { fontFamily: 'poppins-bold' }]}
          icon={{ name: "settings", type: "ionicon", color: theme.colors.text, size: 25 }}
        />
        <Button
          title="Account settings"
          containerStyle={{ marginTop: 15 }}
          buttonStyle={{ justifyContent: 'flex-start', padding: 15, backgroundColor: theme.colors.card }}
          titleStyle={[styles.text, { fontFamily: 'poppins-bold' }]}
          icon={{ name: "account-settings", type: "material-community", color: theme.colors.text, size: 25 }}
        />
      </View>
      <View style={styles.signOutContainer}>
        <Button
          title="Sign out"
          buttonStyle={styles.signOutButton}
          containerStyle={styles.signOutButtonContainer}
          titleStyle={[styles.text, { fontFamily: 'poppins-bold' }]}
          icon={{ name: "exit", type: "ionicon", color: theme.colors.text, size: 25 }}
        />
      </View>
    </SafeAreaView>
  )
}


const styleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text,
  },
  userInfoContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backUpContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  appSettingsContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 15
  },
  signOutContainer: {
    flex: 0.7,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  backupSpaceContainer: {
    width: '95%',
    borderWidth: 2,
    padding: 10,
    borderColor: theme.colors.card,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backupSettingsContainer: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20
  },
  signOutButton: {
    backgroundColor: '#ff2e2e',
  },
  signOutButtonContainer: {
    width: '40%',
    marginBottom: 20,
    marginRight: 15
  }
})

export default SettingsScreen