import React, { useCallback, useMemo, useState } from 'react'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { Theme, useTheme } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Switch } from 'react-native-elements'

interface SettingSheetsProps {
  bottomSheetRef: any,
  handleSheetChanges: any
  goToScreen: Function
}

export const AppSettingsSheet = ({ bottomSheetRef, handleSheetChanges, goToScreen }: SettingSheetsProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const snapPoints = useMemo(() => ['5%', '25%', '25%'], [])
  const [backdropPressBehavior, setBackdropPressBehavior] = useState<'none' | 'close' | 'collapse'>('collapse')

  const renderBackdrop = useCallback((props) => (
    <BottomSheetBackdrop {...props} pressBehavior={backdropPressBehavior} />
  ), [backdropPressBehavior])

  return (
    <BottomSheet
      /* @ts-ignore */
      ref={bottomSheetRef}
      index={-1}
      enablePanDownToClose
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backgroundStyle={{ backgroundColor: theme.colors.background }}
      handleIndicatorStyle={{ backgroundColor: theme.colors.text }}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.contentContainer}>
        <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 25, }]}>
          App Settings
        </Text>
        <View style={styles.appSettingsContainer}>
          <Button
            containerStyle={{ width: '47%' }}
            titleStyle={styles.text}
            title="On Start Security"
          />
          <Button
            containerStyle={{ width: '47%' }}
            titleStyle={styles.text}
            buttonStyle={{ backgroundColor: '#ff2e2e' }}
            title="Wipe data"
          />
        </View>
      </View>
    </BottomSheet>
  )
}

export const CloudSettingsSheet = ({ bottomSheetRef, handleSheetChanges, goToScreen }: SettingSheetsProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const snapPoints = useMemo(() => ['5%', '25%', '25%'], [])
  const [backdropPressBehavior, setBackdropPressBehavior] = useState<'none' | 'close' | 'collapse'>('collapse')
  const [enabledSync, setEnabledSync] = useState(false)

  const renderBackdrop = useCallback((props) => (
    <BottomSheetBackdrop {...props} pressBehavior={backdropPressBehavior} />
  ), [backdropPressBehavior])

  return (
    <BottomSheet
      /* @ts-ignore */
      ref={bottomSheetRef}
      index={-1}
      enablePanDownToClose
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backgroundStyle={{ backgroundColor: theme.colors.background }}
      handleIndicatorStyle={{ backgroundColor: theme.colors.text }}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.contentContainer}>
        <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 25, }]}>
          App Settings
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
    </BottomSheet>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 12,
    backgroundColor: theme.colors.background
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