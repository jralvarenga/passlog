import React from 'react'
import { Button, useTheme, Modal, Backdrop, Fade } from '@mui/material'
import { createStyles, makeStyles, withStyles } from '@mui/styles'
import { Theme } from '@mui/material'
import { Android as PlayStoreIcon, Language as WebIcon } from '@mui/icons-material'

interface InstallAppDialogProps {
  visible: boolean
  setVisible: Function
}

const InstallAppDialog = ({ visible, setVisible }: InstallAppDialogProps) => {
  const theme = useTheme()
  const styles = styleSheet()

  return (
    <Modal
      open={visible}
      className={styles.container}
      onClose={() => setVisible(false)}
      closeAfterTransition
    >
      <Fade in={visible}>
        <div className={styles.modalWindow}>
          <div className={styles.appDescriptionContainer}>
            <div className={styles.appTitle}>
              <img
                style={{ width: 70, height: 57 }}
                src="/assets/svg/android_logo.svg"
                alt=""
              />
            </div>
            <div className={styles.appDescription}>
              <p>
                Passlog suited for Android phones, have all your passwords, notes & cards always with you and in the palm of your hand, access them with or without internet anywhere
              </p>
              <p>
                <ul style={{ textAlign: 'left' }}>
                  <li>Offline access</li>
                  <li>Use it with or without account</li>
                  <li>Unlimited space in your phone</li>
                  <li>No ads, all free</li>
                </ul>
              </p>
              <p>
                You can see the source code <a style={{ color: theme.palette.primary.light }} href="https://github.com/jralvarenga/passlog/tree/master/mobile">here</a>
              </p>
            </div>
            <div className={styles.installButton}>
              <a href="https://play.google.com/store/apps/details?id=com.passlog" target="_blank">
                <PlayStoreButton
                  disableElevation
                  variant="contained"
                  style={{ textTransform: 'none', borderRadius: 10, color: '#fff' }}
                  startIcon={<PlayStoreIcon />}
                >Install now</PlayStoreButton>
              </a>
            </div>
          </div>
          <div className={styles.appDescriptionContainer}>
            <div className={styles.appTitle}>
              <img
                style={{ width: 70, height: 57 }}
                src="/assets/svg/pwa_icon.svg"
                alt=""
              />
            </div>
            <div className={styles.appDescription}>
              <p>
                Passlog suited for all users, have all your passwords, notes & cards on any android, ios, windows or mac device with Passlog PWA
              </p>
              <p>
                <ul style={{ textAlign: 'left' }}>
                  <li>Available in device with any web browser</li>
                  <li>Use it with or without account</li>
                  <li>Up to 250 KiB of offline storage</li>
                  <li>No ads, all free</li>
                </ul>
              </p>
              {/*<p>
                You can see the source code <a style={{ color: theme.palette.primary.light }} href="https://github.com/jralvarenga/passlog/tree/master/mobile">here</a>
              </p>*/}
            </div>
            <div className={styles.installButton}>
              <PWAButton
                disableElevation
                variant="contained"
                style={{ textTransform: 'none', borderRadius: 10, color: '#fff' }}
                startIcon={<WebIcon />}
              >Comming soon</PWAButton>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

const PlayStoreButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#3ddc84'),
    backgroundColor: '#3ddc84',
    '&:hover': {
      backgroundColor: '#10e36e',
    },
  },
}))(Button)

const PWAButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#854da7'),
    backgroundColor: '#854da7',
    '&:hover': {
      backgroundColor: '#7d36a8',
    },
  },
}))(Button)

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalWindow: {
    width: '60%',
    height: '90%',
    borderRadius: 30,
    padding: 30,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  appDescriptionContainer: {
    width: '60%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  appTitle: {
    display: 'flex',
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  appDescription: {
    display: 'flex',
    flexDirection: 'column',
    flex: 5,
    paddingTop: 20,
    textAlign: 'center',
    padding: 10,
  },
  installButton: {
    display: 'flex',
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export default InstallAppDialog