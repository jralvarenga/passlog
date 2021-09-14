import { Theme, useTheme } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { BackHandler, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import Snackbar from 'react-native-snackbar'
import { NoteProps } from '../interface/interfaces'
import { setNotesInStorage } from '../lib/asyncStorage'
import { usePasslogUserData } from '../services/PasslogUserDataProvider'

interface NoteEditorScreenProps {
  route: any
  navigation: any
}

const windowHeight = Dimensions.get('window').height

const NoteEditorScreen = ({ route, navigation }: NoteEditorScreenProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { notes, setNotes, renderPasslogDataHandler } = usePasslogUserData()
  const [noteInfo, setNoteInfo] = useState<NoteProps>()
  const [noteTitle, setNoteTitle] = useState("")
  const [noteBody, setNoteBody] = useState("")

  useEffect(() => {
    const note: NoteProps = route.params.note
    
    setNoteInfo(note)
    setNoteTitle(note.title ? note.title : "")
    setNoteBody(note.body ? note.body : "")
  }, [])

  const saveChanges = async() => {
    const newNoteData: NoteProps = {
      id: noteInfo!.id,
      title: noteTitle,
      body: noteBody,
      date: noteInfo!.date
    }
    const newNotes = notes!.map((note) => {
      if (note.id == newNoteData.id) {
        return newNoteData
      } else {
        return note
      }
    })
    setNotes!(newNotes)
    await setNotesInStorage(newNotes!)
  }

  const goBackHandler = async() => {
    await saveChanges()

    navigation.goBack()
  }

  useEffect(() => {
    Snackbar.show({
      text: 'Use the back arrow on the top to save and exit',
      fontFamily: 'poppins',
      textColor: theme.colors.text,
      backgroundColor: theme.colors.primary
    })
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
        <View style={styles.headerInfo}>
          <View style={styles.goBackContainer}>
            <Icon
              name="keyboard-arrow-left"
              type="material"
              color={theme.colors.text}
              size={40}
              onPress={goBackHandler}
            />
          </View>
          <View style={styles.pageName}>
            <TextInput
              style={styles.titleInputStyle}
              value={noteTitle}
              textAlignVertical="center"
              selectionColor={theme.colors.primary}
              onChangeText={(value) => setNoteTitle(value)}
            />
          </View>
        </View>
        <View style={styles.headerOptions}>
          <View style={styles.goBackContainer}></View>
          <View style={[styles.pageName, { alignItems: 'center', justifyContent: 'center' }]}>
            <Icon
              name="menu"
              type="feather"
              color={theme.colors.text}
              size={30}
            />
          </View>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <TextInput
          style={styles.noteBodyInput}
          value={noteBody}
          multiline={true}
          textAlignVertical="top"
          selectionColor={theme.colors.primary}
          onChangeText={(value) => setNoteBody(value)}
        />
      </View>
    </SafeAreaView>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: windowHeight * 0.15,
    display: 'flex',
    flexDirection: 'row',
    padding: 10
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text
  },
  titleInputStyle: {
    fontFamily: 'poppins-bold',
    fontSize: 28,
    color: theme.colors.text,
    width: '100%',
    height: '100%'
  },
  headerInfo: {
    width: '75%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  headerOptions: {
    width: '25%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  goBackContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '40%'
  },
  pageName: {
    width: '100%',
    display: 'flex',
    paddingLeft: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    height: '60%'
  },
  bodyContainer: {
    flex: 1,
    padding: 20
  },
  noteBodyInput: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: theme.colors.card,
    borderRadius: 20,
    padding: 15,
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text
  }
})

export default NoteEditorScreen