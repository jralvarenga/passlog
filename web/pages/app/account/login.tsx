import { Theme, Button, useTheme  } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'

const BORDER_RADIUS = 40

const LoginPage = () => {
  const styles = styleSheet()
  const theme = useTheme()

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.imgContainer}>
          <img className={styles.img} src="/assets/img/login-bg.png" alt="" />
        </div>
        <div className={styles.loginContainer}>
          <div className={styles.titleContainer}>
            <p>
              <span>Welcome to Passlog</span>
            </p>
            <p>
              <span>Use your Passlog credential below and login to your account</span>
            </p>
          </div>
          <div className={styles.inputContainer}></div>
          <div className={styles.loginButtonContainer}></div>
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
    },
  },
  imgContainer: {
    flex: 1,
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
      flex: 3,
    },
  },
  titleContainer: {
    flex: 0.8,
    backgroundColor: 'red'
  },
  inputContainer: {
    flex: 2,
    backgroundColor: 'blue'
  },
  loginButtonContainer: {
    flex: 1,
    backgroundColor: 'green'
  }
}))

export default LoginPage