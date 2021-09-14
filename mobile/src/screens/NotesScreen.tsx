import React, { useState } from 'react'
import { Theme, useTheme } from '@react-navigation/native'
import { Dimensions, FlatList, StyleSheet, View } from 'react-native'
import TopBar from '../components/TopBar'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { usePasslogUserData } from '../services/PasslogUserDataProvider'
import HiddenFlatListView from '../components/HiddenFlatListView'
import CardContainer from '../components/CardContainer'
import EmptyDataView from '../components/EmptyDataView'
import NoteContainer from '../components/NoteContainer'
import { NoteProps } from '../interface/interfaces'
import { createId } from '../lib/createId'
import { setNotesInStorage } from '../lib/asyncStorage'

interface PasswordContainerProps {
  navigation: any
}

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const NotesScreen = ({ navigation }: PasswordContainerProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { notes, setNotes } = usePasslogUserData()
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
      title: "New note",
      body: "",
      date: `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`
    }
    notes?.push(newNote)
    setNotes!(notes)
    await setNotesInStorage(notes!)
    goToScreen('noteEditor', { note: newNote })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusAwareStatusBar backgroundColor={theme.colors.primary} />
      <TopBar
        showIcon
        iconFunction={createNewNote}
        icon={{ name: 'add', type: 'material' }}
        title="Notes"
      />
      {notes?.length != 0 ? (
        <FlatList
          style={styles.scrollView}
          contentContainerStyle={{ minHeight: windowHeight }}
          contentOffset={{ y: 60, x: windowWidth }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <HiddenFlatListView
              inputValue={searchInput}
              inputPlaceHolder="Search card..."
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
          renderItem={({ item }: { item: NoteProps }) => (
            <NoteContainer
              note={item}
              goToScreen={goToScreen}
            />
          )}
        />
      ) : (
        <EmptyDataView
          item="Notes"
          buttonFunction={createNewNote}
        />
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