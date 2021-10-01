import { Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import PasswordsPage from '../pages/PasswordsPage'
import { NAVBAR_HEIGHT, NAVBAR_WIDHT } from './NavBar'

interface AppBodyProps {
  index: number
  setIndex: Function
}

const AppBody = ({ index, setIndex }: AppBodyProps) => {
  const styles = styleSheet()

  return (
    <div className={styles.container}>
      {index == 0 ? (
        <PasswordsPage />
      ) : (
        <div></div>
      )}
    </div>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: `calc(100% - ${NAVBAR_WIDHT}px)`,
    height: '100%',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: `calc(100% - ${NAVBAR_HEIGHT}px)`,
    },
  }
}))

export default AppBody