import { Theme, useTheme } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { createStyles, makeStyles } from '@mui/styles'
import FormInput from '../../../src/components/FormInput'
import Header from '../../../src/components/Header'
import HeaderNavigationBar, { HEADERBAR_HEIGHT } from '../../../src/components/HeaderNavigationBar'
import { AccountCircle as AccountCircleIcon, Mail as EmailIcon, Lock as AccountIcon, ModeComment as CommentIcon, VisibilityOff as EyeOffIcon, Visibility as EyeOnIcon, VisibilityOff } from '@mui/icons-material'
import { useEffect, useRef, useState } from 'react'
import { createId } from '../../../src/lib/createId'
import { useRouter } from 'next/router'
import PageLayout from '../../../src/components/PageLayout'
import { usePasslogUserData } from '../../../src/services/PasslogUserdataProvider'
import AppSnackbar from '../../../src/components/AppSnackbar'

const CreateAccountPage = () => {
  const styles = styleSheet()
  const theme = useTheme()
  const router = useRouter()
  const { renderPasslogDataHandler } = usePasslogUserData()
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setAccount] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarText, setSnackbarText] = useState("")

  useEffect(() => {
    const { query } = router
    const gnp: any = query.gnp
    setAccount(gnp)
  }, [router])

  const createAccount = async() => {
    setLoading(true)
    try {
      
      renderPasslogDataHandler!()
      setLoading(false)
      router.back()
    } catch (error) {
      setSnackbarText("There's been an error, try later")
      setShowSnackbar(true)
    }
  }

  return (
    <PageLayout className={styles.container}>
      <Header
        name="Create Account"
      />
      <HeaderNavigationBar
        title="Create Account"
        showIcon
        icon={
          showPassword ?
            <EyeOnIcon style={{ color: theme.palette.text.primary }} />
          :
            <EyeOffIcon style={{ color: theme.palette.text.primary }} />
        }
        iconFunction={() => setShowPassword(!showPassword)}
      />
      <div className={styles.body}>
        <div className={styles.inputsContainer}>
          <div
            className={styles.inputBox}
            style={{ justifyContent: 'space-between' }}
          >
            <FormInput
              label="First name"
              placeholder="Steve"
              width="48%"
              value={name}
              setValue={setName}
              icon={
                <AccountCircleIcon
                  style={{
                    color: theme.palette.background.paper
                  }}
                />
              }
            />
            <FormInput
              label="Last name"
              placeholder="Dolphin"
              width="48%"
              value={lastName}
              setValue={setLastName}
              icon={
                <AccountCircleIcon
                  style={{
                    color: theme.palette.background.paper
                  }}
                />
              }
            />
          </div>
          <div className={styles.inputBox}>
            <FormInput
              label="The email"
              placeholder="stevedolphin123@email.com"
              value={email}
              setValue={setEmail}
              icon={
                <EmailIcon
                  style={{
                    color: theme.palette.background.paper
                  }}
                />
              }
            />
          </div>
          <div className={styles.inputBox} style={{ flexDirection: 'column' }}>
            <FormInput
              label="The password"
              placeholder="myawesome_password123"
              value={password}
              secureEntry={!showPassword}
              setValue={setAccount}
              icon={
                <AccountIcon
                  style={{
                    color: theme.palette.background.paper
                  }}
                />
              }
            />
            <br />
            <FormInput
              label="Repeat the password"
              placeholder="myawesome_password123"
              value={repeatPassword}
              secureEntry={!showPassword}
              setValue={setRepeatPassword}
              icon={
                <AccountIcon
                  style={{
                    color: theme.palette.background.paper
                  }}
                />
              }
            />
          </div>
        </div>
        <div className={styles.createButtonContainer}>
          <LoadingButton
            className={styles.createButton}
            onClick={createAccount}
            variant="contained"
            loading={loading}
          >
            Create account
          </LoadingButton>
        </div>
      </div>
      <AppSnackbar
        open={showSnackbar}
        setOpen={setShowSnackbar}
        message={snackbarText}
      />
    </PageLayout>
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
  body: {
    width: '100%',
    height: `calc(100% - ${HEADERBAR_HEIGHT})`,
    maxWidth: 800,
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    paddingTop: 50
  },
  inputsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 5,
  },
  inputBox: {
    width: '100%',
    marginBottom: 30,
    display: 'flex',
    alignItems: 'center'
  },
  createButtonContainer: {
    width: '100%',
    flex: 0.7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  createButton: {
    fontSize: 16,
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
    textTransform: 'none',
    marginLeft: 5,
    marginRight: 5,
  },
}))

export default CreateAccountPage