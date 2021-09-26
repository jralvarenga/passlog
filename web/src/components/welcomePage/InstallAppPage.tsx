import { FC } from 'react'
import { Theme, useTheme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import InstallAppCard from './InstallAppCard'

const InstallAppPage: FC = () => {
  const styles = styleSheet()
  const theme = useTheme()

  return (
    <div id="install-app-page" className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.topBarItemContainer}>
          <span className={styles.installAppTitle}>
            Install <span style={{ color: theme.palette.primary.light }}>Passlog</span> app
          </span>
        </div>
      </div>
      <div className={styles.body}>
        <InstallAppCard
          version="android"
          img="/assets/icons/android_logo.svg"
          iconWidth={65}
          iconHeight={53}
          description="Passlog suited for Android users, have all your sensitive data with you at any time, with or without Wifi, Passlog will have you covered"
          link="https://play.google.com/store/apps/details?id=com.passlog"
          desciptionList={['Have everything offline', 'Unlimited storage', 'All free', 'No ads']}
        />
        <InstallAppCard
          version="web"
          img="/assets/icons/pwa_icon.svg"
          iconWidth={60}
          iconHeight={50}
          description="Passlog for all users with a web browser, get Passlog in any device with our lighter web PWA version"
          link="dqbhifegw"
          desciptionList={['Up to 200 KiB of storage', 'Available in any device', 'A much lighter version', 'All free', ' No ads']}
        />
        <InstallAppCard
          version="ios"
          img="/assets/icons/apple_logo.svg"
          iconWidth={50}
          iconHeight={53}
          description="Passlog suited for IOS users, have all your sensitive data with you at any time, with or without Wifi, Passlog will have you covered"
          link="https://play.google.com/store/apps/details?id=com.passlog"
          desciptionList={['Have everything offline', 'Unlimited storage', 'All free', 'No ads']}
        />
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
  },
  topBarItemContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  installAppTitle: {
    fontWeight: 'bold',
    fontSize: 35,
  },
  body: {
    flex: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
}))

export default InstallAppPage