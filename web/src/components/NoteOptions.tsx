import { Theme, useTheme, IconButton, Button  } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { NoteProps } from '../interfaces/interfaces'
import BottomSheet from './BottomSheet'

interface NoteOptionsProps {
  deleteNote: Function
  note: NoteProps
  open: boolean
  setOpen: Function
}

const NoteOptions = ({ deleteNote, note, open, setOpen }: NoteOptionsProps) => {
  const styles = styleSheet()
  const theme = useTheme()

  return (
    <BottomSheet
      open={open}
      setOpen={setOpen}
      snapPoints={[230]}
    >
      <div className={styles.container}>
        <span className={styles.title}>
          {note?.title ? note!.title : ''} Settings
        </span>
        <div className={styles.date}>
          Created in {note?.date ? note!.date : ''}
        </div>
        <div className={styles.deleteContainer}>
          {/* @ts-ignore */}
          <Button
            className={styles.deleteButton}
            style={{ background: '#ff2e2e' }}
            variant="contained"
            onClick={deleteNote}
          >
            Delete note
          </Button>
        </div>
      </div>
    </BottomSheet>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
    maxWidth: 800,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
    },
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold'
  },
  date: {
    flex: 1,
    display: 'flex',
    alignItems: 'center'
  },
  deleteContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    width: '90%',
    fontSize: 16,
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
    textTransform: 'none',
    marginLeft: 5,
    marginRight: 5,
  },
}))

export default NoteOptions