import { Theme, useTheme } from '@react-navigation/native'
import React, { createRef, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Snackbar from 'react-native-snackbar'
import NoteOptionsSheet from '../components/NoteOptionsSheet'
import UnsavedInNote from '../components/UnsavedInNotesSheet'
import { NoteProps } from '../interface/interfaces'
import { setNotesInStorage } from '../lib/asyncStorage'
import { encryptNote } from '../lib/encripter'
import { deletePasslogDocument, updatePasslogDocument } from '../lib/firestore'
import { usePasslogUserData } from '../services/PasslogUserDataProvider'

interface NoteEditorScreenProps {
  route: any
  navigation: any
}

const WINDOW_HEIGHT = Dimensions.get('window').height

const NoteEditorScreen = ({ route, navigation }: NoteEditorScreenProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { t } = useTranslation()
  const { notes, setNotes, userSettings, renderPasslogDataHandler } = usePasslogUserData()
  const [noteInfo, setNoteInfo] = useState<NoteProps>()
  const [noteBody, setNoteBody] = useState("")
  const [noteTitle, setNoteTitle] = useState("")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const [showUnsaveSheet, setShowUnsavedSheet] = useState(false)
  const noteTitleRef = useRef<TextInput>(null)
  const noteBodyRef = useRef<TextInput>(null)

  useEffect(() => {
    const note: NoteProps = route.params.note
    
    setNoteInfo(note)
    setNoteBody(note.body)
    setNoteTitle(note.title)
  }, [])

  const changeNoteInfo = (value: string, type: 'title' | 'body') => {
    setHasUnsavedChanges(true)
    if (type == 'body') {
      setNoteBody(value)
    } else {
      setNoteTitle(value)
    }
  }

  const saveChanges = async() => {
    noteBodyRef.current?.blur()
    noteTitleRef.current?.blur()
    const newNoteData: NoteProps = {
      id: noteInfo!.id,
      body: noteBody,
      title: noteTitle,
      date: noteInfo!.date
    }
    const newNotes = notes!.map((note) => {
      if (note.id == newNoteData!.id) {
        return newNoteData
      } else {
        return note
      }
    })
    setNotes!(newNotes)
    await setNotesInStorage(newNotes!)
    if (userSettings?.alwaysSync) {
      const encrypted = encryptNote(newNoteData!)
      await updatePasslogDocument(encrypted, 'notes')
    }
    setHasUnsavedChanges(false)
    setShowUnsavedSheet(false)
    renderPasslogDataHandler!()
    Snackbar.show({
      text: t('saved_changes'),
      fontFamily: 'poppins',
      textColor: theme.colors.text,
      backgroundColor: theme.colors.primary
    })
  }

  const unsaveAndGoback = () => {
    setHasUnsavedChanges(false)
    setShowBottomSheet(false)
    navigation.goBack()
  }

  const saveAndGo = async() => {
    setShowUnsavedSheet(false)
    await saveChanges()
    navigation.goBack()
  }

  useEffect(() => navigation.addListener('beforeRemove', (e: any) => {
    if (!hasUnsavedChanges) {
      return
    }
    
    e.preventDefault()
    setShowUnsavedSheet(true)
  }), [navigation, hasUnsavedChanges])


  const deleteNote = async() => {
    setHasUnsavedChanges(false)
    const id = noteInfo!.id
    const index = notes!.map((note) => note.id).indexOf(id)
    notes!.splice(index, 1)
    setNotes!(notes)

    await setNotesInStorage(notes!)
    setShowBottomSheet(false)
    if (userSettings?.alwaysSync) {
      const encrypted = encryptNote(noteInfo!)
      deletePasslogDocument(encrypted.id, 'notes')
    }
    renderPasslogDataHandler!()
    navigation.goBack()
  }

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
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={styles.pageName}>
            <TextInput
              style={[styles.text, { fontSize: 28, fontFamily: 'poppins-bold' }]}
              value={noteTitle}
              textAlignVertical="center"
              selectionColor={theme.colors.primary}
              ref={noteTitleRef}
              onBlur={saveChanges}
              onChangeText={(value) => changeNoteInfo(value, 'title')}
            />
          </View>
        </View>
        <View style={styles.headerOptions}>
          <View style={styles.goBackContainer}></View>
          <View style={[styles.pageName, { alignItems: 'center', justifyContent: 'center' }]}>
            <Icon
              name="menu"
              onPress={() => setShowBottomSheet(true)}
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
          ref={noteBodyRef}
          onBlur={saveChanges}
          onChangeText={(value) => changeNoteInfo(value, 'body')}
        />
      </View>
      <NoteOptionsSheet
        name={noteInfo?.title ? noteInfo?.title : ""}
        visible={showBottomSheet}
        setVisible={setShowBottomSheet}
        date={noteInfo?.date ? noteInfo?.date : ""}
        deleteNote={deleteNote}
      />
      <UnsavedInNote
        visible={showUnsaveSheet}
        setVisible={setShowUnsavedSheet}
        unsaveAndGoback={unsaveAndGoback}
        saveChanges={saveAndGo}
      />
    </SafeAreaView>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: WINDOW_HEIGHT * 0.17,
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
    flex: 5,
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
  },
  editContainer: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 25
  }
})

export default NoteEditorScreen