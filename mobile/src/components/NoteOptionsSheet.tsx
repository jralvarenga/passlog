import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import BottomSheet from './BottomSheet'

interface NoteOptionsSheetProps {
  deleteNote: Function
  visible: boolean,
  setVisible: Function
  date: string
  name: string
}

const windowHeight = Dimensions.get('window').height
const bottomSheetHeight = 0.25

const NoteOptionsSheet = ({ deleteNote, date, setVisible, visible, name }: NoteOptionsSheetProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
 
  return (
    <BottomSheet
      visible={visible}
      setVisible={setVisible}
      bottomSheetHeight={bottomSheetHeight}
    >
      <View style={styles.container}>
        <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 25, }]}>
          {name} Settings
        </Text>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Created in {date}
          </Text>
        </View>
        <View>
          <Button
            /* @ts-ignore */
            onPress={deleteNote}
            containerStyle={{ width: '100%' }}
            titleStyle={styles.text}
            buttonStyle={{ backgroundColor: '#ff2e2e' }}
            title="Delete note"
          />
        </View>
      </View>
    </BottomSheet>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    height: windowHeight * bottomSheetHeight,
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
  }
})

export default NoteOptionsSheet