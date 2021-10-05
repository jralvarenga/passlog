import { Theme, useTheme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { NoteProps } from '../interfaces/interfaces'

interface NoteContainerProps {
  note: NoteProps
}

const NoteContainer = ({ note }: NoteContainerProps) => {
  const styles = styleSheet()
  const theme = useTheme()

  return (
    <div className={styles.container}>
      <div className={styles.noteTitleContainer}>
        <span className={styles.noteName}>
          {note.title}
        </span>
      </div>
      <div className={styles.noteEmailContainer}>
        <span className={styles.noteBody}>
          {note.body}
        </span>
      </div>
    </div>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: 250,
    height: 130,
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.background.paper,
    cursor: 'pointer',
    margin: 10,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: 0,
      marginTop: 10,
      marginBottom: 10
    },
  },
  noteTitleContainer: {
    width: '100%',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  noteEmailContainer: {
    width: '100%',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  noteName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  noteBody: {
    fontSize: 14,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
    whiteSpace: "nowrap",
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
}))

export default NoteContainer