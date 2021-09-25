import { Button, Theme } from '@mui/material'
import type { NextPage } from 'next'
import { createStyles, makeStyles } from '@mui/styles'
import GitHubIcon from '@mui/icons-material/GitHub'
import DownloadIcon from '@mui/icons-material/Download'

const Home: NextPage = () => {
  const styles = styleSheet()

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.topBarItemContainer}>
          <img className={styles.passlogLogo} src="assets/icons/passlog_logo.svg" alt="" />
          <span className={styles.logoTitle}>
            Passlog 
          </span>
        </div>
        <div
          className={styles.topBarItemContainer}
          style={{ justifyContent: 'flex-end', paddingRight: 15 }}
        >
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
            startIcon={<DownloadIcon />}
          >
            Install app
          </Button>
        </div>
      </div>
      <div className={styles.body}></div>
    </div>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  topBar: {
    flex: 0.5,
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  topBarItemContainer: {
    width: '50%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 15
  },
  logoTitle: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  passlogLogo: {
    width: 20,
    height: 43,
    marginRight: '2%'
  },
  actionButton: {
    fontSize: 14,
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
    textTransform: 'none',
    marginLeft: 5,
    marginRight: 5
  },
  body: {
    flex: 5,
  },
}))

export default Home