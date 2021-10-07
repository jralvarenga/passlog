import { Theme, Button  } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { Google as GoogleIcon, Settings as AppSettingsIcon, Person as AccountSettingsIcon, Star as StarIcon } from '@mui/icons-material'

const PADDING = 20

const SettingsPage = () => {
  const styles = styleSheet()

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <span className={styles.name}>
          Rigo Alvarenga
        </span>
        <span className={styles.dataCount}>
          24 passwords & 5 cards
        </span>
      </div>
      <div className={styles.body}>
        <div className={styles.storageSizeContainer}>
          <div className={styles.storageSizeBox}>
            <span>
              4.368 KiB used in storage
            </span>
            <span>
              295.631 Kib available in Cloud
            </span>
          </div>
          <div className={styles.buttonsContainer}>
            <Button
              className={styles.cloudButton}
              //onClick={createPassword}
              variant="contained"
            >
              Cloud settings
            </Button>
            <Button
              className={styles.cloudButton}
              style={{ background: '#fff', color: '#000' }}
              //onClick={createPassword}
              variant="contained"
              startIcon={<GoogleIcon />}
            >
              Passwords
            </Button>
          </div>
        </div>
        <div className={styles.optionsContainer}>
          <div className={styles.optionBox}>
            <AppSettingsIcon style={{ marginRight: 10 }} />
            <span style={{ fontWeight: 'bold' }}>
              App settings
            </span>
          </div>
          <div className={styles.optionBox}>
            <AccountSettingsIcon style={{ marginRight: 10 }} />
            <span style={{ fontWeight: 'bold' }}>
              Account settings
            </span>
          </div>
          <div className={styles.optionBox}>
            <StarIcon style={{ marginRight: 10 }} />
            <span style={{ fontWeight: 'bold' }}>
              Rate app & give feedback
            </span>
          </div>
        </div>
        <div className={styles.signOutContainer}>
          <Button
            className={styles.cloudButton}
            style={{ background: '#ff2e2e' }}
            //onClick={createPassword}
            variant="contained"
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
    maxWidth: 800,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
    },
  },
  titleContainer: {
    flex: 0.8,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: PADDING
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  dataCount: {
    fontSize: 14,
    marginTop: 5
  },
  body: {
    flex: 6,
    padding: PADDING,
    display: 'flex',
    flexDirection: 'column'
  },
  storageSizeContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  storageSizeBox: {
    width: '100%',
    height: '60%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: `2px solid ${theme.palette.background.paper}`,
    borderRadius: theme.shape.borderRadius
  },
  buttonsContainer: {
    width: '100%',
    height: '40%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cloudButton: {
    width: '49%',
    fontSize: 16,
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
    textTransform: 'none',
    marginLeft: 5,
    marginRight: 5,
  },
  optionsContainer: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 15
  },
  optionBox: {
    width: '100%',
    padding: 15,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    transition: '200ms',
    marginTop: 10,
    marginBottom: 10,
    '&:hover': {
      backgroundColor: 'rgb(65, 65, 65)',
    }
  },
  signOutContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}))

export default SettingsPage