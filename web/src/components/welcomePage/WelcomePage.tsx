import { FC } from 'react'
import { Button, Theme, useTheme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import GitHubIcon from '@mui/icons-material/GitHub'
import DownloadIcon from '@mui/icons-material/Download'

const WelcomePage: FC = () => {
  const styles = styleSheet()
  const theme = useTheme()

  const scrollToInstallApp = () => {
    document.getElementById('install-app-page')?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <div id="welcome-page" className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.topBarItemContainer}>
          <img className={styles.passlogLogo} src="assets/icons/passlog_logo.svg" alt="" />
          <span className={styles.logoTitle}>
            Passlog 
          </span>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.appDescriptionContainer}>
          <p>
            <span className={styles.appDescriptionTitle}>
              Welcome to <span style={{ color: theme.palette.primary.light }}>Passlog</span>
            </span>
          </p>
          <p>
            <span className={styles.appDescriptionDescription}>
              Need a place to store all your sensitive info. With Passlog you can store safely all your passwords, notes & cards and stop worring about it
            </span>
          </p>
          <div>
            <a href="https://github.com/jralvarenga/passlog">
              <Button
                className={styles.actionButton}
                variant="outlined"
                startIcon={<GitHubIcon />}
              >
                Source code
              </Button>
            </a>
            <Button
              className={styles.actionButton}
              variant="contained"
              onClick={scrollToInstallApp}
              startIcon={<DownloadIcon />}
            >
              Install Passlog
            </Button>
          </div>
        </div>
        <div className={styles.appPreviewContainer}>
          <img
            className={styles.appPreviewImg}
            src="/assets/icons/app_preview.svg"
            alt=""
          />
        </div>
      </div> 
    </div>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: 35,
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      padding: 25,
    },
  },
  topBar: {
    flex: 0.5,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  topBarItemContainer: {
    width: '50%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      justifyContent: 'center',
    },
  },
  logoTitle: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  passlogLogo: {
    width: 20,
    height: 43,
    marginRight: 15
  },
  actionButton: {
    fontSize: 16,
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
    textTransform: 'none',
    marginLeft: 5,
    marginRight: 5,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  body: {
    flex: 5,
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse'
    },
  },
  appDescriptionContainer: {
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '50%',
    },
  },
  appDescriptionTitle: {
    fontSize: 80,
    fontWeight: 'bolder',
    lineHeight: 1.2,
    [theme.breakpoints.down('md')]: {
      fontSize: 40,
    },
  },
  appDescriptionDescription: {
    fontSize: 18,
    color: theme.palette.text.secondary
  },
  appPreviewContainer: {
    display: 'flex',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '100%'
    },
  },
  appPreviewImg: {
    width: 500,
    height: 500,
    [theme.breakpoints.down(1000)]: {
      width: 450,
      height: 450,
    },
    [theme.breakpoints.down('md')]: {
      width: 300,
      height: 300,
    },
  }
}))

export default WelcomePage