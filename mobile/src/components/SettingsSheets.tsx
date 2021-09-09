import React, { ReactElement, useCallback, useMemo, useState } from 'react'
import { Theme, useTheme } from '@react-navigation/native'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Button, Switch } from 'react-native-elements'
import BottomSheet from './BottomSheet'

interface SettingSheetsProps {
  visible: boolean
  setVisible: Function
  children: ReactElement
}

const windowHeight = Dimensions.get('window').height
const bottomSheetHeight = 0.25

export const SettingsSheets = ({ visible, setVisible, children }: SettingSheetsProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)

  return (
    <BottomSheet
      visible={visible}
      setVisible={setVisible}
      bottomSheetHeight={bottomSheetHeight}
    >
      {children}
    </BottomSheet>
  )
}



export const AppSettingsSheet = ({ goToScreen }: any) => {
  const theme = useTheme()
  const styles = styleSheet(theme)

  return (
    <View style={styles.contentContainer}>
      <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 25, }]}>
        App Settings
      </Text>
      <View style={styles.appSettingsContainer}>
        <Button
          containerStyle={{ width: '47%' }}
          titleStyle={styles.text}
          title="On Start Security"
          onPress={() => goToScreen('onStartSecurity')}
        />
        <Button
          containerStyle={{ width: '47%' }}
          titleStyle={styles.text}
          buttonStyle={{ backgroundColor: '#ff2e2e' }}
          title="Wipe data"
        />
      </View>
    </View>
  )
}

export const CloudSettingsSheet = () => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const [enabledSync, setEnabledSync] = useState(false)


  return (
    <View style={styles.contentContainer}>
      <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 25, }]}>
        Cloud Settings
      </Text>
      <View style={styles.appSettingsContainer}>
        <Text style={styles.text}>
          Enable Back Up
        </Text>
        <Switch
          value={enabledSync}
          onChange={() => setEnabledSync(!enabledSync)}
          color={theme.colors.primary}
        />
      </View>
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  contentContainer: {
    height: windowHeight * bottomSheetHeight,
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