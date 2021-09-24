import { useState } from 'react'
import type { NextPage } from 'next'
import { Button, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import GitHubIcon from '@mui/icons-material/GitHub'
import DownloadIcon from '@mui/icons-material/Download'
import InstallAppDialog from '../src/components/InstallAppDialog'

const Home: NextPage = () => {
  const styles = styleSheet()
  const [showInstallAppDialog, setShowInstallAppDialog] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.topBarItemContainer}>
          <img className={styles.passlogLogo} src="assets/svg/passlog_logo.svg" alt="" />
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
            onClick={() => setShowInstallAppDialog(true)}
            startIcon={<DownloadIcon />}
          >
            Install app
          </Button>
        </div>
      </div>
      <div className={styles.body}></div>
      <InstallAppDialog
        visible={showInstallAppDialog}
        setVisible={setShowInstallAppDialog}
      />
    </div>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
    //maxWidth: 1500,
    height: '100vh',
    //maxHeight: 1500,
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  topBar: {
    flex: 0.5,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    padding: 10,
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
    fontSize: 25,
  },
  passlogLogo: {
    width: 25,
    height: 54,
    marginRight: '2%'
  },
  actionButton: {
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
