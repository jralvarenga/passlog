import { Theme, useTheme } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { createStyles, makeStyles } from '@mui/styles'
import FormInput from '../../src/components/FormInput'
import Header from '../../src/components/Header'
import HeaderNavigationBar, { HEADERBAR_HEIGHT } from '../../src/components/HeaderNavigationBar'
import { AccountCircle as AccountCircleIcon, Mail as EmailIcon, Lock as PasswordIcon, ModeComment as CommentIcon, VisibilityOff as EyeOffIcon, Visibility as EyeOnIcon, VisibilityOff } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { PasswordProps } from '../../src/interfaces/interfaces'
import { createId } from '../../src/lib/createId'
import { useRouter } from 'next/router'
import PageLayout from '../../src/components/PageLayout'
import { usePasslogUserData } from '../../src/services/PasslogUserdataProvider'
import { setPasswordsInLocalStorage } from '../../src/lib/localStorage'
import AppSnackbar from '../../src/components/AppSnackbar'
import { encryptPassword } from '../../src/lib/encripter'
import { createNewPasslogDocument } from '../../src/lib/firestore'

const CreatePasswordPage = () => {
  const styles = styleSheet()
  const theme = useTheme()
  const router = useRouter()
  const { passwords, setPasswords, renderPasslogDataHandler, userSettings } = usePasslogUserData()
  const [name, setName] = useState("")
  const [user, setUser] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [comments, setComments] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackbarText, setSnackbarText] = useState("")

  useEffect(() => {
    const { query } = router
    const gnp: any = query.gnp
    setPassword(gnp)
  }, [router])

  const createPassword = async() => {
    setLoading(true)
    try {
      const currentDate = new Date()
      currentDate.setMinutes(currentDate.getMinutes() + currentDate.getTimezoneOffset())
      let newPasswordInfo: PasswordProps = {
        id: createId(),
        profileName: name,
        user: user,
        email: email,
        password: password,
        comments: comments,
        date: `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`
      }
      passwords!.push(newPasswordInfo)
      setPasswords!(passwords)
      
      setPasswordsInLocalStorage(passwords!)
      if (userSettings?.alwaysSync) {
        newPasswordInfo = encryptPassword(newPasswordInfo)
        await createNewPasslogDocument(newPasswordInfo, 'passwords')
      }
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
        name="Create Password"
      />
      <HeaderNavigationBar
        title="Create Password"
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
              label="Password name"
              placeholder="Name"
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
              label="User name"
              placeholder="my_user"
              width="48%"
              value={user}
              setValue={setUser}
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
          <div className={styles.inputBox}>
            <FormInput
              label="The password"
              placeholder="myawesome_password123"
              value={password}
              secureEntry={!showPassword}
              setValue={setPassword}
              icon={
                <PasswordIcon
                  style={{
                    color: theme.palette.background.paper
                  }}
                />
              }
            />
          </div>
          <div
            className={styles.inputBox}
            style={{
              flex: window.screen.width <= theme.breakpoints.values.sm ? 4 : 2,
              flexDirection: 'column'
            }}
          >
            <span style={{ width: '100%', marginBottom: -15, marginTop: 10, color: theme.palette.text.secondary }}>
              Your comments
            </span>
            <FormInput
              label=""
              placeholder="Your comments here..."
              multiline
              rows={window.screen.width <= theme.breakpoints.values.sm ? 8 : 4}
              value={comments}
              setValue={setComments}
              icon={
                <CommentIcon
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
            onClick={createPassword}
            variant="contained"
            loading={loading}
          >
            Create password
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
    padding: 20
  },
  inputsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 5,
  },
  inputBox: {
    width: '100%',
    flex: 1,
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

export default CreatePasswordPage