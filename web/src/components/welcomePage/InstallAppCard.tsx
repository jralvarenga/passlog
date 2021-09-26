import { Button, Theme } from '@mui/material'
import { createStyles, makeStyles, withStyles } from '@mui/styles'
import { Android as PlayStoreIcon, Language as WebIcon, Apple as AppleIcon } from '@mui/icons-material'

interface InstallAppCardProps {
  img: string
  description: string
  iconWidth: number
  iconHeight: number
  desciptionList: string[]
  link: string
  version: 'android' | 'web' | 'ios'
}

const DESCRIPTION_FONT_SIZE = 14
const CARD_WIDTH = 300
const CARD_HEIGHT = 450

const InstallAppCard = ({ img, iconHeight, iconWidth, description, link, desciptionList, version }: InstallAppCardProps) => {
  const styles = styleSheet()

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img
          src={img}
          style={{ width: iconWidth, height: iconHeight }}
          alt=""
        />
      </div>
      <div className={styles.descriptionContainer}>
        <span style={{ textAlign: 'center', fontSize: DESCRIPTION_FONT_SIZE }}>
          {description}
        </span>
        <ul>
          {desciptionList.map((item, i) => (
            <li key={i} style={{ fontSize: DESCRIPTION_FONT_SIZE }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.buttonContainer}>
        {version == 'android' && (
          <a href={link} target="_blank">
            <PlayStoreButton
              disableElevation
              variant="contained"
              style={{ textTransform: 'none', color: '#fff' }}
              startIcon={<PlayStoreIcon />}
            >
              Install now
            </PlayStoreButton>
          </a>
        )}
        {version == 'web' && (
          <PWAButton
            disableElevation
            variant="contained"
            style={{ textTransform: 'none', color: '#fff' }}
            startIcon={<WebIcon />}
          >
            Comming soon
          </PWAButton>
        )}
        {version == 'ios' && (
          <AppleButton
            disableElevation
            variant="contained"
            style={{ textTransform: 'none', color: '#fff' }}
            startIcon={<AppleIcon />}
          >
            Comming soon
          </AppleButton>
        )}
      </div>
    </div>
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

const AppleButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#636366'),
    backgroundColor: '#636366',
    '&:hover': {
      backgroundColor: '#515157',
    },
  },
}))(Button)

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    cursor: 'pointer',
    flexDirection: 'column',
    alignItems: 'center',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    background: theme.palette.background.default,
    padding: 15,
    borderRadius: 35,
    boxShadow: '10px 10px 40px -10px rgba(0,0,0,0.67)',
    transition: '500ms ease-out',
    '&:hover': {
      width: CARD_WIDTH + 20,
      height: CARD_HEIGHT + 20,
      boxShadow: '15px 15px 45px -15px rgba(0,0,0,0.67)',
    },
  },
  logoContainer: {
    flex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  descriptionContainer: {
    flex: 5,
    width: CARD_WIDTH - 50,
    display: 'flex',
    paddingTop: 20,
    flexDirection: 'column'
  },
  buttonContainer: {
    flex: 1,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

export default InstallAppCard