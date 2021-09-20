import React, { useEffect, useState } from 'react'
import PasswordsScreen from './PasswordsScreen'
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CardsScreen from './CardsScreen'
import SettingsScreen from './SettingsScreen'
import { Theme, useTheme } from '@react-navigation/native'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { TabBar } from '../components/bottomTabBar/TabBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import NotesScreen from './NotesScreen'
import { usePasslogUserData } from '../services/PasslogUserDataProvider'
import BottomSheet from '../components/BottomSheet'
import { Switch } from 'react-native-elements'
import { SettingsProps, UserSettingsProps } from '../interface/interfaces'
import { setSettingsInStorage, setUserSettings as setUserSettingsInStorage } from '../lib/asyncStorage'
import { useTranslation } from 'react-i18next'

const Tab = createBottomTabNavigator()
const WINDOW_HEIGHT = Dimensions.get('window').height
const BOTTOM_SHEET_HEIGHT = 0.25

const HomeScreen = ({ navigation }: any) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { t } = useTranslation()
  const { settings, setSettings, userSettings, setUserSettings, renderPasslogDataHandler } = usePasslogUserData()
  const [alwaysSync, setAlwaysSync] = useState(false)
  const [showEnableAlwaysSync, setShowEnableAlwaysSync] = useState(false)

  useEffect(() =>  {
    if (settings?.firstTime) {
      navigation.navigate('firstTime')
      console.log('is first time')
    }
    if (settings?.askForAlwaysSync) {
      setShowEnableAlwaysSync(true)
    }
  }, [settings])

  const enableAlwaysSync = async() => {
    setAlwaysSync(true)
    const newSettings: SettingsProps = {
      ...settings,
      askForAlwaysSync: false
    }
    const newUserSettings: UserSettingsProps = {
      ...userSettings!,
      alwaysSync: true
    }
    setSettings!(newSettings)
    setUserSettings!(newUserSettings)
    await setSettingsInStorage(newSettings)
    await setUserSettingsInStorage(newUserSettings)
    renderPasslogDataHandler!()
    setShowEnableAlwaysSync(false)
  }

  const removeAlwaysSync = async(prop: boolean) => {
    const newSettings: SettingsProps = {
      ...settings,
      askForAlwaysSync: false
    }
    setSettings!(newSettings)
    await setSettingsInStorage(newSettings)
    renderPasslogDataHandler!()
    setShowEnableAlwaysSync(false)
  }

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false
        }}
        tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
      >
        <Tab.Screen name="key" component={PasswordsScreen} />
        <Tab.Screen name="book" component={NotesScreen} />
        <Tab.Screen name="credit-card" component={CardsScreen} />
        <Tab.Screen name="settings" component={SettingsScreen} />
      </Tab.Navigator>
      {useSafeAreaInsets().bottom > 0 && (
        <View
          style={{
            height: useSafeAreaInsets().bottom - 5,
            backgroundColor: "white",
          }}
        />
      )}
      <BottomSheet
        visible={showEnableAlwaysSync}
        setVisible={removeAlwaysSync}
        bottomSheetHeight={BOTTOM_SHEET_HEIGHT}
      >
        <View style={styles.contentContainer}>
          <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 25, }]}>
            {t('always_sync_data')}
          </Text>
          <View style={styles.appSettingsContainer}>
            <Text style={styles.text}>
              {t('enable_sync_data')}
            </Text>
            <Switch
              value={alwaysSync}
              onChange={enableAlwaysSync}
              color={theme.colors.primary}
            />
          </View>
          <View>
            <Text style={[styles.text, { textAlign: 'center' }]}>
              {t('have_data_stored_safely')}
            </Text>
          </View>
        </View>
      </BottomSheet>
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

export default HomeScreen