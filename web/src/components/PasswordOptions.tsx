import { Theme, useTheme, IconButton, Button  } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { useState } from 'react'
import { PasswordProps } from '../interfaces/interfaces'
import BottomSheet from './BottomSheet'
import FormInput from './FormInput'

interface PasswordOptionsProps {
  open: boolean
  setOpen: Function
  password: PasswordProps
  changePasswordData: Function
  deletePassword: Function
}

const PasswordOptions = ({ open, setOpen, password, changePasswordData, deletePassword }: PasswordOptionsProps) => {
  const styles = styleSheet()
  const theme = useTheme()
  const [name, setName] = useState(password.profileName ? password.profileName : "")
  const [user, setUser] = useState(password.user ? password.user : "")
  const [email, setEmail] = useState(password.email ? password.email : "")
  const [newPassword, setPassword] = useState(password.password ? password.password : "")
  const [comments, setComments] = useState(password.comments ? password.comments : "")

  const changeHandler = () => {
    const currentDate = new Date()
    currentDate.setMinutes(currentDate.getMinutes() + currentDate.getTimezoneOffset())
    const newData: PasswordProps = {
      id: password.id,
      profileName: name,
      user: user,
      email: email,
      password: newPassword,
      comments: comments,
      date: `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`
    }

    changePasswordData(newData)
  }

  return (
    <BottomSheet
      open={open}
      setOpen={setOpen}
      snapPoints={[650]}
    >
      <div className={styles.container}>
        <div className={styles.newDataContainer}>
          <div className={styles.inputsContainer}>
            <div
              className={styles.inputBox}
              style={{ justifyContent: 'space-between' }}
            >
              <FormInput
                label="Update name"
                placeholder={password.profileName}
                width="48%"
                value={name}
                setValue={setName}
              />
              <FormInput
                label={password.user ? "Update user" : 'New user'}
                placeholder={password.user ? password.user : 'my_new_user'}
                width="48%"
                value={user}
                setValue={setUser}
              />
            </div>
            <div className={styles.inputBox}>
              <FormInput
                label="Update email"
                placeholder={password.email}
                value={email}
                setValue={setEmail}
              />
            </div>
            <div className={styles.inputBox}>
              <FormInput
                label="Update password"
                placeholder={password.password}
                value={newPassword}
                setValue={setPassword}
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
                Add new comments
              </span>
              <FormInput
                label=""
                placeholder="Your comments here..."
                multiline
                rows={window.screen.width <= theme.breakpoints.values.sm ? 4 : 4}
                value={comments}
                setValue={setComments}
              />
            </div>
          </div>
          <div className={styles.createButtonContainer}>
            <Button
              className={styles.createButton}
              onClick={changeHandler}
              variant="contained"
            >
              Update password
            </Button>
          </div>
        </div>
        <div className={styles.deleteContainer}>
          {/* @ts-ignore */}
          <Button
            className={styles.deleteButton}
            style={{ background: '#ff2e2e' }}
            onClick={deletePassword}
            variant="contained"
          >
            Delete password
          </Button>
        </div>
      </div>
    </BottomSheet>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
    maxWidth: 800,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
    },
  },
  newDataContainer: {
    flex: 7,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      flex: 10
    },
  },
  inputsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 6,
  },
  createButtonContainer: {
    width: '100%',
    flex: 0.7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButton: {
    fontSize: 16,
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
    textTransform: 'none',
    marginLeft: 5,
    marginRight: 5,
  },
  inputBox: {
    width: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center'
  },
  deleteContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  deleteButton: {
    width: '49%',
    fontSize: 16,
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
    textTransform: 'none',
    marginLeft: 5,
    marginRight: 5,
  },
}))

export default PasswordOptions