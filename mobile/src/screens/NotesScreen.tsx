import React, { useState } from 'react'
import { Theme, useTheme } from '@react-navigation/native'
import { Dimensions, FlatList, StyleSheet } from 'react-native'
import TopBar from '../components/TopBar'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { usePasslogUserData } from '../services/PasslogUserDataProvider'
import HiddenFlatListView from '../components/HiddenFlatListView'
import EmptyDataView from '../components/EmptyDataView'
import NoteContainer from '../components/NoteContainer'
import { NoteProps } from '../interface/interfaces'
import { createId } from '../lib/createId'
import { setNotesInStorage } from '../lib/asyncStorage'
import { createNewPasslogDocument } from '../lib/firestore'
import { encryptNote } from '../lib/encripter'
import LottieView from 'lottie-react-native'
import { useTranslation } from 'react-i18next'
import EnterAnimationView from '../components/EnterAnimationView'

interface NotesContainerProps {
  navigation: any
}

const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height
const ENTER_ANIMATION_DURATION = 300
const ENTER_ANIMATION_DELAY = 150

const NotesScreen = ({ navigation }: NotesContainerProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { t } = useTranslation()
  const { notes, setNotes, userSettings, renderPasslogDataHandler } = usePasslogUserData()
  const [searchInput, setSearchInput] = useState("")

  const goToScreen = (screen: string, params: any) => {
    navigation.navigate(screen, params)
  }

  const sortedNotes = notes?.sort((a: NoteProps, b: NoteProps) => {
    if (a.title! > b.title!) {
      return 1
    }
    if (a.title! < b.title!) {
      return -1
    }
    return 0
  })

  const filteredNotes = sortedNotes?.filter((notes: NoteProps) =>
    notes.title?.toLowerCase().includes(searchInput.toLowerCase()) ||
    notes.body?.toLowerCase().includes(searchInput.toLowerCase())
  )

  const createNewNote = async() => {
    const currentDate = new Date()
    currentDate.setMinutes(currentDate.getMinutes() + currentDate.getTimezoneOffset())
    const newNote: NoteProps = {
      id: createId(),
      title: t('new_note_title'),
      body: "",
      date: `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`
    }
    notes?.push(newNote)
    setNotes!(notes)
    await setNotesInStorage(notes!)
    if (userSettings?.alwaysSync) {
      const encrypted = encryptNote(newNote)
      await createNewPasslogDocument(encrypted, 'notes')
    }
    renderPasslogDataHandler!()
    goToScreen('noteEditor', { note: newNote })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusAwareStatusBar backgroundColor={theme.colors.primary} />
      <TopBar
        showIcon
        iconFunction={createNewNote}
        icon={{ name: 'add', type: 'material' }}
        title={t('notes_title')}
      />
      {notes?.length != 0 ? (
        <FlatList
          style={styles.scrollView}
          contentContainerStyle={{ minHeight: WINDOW_HEIGHT }}
          contentOffset={{ y: 60, x: WINDOW_WIDTH }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <HiddenFlatListView
              inputValue={searchInput}
              inputPlaceHolder={t('search_note')}
              changeInputValue={(value: string) => setSearchInput(value)}
              cancelInput={() => setSearchInput("")}
              buttonText="New"
              buttonFunction={() => console.log('xd')}
            />
          }
          ListHeaderComponentStyle={{
            paddingBottom: 15
          }}
          data={filteredNotes}
          keyExtractor={(item: NoteProps) => item.id}
          renderItem={({ item, index }: { item: NoteProps, index: number }) => (
            <EnterAnimationView
              fade
              delay={ENTER_ANIMATION_DELAY + ENTER_ANIMATION_DELAY*index}
              duration={ENTER_ANIMATION_DURATION}
            >
              <NoteContainer
                note={item}
                goToScreen={goToScreen}
              />
            </EnterAnimationView>
          )}
        />
      ) : (
        <EmptyDataView
          text={t('start_adding_notes')}
          buttonFunction={createNewNote}
        >
          <LottieView
            source={require('../../assets/animations/notes.json')}
            autoPlay
            loop
            style={{ width: 250, height: 250 }}
          />
        </EmptyDataView>
      )}
    </SafeAreaView>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  scrollView: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 15
  },
  searchInputContainer: {
    width: '70%',
    backgroundColor: theme.colors.background,
    padding: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
  hiddenViewContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})

export default NotesScreen