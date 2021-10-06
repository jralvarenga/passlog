import { Theme, useTheme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import TouchRipple from '@mui/material/ButtonBase/TouchRipple'
import { NoteProps } from '../interfaces/interfaces'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { usePasslogUserData } from '../services/PasslogUserdataProvider'

interface NoteContainerProps {
  note: NoteProps
}

const NoteContainer = ({ note }: NoteContainerProps) => {
  const styles = styleSheet()
  const router = useRouter()
  const { setSelectedPasslogItem } = usePasslogUserData()
  const rippleRef = useRef(null)

  const goToNote = () => {
    setSelectedPasslogItem!(note)
    setTimeout(() => {
      router.push('/app/note-editor')  
    }, 500)
  }

  const onRippleStart = (e: any) => {
    // @ts-ignore
    rippleRef.current.start(e)
  }
  const onRippleStop = (e: any) => {
    // @ts-ignore
    rippleRef.current.stop(e)
  }

  return (
    <div
      onClick={goToNote}
      onMouseDown={onRippleStart}
      onMouseUp={onRippleStop}
      className={styles.container}
    >
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
      <TouchRipple ref={rippleRef} center={false} />
    </div>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: 250,
    height: 130,
    display: 'flex',
    position: 'relative',
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