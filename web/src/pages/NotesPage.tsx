import { Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { useState } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import GeneratePasswordSheet from '../components/GeneratePasswordSheet'
import NoteContainer from '../components/NoteContainer'
import SearchBar from '../components/SearchBar'
import TopBar, { TOPBAR_HEIGHT, TOPBAR_HEIGHT_MOBILE } from '../components/TopBar'
import { usePasslogUserData } from '../services/PasslogUserdataProvider'
import notesAnimation from '../assets/animations/notes.json'
import EmptyDataDiv from '../components/EmptyDataDiv'
import { useRouter } from 'next/router'
import { createId } from '../lib/createId'
import { NoteProps } from '../interfaces/interfaces'
import { setNotesInLocalStorage } from '../lib/localStorage'
import AppSnackbar from '../components/AppSnackbar'

const NotesPage = () => {
  const styles = styleSheet()
  const { notes, setNotes, renderPasslogDataHandler, setSelectedPasslogItem } = usePasslogUserData()
  const router = useRouter()
  const [searchInput, setSearchInput] = useState("")
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarText, setSnackbarText] = useState("")

  const createNote = async() => {
    try {
      const currentDate = new Date()
        currentDate.setMinutes(currentDate.getMinutes() + currentDate.getTimezoneOffset())
        const newNote: NoteProps = {
          id: createId(),
          title: "New Note",
          body: "",
          date: `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`
        }
        notes?.push(newNote)
        setNotes!(notes!)

        setNotesInLocalStorage(notes!)
        renderPasslogDataHandler!()
        setSelectedPasslogItem!(newNote)
        router.push('/app/note-editor')
    } catch (error) {
      setSnackbarText("There's been an error, try later")
      setShowSnackbar(true)
    }
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

  return (
    <div className={styles.container}>
      <TopBar title="Notes" />
      <div className={styles.body}>
        <div className={styles.searchBarContainer}>
          <SearchBar
            type="note"
            value={searchInput}            
            setValue={setSearchInput}
          />
        </div>
        {notes?.length != 0 ? (
          <div className={styles.notesContainer}>
            {filteredNotes?.map((note, i) => (
              <NoteContainer
                key={i}
                note={note}
              />
            ))}
          </div>
        ) : (
          <EmptyDataDiv
            text="Start writing your secret notes and keep them safe here"
            buttonFunction={createNote}
          >
            <Player
              autoplay
              src={notesAnimation}
              className={styles.animationContainer}
            />
          </EmptyDataDiv>
        )}
      </div>
      <AppSnackbar
        open={showSnackbar}
        setOpen={setShowSnackbar}
        message={snackbarText}
      />
    </div>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  body: {
    width: '100%',
    height: `calc(100% - ${TOPBAR_HEIGHT})`,
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 20, 
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: 10, 
      height: `calc(100% - ${TOPBAR_HEIGHT_MOBILE})`,
    },
  },
  searchBarContainer: {
    width: '100%',
    maxWidth: 300,
    height: '10%',
    marginTop: 5,
    marginBottom: 15,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  notesContainer: {
    width: '100%',
    height: '90%',
    overflowY: 'scroll',
    overflowX: 'hidden',
    display: 'flex',
    marginLeft: -10,
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'wrap',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      marginLeft: 0,
    },
  },
  animationContainer: {
    width: 250,
    height: 250,
  }
}))

export default NotesPage