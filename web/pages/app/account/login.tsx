import { LoadingButton } from '@mui/lab'
import { Theme, useTheme  } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppSnackbar from '../../../src/components/AppSnackbar'
import FormInput from '../../../src/components/FormInput'
import { SettingsProps, UserSettingsProps } from '../../../src/interfaces/interfaces'
import { loginInFirebaseAuth } from '../../../src/lib/auth'
import { setSettingsInLocalStorage, setUserSettings as setUserSettingsInStorage } from '../../../src/lib/localStorage'
import { usePasslogUserData } from '../../../src/services/PasslogUserdataProvider'

const BORDER_RADIUS = 60

const LoginPage = () => {
  const styles = styleSheet()
  const theme = useTheme()
  const router = useRouter()
  const { settings, setSettings, renderPasslogDataHandler, setUser } = usePasslogUserData()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarText, setSnackbarText] = useState("")
  const [loading, setLoading] = useState(false)

  const loginHandler = async() => {
    if (password == '' || email == '') {
      setSnackbarText("All the fields are required")
      setShowSnackbar(true)      
    }
    setLoading(true)
    try {
      const { user } = await loginInFirebaseAuth(email, password)
      const userDefaultSettings: UserSettingsProps = {
        uid: user.uid,
        name: user.displayName!,
        alwaysSync: false
      }
      const newSettings: SettingsProps = {
        ...settings,
        askForAlwaysSync: true
      }
      await setSettingsInLocalStorage(newSettings)
      await setUserSettingsInStorage(userDefaultSettings)
      setUser!(user)
      setSettings!(newSettings)
      renderPasslogDataHandler!()
      setLoading(false)
      router.back()
    } catch (error) {
      setLoading(false)
      setSnackbarText("There's been an error, try later")
      setShowSnackbar(true)
    }
  }

  const handlePressedEnter = (e: any) => {
    if (e.key === 'Enter') {
      loginHandler()
    }
  }

  return (
    <form className={styles.container}>
      <div className={styles.body}>
        <div className={styles.imgContainer}>
          <img className={styles.img} src="/assets/img/login-bg.png" alt="" />
        </div>
        <div className={styles.loginContainer}>
          <div className={styles.titleContainer}>
            <span className={styles.titleText}>
              Welcome to Passlog
            </span>
            <br />
            <div className={styles.descriptionText}>
              <span>
                Use your Passlog credential below and login to your account
              </span>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <FormInput
              label="Email"
              value={email}
              setValue={setEmail}
              onKeyDown={handlePressedEnter}
              placeholder="your_email123@email.com"
            />
            <br />
            <FormInput
              label="Password"
              value={password}
              setValue={setPassword}
              onKeyDown={handlePressedEnter}
              secureEntry
              placeholder="yourpassword_130"
            />
          </div>
          <div className={styles.loginButtonContainer}>
            <LoadingButton
              className={styles.loginButton}
              onClick={loginHandler}
              variant="contained"
              loading={loading}
            >
              Log in
            </LoadingButton>
            <p>
              <span onClick={() => router.push('/app/account/create-account')}>
                ¿Don't have an account? <span style={{ color: theme.palette.primary.main, cursor: 'pointer' }}>Create one here</span>
              </span>
            </p>
          </div>
        </div>
        <div className={styles.mobileTrashDiv}></div>
      </div>
      <AppSnackbar
        open={showSnackbar}
        setOpen={setShowSnackbar}
        message={snackbarText}
      />
    </form>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    width: '100%',
    maxWidth: 390,
    height: '100%',
    maxHeight: 500,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0px 0px 31px 0px rgba(0,0,0,0.75)',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '100%',
      boxShadow: '0px 0px 0px 0px rgba(0,0,0,0)',
      borderRadius: theme.shape.borderRadius,
      alignItems: 'center',
      justifyContent: 'center'
    },
  },
  imgContainer: {
    flex: 1.5,
    display: 'flex',
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    [theme.breakpoints.down('sm')]: {
      borderRadius: 0,
    },
  },
  img: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    [theme.breakpoints.down('sm')]: {
      borderRadius: 0,
    },
  },
  loginContainer: {
    flex: 5,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    marginTop: -BORDER_RADIUS,
    padding: 20,
    [theme.breakpoints.down('sm')]: {
      borderRadius: BORDER_RADIUS,
      backgroundColor: 'rgb(40, 40, 40)',
      flex: 4,
    },
  },
  mobileTrashDiv: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
    [theme.breakpoints.down('sm')]: {
      flex: 1.5,
    },
  },
  titleContainer: {
    flex: 0.8,
    textAlign: 'center'
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 15
  },
  inputContainer: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  loginButtonContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 14
  },
  loginButton: {
    width: '50%',
    fontSize: 16,
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
    textTransform: 'none',
  },
}))

export default LoginPage