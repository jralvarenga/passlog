import { IconButton, Theme, useTheme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import AddIcon from '@mui/icons-material/Add'
import { useRouter } from 'next/router'

interface TopBarProps {
  title: 'Passwords' | 'Notes' | 'Cards'
}

const TopBar = ({ title }: TopBarProps)  => {
  const styles = styleSheet()
  const theme = useTheme()
  const router = useRouter()

  const goToCreateNew = () => {
    switch (title) {
      case 'Passwords':
        router.push('/app/create-password')
      break
      case 'Cards':
        router.push('/app/create-card')
      break
      case 'Notes':
        router.push('/app/note-editor')
      break    
      default:
        router.push('/app/create-password')
      break
    }
  }

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          className={styles.passlogLogo}
          src="/assets/icons/passlog_logo.svg"
          alt=""
        />
        <span className={styles.title}>{title}</span>
      </div>
      <div>
        <IconButton
          onClick={goToCreateNew}
          style={{ backgroundColor: theme.palette.background.paper }}
        >
          <AddIcon style={{ color: theme.palette.text.primary }} />
        </IconButton>
      </div>
    </div>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
    maxWidth: 300,
    height: '10%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  passlogLogo: {
    width: 20,
    height: 43,
    marginRight: 30
  },
}))

export default TopBar