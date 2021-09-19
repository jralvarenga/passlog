import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import BottomSheet from './BottomSheet'

interface UnsavedInNoteProps {
  visible: boolean
  setVisible: Function
  unsaveAndGoback: Function
  saveChanges: Function
}

const WINDOW_HEIGHT = Dimensions.get('window').height
const BOTTOM_SHEET_HEIGHT = 0.25

const UnsavedInNote = ({ setVisible, visible, unsaveAndGoback, saveChanges }: UnsavedInNoteProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
 
  return (
    <BottomSheet
      visible={visible}
      setVisible={setVisible}
      bottomSheetHeight={BOTTOM_SHEET_HEIGHT}
    >
      <View style={styles.container}>
        <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 25, }]}>
          Unsaved changes
        </Text>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            You have unsaved changes in your note
          </Text>
        </View>
        <View style={styles.appSettingsContainer}>
          <Button
            containerStyle={{ width: '47%' }}
            titleStyle={styles.text}
            title="Close unsaved"
            buttonStyle={{ backgroundColor: '#ff2e2e' }}
            /* @ts-ignore */
            onPress={unsaveAndGoback}
          />
          <Button
            containerStyle={{ width: '47%' }}
            titleStyle={styles.text}
            /* @ts-ignore */
            onPress={saveChanges}
            title="Save and go"
          />
        </View>
      </View>
    </BottomSheet>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    height: WINDOW_HEIGHT * BOTTOM_SHEET_HEIGHT,
    flex: 1,
    padding: 15,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'space-between'
  },
  appSettingsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'space-between'
  }
})

export default UnsavedInNote