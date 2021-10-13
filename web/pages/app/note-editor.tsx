import { Theme, useTheme, IconButton  } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { useEffect, useRef, useState } from 'react'
import { NoteProps } from '../../src/interfaces/interfaces'
import { usePasslogUserData } from '../../src/services/PasslogUserdataProvider'
import { useRouter } from 'next/router'
import { setNotesInLocalStorage } from '../../src/lib/localStorage'
import { ArrowBackIosNew as ArrowBackIosNewIcon, Menu as MenuIcon } from '@mui/icons-material'
import Header from '../../src/components/Header'
import NoteOptions from '../../src/components/NoteOptions'
import AppSnackbar from '../../src/components/AppSnackbar'

export const HEADERBAR_HEIGHT = '16%'

const NoteEditorPage = () => {
  const styles = styleSheet()
  const theme = useTheme()
  const { notes, setNotes, renderPasslogDataHandler, selectedPasslogItem, setSelectedPasslogItem } = usePasslogUserData()
  const router = useRouter()
  const [note, setNote] = useState<NoteProps>()
  const [noteTitle, setNoteTitle] = useState("")
  const [noteBody, setNoteBody] = useState("")
  const [openOptions, setOpenOptions] = useState(false)
  const [snackbarText, setSnackbarText] = useState("")
  const [showSnackbar, setShowSnackbar] = useState(false)
  const titleRef = useRef(null)
  const bodyRef = useRef(null)

  useEffect(() => {
    // @ts-ignore
    setNote(selectedPasslogItem)
    // @ts-ignore
    setNoteTitle(selectedPasslogItem?.title ? selectedPasslogItem!.title : "")
    // @ts-ignore
    setNoteBody(selectedPasslogItem?.body! ? selectedPasslogItem!.body! : "")
  }, [selectedPasslogItem])

  const goBack = () => {
    saveChanges()
    router.back()
  }

  const saveChanges = async() => {
    try {
      const newData: NoteProps = {
        ...note!,
        title: noteTitle,
        body: noteBody
      }
      const newNotes = notes!.map((note) => {
        if (note.id == newData.id) {
          return newData
        } else {
          return note
        }
      })
      setNotes!(newNotes)
      setNotesInLocalStorage(newNotes)
      renderPasslogDataHandler!()
      setSnackbarText("Saved changes")
      setShowSnackbar(true)
    } catch (error) {
      setSnackbarText("There has been an error")
      setShowSnackbar(true)
    }
  }

  const deleteNote = async() => {
    try {
      setOpenOptions(false)
      const id = note!.id
      const index = notes!.map((note) => note.id).indexOf(id)
      notes!.splice(index, 1)
      setNotes!(notes)

      setNotesInLocalStorage(notes!)
      renderPasslogDataHandler!()
      setSelectedPasslogItem!(null)
      router.back()
    } catch (error) {
      setSnackbarText("There has been an error")
      setShowSnackbar(true)
    }
  }

  return (
    <div className={styles.container}>
      <Header
        name="Note Editor"
      />
      <div className={styles.headerContainer}>
        <div className={styles.headerInfoContainer}>
          <div className={styles.returnContainer}>
            <IconButton
              onClick={goBack}
              style={{ marginTop: 10 }}
            >
              <ArrowBackIosNewIcon
                style={{ color: theme.palette.text.primary, fontSize: 25 }}
              />
            </IconButton>
          </div>
          <div className={styles.titleContainer}>
            <input
              type="text"
              value={noteTitle}
              ref={titleRef}
              onBlur={saveChanges}
              onChange={(e) => setNoteTitle(e.target.value)}
              className={styles.inputTitle}
            />
          </div>
        </div>
        <div className={styles.iconContainer}>
          <IconButton
            onClick={() => setOpenOptions(true)}
            style={{ marginTop: 10 }}
          >
            <MenuIcon
              style={{ color: theme.palette.text.primary, fontSize: 25 }}
            />
          </IconButton>
        </div>
      </div>
      <div className={styles.body}>
        <textarea
          className={styles.bodyInput}
          value={noteBody}
          ref={bodyRef}
          onBlur={saveChanges}
          onChange={(e) => setNoteBody(e.target.value)}
        />
      </div>
      <AppSnackbar
        open={showSnackbar}
        setOpen={setShowSnackbar}
        message={snackbarText}
      />
      <NoteOptions
        deleteNote={deleteNote}
        note={note!}
        open={openOptions}
        setOpen={setOpenOptions}
      />
    </div>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
    maxWidth: 800,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
    },
  },
  body: {
    width: '100%',
    height: `calc(100% - ${HEADERBAR_HEIGHT})`,
    maxWidth: 800,
    display: 'flex',
    flexDirection: 'column',
    padding: 15
  },
  headerContainer: {
    width: '100%',
    height: HEADERBAR_HEIGHT,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
    },
  },
  headerInfoContainer: {
    width: '80%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  iconContainer: {
    width: '20%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  returnContainer: {
    width: '100%',
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 20
  },
  titleContainer: {
    width: '100%',
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 20,
    fontSize: 28,
    fontWeight: 'bold'
  },
  inputTitle: {
    backgroundColor: theme.palette.background.default,
    border: '0px',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    width: '100%',
    height: '100%',
    fontSize: 28,
    color: theme.palette.text.primary
  },
  bodyInput: {
    backgroundColor: theme.palette.background.default,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: 10,
    borderRadius: theme.shape.borderRadius,
    fontFamily: 'Poppins',
    width: '100%',
    height: '100%',
    fontSize: 16,
    color: theme.palette.text.primary,
    resize: 'none'
  }
}))

export default NoteEditorPage