import { LoadingButton } from '@mui/lab'
import { Theme, useTheme  } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'
import { useState } from 'react'
import AppSnackbar from '../../../src/components/AppSnackbar'
import FormInput from '../../../src/components/FormInput'

const BORDER_RADIUS = 60

const LoginPage = () => {
  const styles = styleSheet()
  const theme = useTheme()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarText, setSnackbarText] = useState("")
  const [loading, setLoading] = useState(false)

  const loginHandler = async() => {
    setLoading(true)
    try {
      console.log('xd')
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setSnackbarText("There's been an error, try later")
      setShowSnackbar(true)
    }
  }

  return (
    <div className={styles.container}>
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
              placeholder="your_email123@email.com"
            />
            <br />
            <FormInput
              label="Password"
              value={password}
              setValue={setPassword}
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
    </div>
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