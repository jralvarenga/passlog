import { Button, Theme, useTheme } from '@mui/material'
import { createStyles, makeStyles, withStyles } from '@mui/styles'
import { Android as PlayStoreIcon, Language as WebIcon, Apple as AppleIcon } from '@mui/icons-material'
import EnterAnimation from '../EnterAnimation'
import { KEYFRAMES_DURATION, KEYFRAME_DELAY } from '../../../pages'
import { useRouter } from 'next/router'

interface InstallAppCardProps {
  img: string
  description: string
  iconWidth: number
  iconHeight: number
  desciptionList: string[]
  link: string
  version: 'android' | 'web' | 'ios'
  animationIndex: number
}

const DESCRIPTION_FONT_SIZE = 16
const CARD_HEIGHT = 450

export const InstallAppDivider = () => {
  const styles = styleSheet()

  return (
    <div
      className={styles.divider}
    />
  )
}

const InstallAppCard = ({ img, iconHeight, animationIndex, iconWidth, description, link, desciptionList, version }: InstallAppCardProps) => {
  const styles = styleSheet()
  const router = useRouter()

  return (
    <EnterAnimation
      className={styles.container}
      animation="fadeInDown"
      duration={KEYFRAMES_DURATION + KEYFRAME_DELAY*animationIndex}
    ><>
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
          <a href={link} target="_blank" rel="noreferrer">
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
            onClick={() => router.push('/app')}
            style={{ textTransform: 'none', color: '#fff' }}
            startIcon={<WebIcon />}
          >
            Use Web App
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
    </></EnterAnimation>
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
    flexDirection: 'column',
    alignItems: 'center',
    width: '33%',
    height: CARD_HEIGHT,
    background: theme.palette.background.default,
    padding: 15,
    borderRadius: 35,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
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
    width: '80%',
    display: 'flex',
    paddingTop: 20,
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  buttonContainer: {
    flex: 1,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  divider: {
    width: 3,
    height: CARD_HEIGHT,
    background: theme.palette.background.paper,
    borderRadius: 10,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 3,
    },
  }
}))

export default InstallAppCard