import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react'
import { Theme, useTheme } from '@react-navigation/native'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Button, Switch } from 'react-native-elements'
import BottomSheet from './BottomSheet'
import { UserSettingsProps } from '../interface/interfaces'
import { getCardsFromStorage, getNotesFromStorage, getPasswordsFromStorage, setUserSettings as setUserSettingsInStorage, wipeAllStorageData } from '../lib/asyncStorage'
import { fullBackupInFirestore } from '../lib/firestore'
import { usePasslogUserData } from '../services/PasslogUserDataProvider'
import { returnCurrentUser, signOutHandler } from '../lib/auth'
import { useTranslation } from 'react-i18next'

interface SettingSheetsProps {
  visible: boolean
  setVisible: Function
  children: ReactElement
}

const WINDOW_HEIGHT = Dimensions.get('window').height
const BOTTOM_SHEET_HEIGHT = 0.25

export const SettingsSheets = ({ visible, setVisible, children }: SettingSheetsProps) => (
  <BottomSheet
    visible={visible}
    setVisible={setVisible}
    bottomSheetHeight={BOTTOM_SHEET_HEIGHT}
  >
    {children}
  </BottomSheet>
)

export const AppSettingsSheet = ({ goToScreen, enableWipeDataScreen }: any) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { t } = useTranslation()

  return (
    <View style={styles.contentContainer}>
      <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 25, }]}>
        {t('app_settings')}
      </Text>
      <View style={styles.appSettingsContainer}>
        <Button
          containerStyle={{ width: '47%' }}
          titleStyle={styles.text}
          title={t('on_start_security_title')}
          onPress={() => goToScreen('onStartSecurity')}
        />
        <Button
          containerStyle={{ width: '47%' }}
          titleStyle={styles.text}
          onPress={enableWipeDataScreen}
          buttonStyle={{ backgroundColor: '#ff2e2e' }}
          title={t('wipe_data_title')}
        />
      </View>
    </View>
  )
}

export const WipeDataSheet = ({ setVisible }: { setVisible: Function }) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { t } = useTranslation()
  const { setCards, setPasswords, setSettings, setUserSettings, setUser, renderPasslogDataHandler } = usePasslogUserData()
  const [loading, setLoading] = useState(false)

  const wipeData = async() => {
    setLoading(true)
    try {
      const user = returnCurrentUser()
      await wipeAllStorageData()
      if (user) {
        await signOutHandler() 
      }
      setUserSettings!(null)
      setSettings!({})
      setCards!([])
      setPasswords!([])
      setUser!(null)
      setVisible(false)
      setLoading(false)
      renderPasslogDataHandler!()
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <View style={styles.contentContainer}>
      <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 25, }]}>
        {t('wipe_data_title')}
      </Text>
      <View style={styles.appSettingsContainer}>
        <Text style={[styles.text, { textAlign: 'center' }]}>
          {t('wipe_data_message')}
        </Text>
      </View>
      <View>
        <Button
          loading={loading}
          onPress={wipeData}
          containerStyle={{ width: '100%' }}
          titleStyle={styles.text}
          buttonStyle={{ backgroundColor: '#ff2e2e' }}
          title={t('delete_data_button')}
        />
      </View>
    </View>
  )
}

export const CloudSettingsSheet = ({ userSettings, setUserSettings }: { userSettings: UserSettingsProps, setUserSettings: Function }) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { t } = useTranslation()
  const { renderPasslogDataHandler } = usePasslogUserData()
  const [enabledSync, setEnabledSync] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setEnabledSync(userSettings.alwaysSync)
  }, [userSettings])

  const enableAlwaysSyncState = async(state: boolean) => {
    const newUserSettings: UserSettingsProps = {
      name: userSettings.name,
      uid: userSettings.uid,
      alwaysSync: state
    }

    await setUserSettingsInStorage(newUserSettings)
    renderPasslogDataHandler!()
    setUserSettings(newUserSettings)
    setEnabledSync(state)
  }

  const backupData = async() => {
    setLoading(true)
    try {
      const passwords = await getPasswordsFromStorage()
      const cards = await getCardsFromStorage()
      const notes = await getNotesFromStorage()
      await fullBackupInFirestore(passwords, cards, notes)
      setLoading(false) 
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <View style={styles.contentContainer}>
      <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 25, }]}>
        {t('cloud_settings')}
      </Text>
      <View style={styles.appSettingsContainer}>
        <Text style={styles.text}>
          {t('enable_always_backup')}
        </Text>
        <Switch
          value={userSettings.alwaysSync}
          onChange={() => enableAlwaysSyncState(!enabledSync)}
          color={theme.colors.primary}
        />
      </View>
      <View>
        <Button
          loading={loading}
          onPress={backupData}
          containerStyle={{ width: '100%' }}
          titleStyle={styles.text}
          title={t('backup_now_button')}
        />
      </View>
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  contentContainer: {
    height: WINDOW_HEIGHT * BOTTOM_SHEET_HEIGHT,
    flex: 1,
    padding: 12,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text
  },
  appSettingsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'space-between'
  }
})

export default SettingsSheets