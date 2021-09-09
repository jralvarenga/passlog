import { Theme, useTheme } from '@react-navigation/native'
import React, { useCallback, useRef, useState } from 'react'
import { Linking, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import SettingsSheets, { AppSettingsSheet, CloudSettingsSheet } from '../components/SettingsSheets'

interface SettingsScreenProps {
  navigation: any
}

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const user = ""
  const [showSettingsSheet, setShowSettingsSheet] = useState(false)
  const [showInSheet, setShowInSheet] = useState("")

  const goToScreen = (screen: string, params: any) => {
    setShowSettingsSheet(false)
    navigation.navigate(screen, params)
  }

  const showSettingsSheetHandler = (page: string) => {
    setShowInSheet(page)
    setShowSettingsSheet(true)
  }

  const goToGoogleSavedPassword = () => {
    Linking.openURL('https://passwords.google.com/')
  }

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar backgroundColor={theme.colors.background} />
      <View style={styles.userInfoContainer}>
        <View style={{ width: '100%' }}>
          <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 30 }]}>
            {user != null ? (
              "Steve Dolphin"
            ) : (
              "Anounimous"
            )}
          </Text>
          {user != null ?? (
            <Text style={[styles.text]}>
              stevedolphin123@email.com
            </Text>
          )}
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
          {user != null && (
            <Text style={[styles.text, { fontFamily: 'poppins-bold', textAlign: 'center' }]}>
              136 KiB available in Cloud
            </Text>
          )}
        </View>
        <View style={styles.backupSettingsContainer}>
          {user != null && (
            <>
            <Button
              containerStyle={{ width: '49%' }}
              onPress={() => showSettingsSheetHandler('cloudSettings')}
              title="Cloud settings"
              titleStyle={[styles.text, { fontFamily: 'poppins-bold' }]}
            />
            <Button
              containerStyle={{ width: '49%' }}
              onPress={goToGoogleSavedPassword}
              buttonStyle={{ backgroundColor: "#fff" }}
              titleStyle={{ color: "#1a1a1a", fontFamily: 'poppins-bold' }}
              title="Saved password"
              icon={{ name: "logo-google", type: "ionicon", color: "#1a1a1a" }}
            />
          </>
          )}
        </View>
      </View>
      <View style={styles.appSettingsContainer}>
        <Button
          title="App Settings"
          onPress={() => showSettingsSheetHandler('appSettings')}
          buttonStyle={{ justifyContent: 'flex-start', padding: 15, backgroundColor: theme.colors.card }}
          titleStyle={[styles.text, { fontFamily: 'poppins-bold' }]}
          icon={{ name: "settings", type: "ionicon", color: theme.colors.text, size: 25 }}
        />
        {user != null ? (
          <Button
            title="Account settings"
            containerStyle={{ marginTop: 15 }}
            buttonStyle={{ justifyContent: 'flex-start', padding: 15, backgroundColor: theme.colors.card }}
            titleStyle={[styles.text, { fontFamily: 'poppins-bold' }]}
            icon={{ name: "account-settings", type: "material-community", color: theme.colors.text, size: 25 }}
          />
        ) : (
          <Button
            title="Sign in or Create account"
            onPress={() => navigation.navigate('login')}
            containerStyle={{ marginTop: 15 }}
            buttonStyle={{ justifyContent: 'flex-start', padding: 15 }}
            titleStyle={[styles.text, { fontFamily: 'poppins-bold' }]}
            icon={{ name: "account", type: "material-community", color: theme.colors.text, size: 25 }}
          />
        )}
      </View>
      <View style={styles.signOutContainer}>
        {user != null && (
          <Button
            title="Sign out"
            buttonStyle={styles.signOutButton}
            containerStyle={styles.signOutButtonContainer}
            titleStyle={[styles.text, { fontFamily: 'poppins-bold' }]}
            icon={{ name: "exit", type: "ionicon", color: theme.colors.text, size: 25 }}
          />
        )}
      </View>
      <SettingsSheets
        visible={showSettingsSheet}
        setVisible={setShowSettingsSheet}
      >
        <>
          {showInSheet == 'appSettings' && (
            <AppSettingsSheet
              goToScreen={goToScreen}
            />
          )}
          {showInSheet == 'cloudSettings' && (
            <CloudSettingsSheet />
          )}
        </>
      </SettingsSheets>
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
  },
  contentContainer: {
    flex: 1,
    padding: 12,
    backgroundColor: theme.colors.background
  },
})

export default SettingsScreen