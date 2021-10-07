import { Theme, useTheme, IconButton  } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { useEffect, useState } from 'react'
import HeaderNavigationBar, { HEADERBAR_HEIGHT } from '../../src/components/HeaderNavigationBar'
import PageLayout from '../../src/components/PageLayout'
import { PasswordProps } from '../../src/interfaces/interfaces'
import { usePasslogUserData } from '../../src/services/PasslogUserdataProvider'
import {Mail as EmailIcon, Lock as PasswordIcon, FileCopy as ContentCopyIcon, Menu as MenuIcon } from '@mui/icons-material'
import copy from 'copy-to-clipboard'
import AppSnackbar from '../../src/components/AppSnackbar'
import Header from '../../src/components/Header'
import PasswordOptions from '../../src/components/PasswordOptions'
import { setPasswordsInLocalStorage } from '../../src/lib/localStorage'
import { useRouter } from 'next/router'

const PasswordInfoPage = () => {
  const styles = styleSheet()
  const theme = useTheme()
  const router = useRouter()
  const { selectedPasslogItem, passwords, setPasswords, renderPasslogDataHandler } = usePasslogUserData()
  const [password, setPassword] = useState<PasswordProps>()
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [showPasswordOptions, setShowPasswordOptions] = useState(false)

  useEffect(() => {
    // @ts-ignore
    setPassword(selectedPasslogItem)
  }, [selectedPasslogItem])

  const copyToClipboard = (type: 'Password' | 'Email') => {
    if (type == 'Email') {
      copy(password!.email)
      setSnackbarMessage("Email copied!")
      setOpenSnackbar(true)
    } else {
      copy(password!.password)
      setSnackbarMessage("Password copied!")
      setOpenSnackbar(true)
    }
  }

  const changePasswordData = (npw: PasswordProps) => {
    const newData: PasswordProps = {
      id: npw.id,
      date: npw.date,
      // @ts-ignore
      profileName: npw.profileName ? npw.profileName : password?.profileName,
      // @ts-ignore
      user: npw.user ? npw.user : password?.user,
      // @ts-ignore
      email: npw.email ? npw.email : password?.email,
      // @ts-ignore
      password: npw.password ? npw.password : password?.password,
      // @ts-ignore
      comments: npw.comments ? npw.comments : password?.comments
    }
    try {
      const newPasswords = passwords!.map((password) => {
        if (password.id == newData.id) {
          return newData
        } else {
          return password
        }
      })
      setPassword(newData)
      setPasswords!(newPasswords)
      
      setPasswordsInLocalStorage(newPasswords!)
      renderPasslogDataHandler!()
      setShowPasswordOptions(false)
    } catch (error) {
      setSnackbarMessage("There's been a problem")
      setShowPasswordOptions(true)
    }
  }

  const deletePassword = () => {
    try {
      setShowPasswordOptions(false)
      const id = password!.id
      const index = passwords!.map((password) => password.id).indexOf(id)
      passwords!.splice(index, 1)
      setPasswords!(passwords)

      setPasswordsInLocalStorage(passwords!)
      renderPasslogDataHandler!()
      router.back()
    } catch (error) {
      setSnackbarMessage("There's been a problem")
      setShowPasswordOptions(true)      
    }
  }

  return (
    <PageLayout className={styles.container}>
      <Header
        name="Password info"
      />
      <HeaderNavigationBar
        title={password?.profileName ? password!.profileName : ""}
        showIcon
        icon={<MenuIcon style={{ color: theme.palette.text.primary }} />}
        iconFunction={() => setShowPasswordOptions(true)}
      />
      <div className={styles.body}>
        {password?.user && (
          <span style={{ fontSize: 14 }}>
            Password of {password?.user}
          </span>
        )}
        <div className={styles.passwordInfoContainer}>
          <div className={styles.passwordInfoBox}>
            <div style={{ display: 'flex', alignItems: 'center', width: '85%' }}>
              <EmailIcon
                style={{ marginRight: 5 }}
              />
              <span
                onClick={() => copyToClipboard('Email')}
                className={styles.emailPasswordSpan}
              >
                {password?.email ? password!.email : ""}
              </span>
            </div>
            <IconButton
              onClick={() => copyToClipboard('Email')}
              style={{ backgroundColor: theme.palette.background.paper }}
            >
              <ContentCopyIcon style={{ color: theme.palette.text.primary, fontSize: 25 }} />
            </IconButton>
          </div>
          <div className={styles.passwordInfoBox}>
            <div style={{ display: 'flex', alignItems: 'center', width: '85%' }}>
              <PasswordIcon
                style={{ marginRight: 5 }}
              />
              <span
                onClick={() => copyToClipboard('Password')}
                className={styles.emailPasswordSpan}
              >
                {password?.password ? password!.password : ""}
              </span>
            </div>
            <IconButton
              onClick={() => copyToClipboard('Password')}
              style={{ backgroundColor: theme.palette.background.paper }}
            >
              <ContentCopyIcon style={{ color: theme.palette.text.primary, fontSize: 25 }} />
            </IconButton>
          </div>
          <span style={{ marginTop: 15, fontSize: 14 }}>
            Last update on {password?.date ? password!.date : ""}
          </span>
        </div>
        <div className={styles.commentsContainer}>
          <div className={styles.commentsBox}>
            {password?.comments ? (
              <span>
                {password?.comments}
              </span>
            ) : (
              <span style={{ color: theme.palette.background.paper }}>
                No comments...
              </span>
            )}
          </div>
        </div>
      </div>
      <AppSnackbar
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        message={snackbarMessage}
      />
      <PasswordOptions
        open={showPasswordOptions}
        //@ts-ignore
        password={password ? password : {}}
        setOpen={setShowPasswordOptions}
        changePasswordData={changePasswordData}
        deletePassword={deletePassword}
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
    padding: 15
  },
  passwordInfoContainer: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  passwordInfoBox: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5
  },
  emailPasswordSpan: {
    fontSize: 16,
    padding: 10,
    width: '100%',
    cursor: 'pointer',
    borderRadius: 10,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14
    },
  },
  commentsContainer: {
    flex: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5
  },
  commentsBox: {
    width: '100%',
    height: '100%',
    padding: 10,
    border: `2px solid ${theme.palette.background.paper}`,
    borderRadius: theme.shape.borderRadius
  }
}))

export default PasswordInfoPage