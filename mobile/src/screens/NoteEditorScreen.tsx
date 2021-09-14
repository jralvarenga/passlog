import { Theme, useTheme } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { BackHandler, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import Snackbar from 'react-native-snackbar'
import NoteOptionsSheet from '../components/NoteOptionsSheet'
import { NoteProps } from '../interface/interfaces'
import { setNotesInStorage } from '../lib/asyncStorage'
import { encryptNote } from '../lib/encripter'
import { createNewPasslogDocument, deletePasslogDocument, updatePasslogDocument } from '../lib/firestore'
import { usePasslogUserData } from '../services/PasslogUserDataProvider'

interface NoteEditorScreenProps {
  route: any
  navigation: any
}

const windowHeight = Dimensions.get('window').height

const NoteEditorScreen = ({ route, navigation }: NoteEditorScreenProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { notes, setNotes, userSettings, renderPasslogDataHandler } = usePasslogUserData()
  const [noteInfo, setNoteInfo] = useState<NoteProps>()
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const noteTitleRef = useRef<TextInput>()
  const noteBodyRef = useRef<TextInput>()

  useEffect(() => {
    const note: NoteProps = route.params.note
    
    setNoteInfo(note)
  }, [])

  const changeNoteInfo = (value: string, type: 'title' | 'body') => {
    setHasUnsavedChanges(true)
    if (type == 'body') {
      const newNoteData: NoteProps = {
        id: noteInfo!.id,
        title: noteInfo!.title,
        body: value,
        date: noteInfo!.date
      }
      setNoteInfo(newNoteData)
    } else {
      const newNoteData: NoteProps = {
        id: noteInfo!.id,
        title: value,
        body: noteInfo!.body,
        date: noteInfo!.date
      }
      setNoteInfo(newNoteData)
    }
  }

  const saveChanges = () => {
    const newNotes = notes!.map((note) => {
      if (note.id == noteInfo!.id) {
        return noteInfo!
      } else {
        return note
      }
    })
    setNotes!(newNotes)
    setNotesInStorage(newNotes!)
    if (userSettings?.alwaysSync) {
      const encrypted = encryptNote(noteInfo!)
      updatePasslogDocument(encrypted, 'notes')
    }
    renderPasslogDataHandler!()
  }

  useEffect(() => navigation.addListener('beforeRemove', (e: any) => {
    if (!hasUnsavedChanges) {
      return
    }
    
    saveChanges()
    return
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
              style={styles.titleInputStyle}
              value={noteInfo?.title}
              textAlignVertical="center"
              selectionColor={theme.colors.primary}
              /* @ts-ignore */
              ref={noteTitleRef}
              onBlur={() => {
                noteTitleRef.current?.blur()
                setHasUnsavedChanges(true)
              }}
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
          value={noteInfo?.body}
          multiline={true}
          textAlignVertical="top"
          selectionColor={theme.colors.primary}
          /* @ts-ignore */
          ref={noteBodyRef}
          onBlur={() => {
            noteTitleRef.current?.blur()
            setHasUnsavedChanges(true)
          }}
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