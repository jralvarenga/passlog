import { Theme, useTheme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import TopBar from '../components/TopBar'

const PasswordsPage = () => {
  const styles = styleSheet()
  const theme = useTheme()

  return (
    <div className={styles.container}>
      <TopBar title="Passwords" />
      <div className={styles.body}>
        xd
      </div>
    </div>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 20
  },
  body: {
    width: '100%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 20,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 30,
    },
  }
}))

export default PasswordsPage