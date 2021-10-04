import { useState, useEffect } from 'react'
import { Button, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import BottomSheet from './BottomSheet'
import { useRouter } from 'next/router'
import { generatePassword } from '../lib/generatePassword'

interface GeneratePasswordSheet {
  open: boolean
  setOpen: Function
}

const GeneratePasswordSheet = ({ open, setOpen }: GeneratePasswordSheet) => {
  const styles = styleSheet()
  const router = useRouter()
  const [password, setPassword] = useState("")

  useEffect(() => {
    const newPassword = generatePassword()
    setPassword(newPassword)
  }, [open])

  const createProfile = () => {
    setOpen(false)
    router.push(`/app/create-password?gnp=${password}`)
  }

  return (
    <BottomSheet
      open={open}
      setOpen={setOpen}
      snapPoints={[250]}
    >
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <span>Generate Password</span>
        </div>
        <div className={styles.newPasswordContainer}>
          <span>{password}</span>
        </div>
        <div className={styles.createContainer}>
          <Button
            className={styles.createButton}
            onClick={createProfile}
            variant="contained"
          >
            Create password profile
          </Button>
        </div>
      </div>
    </BottomSheet>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
    maxWidth: 700,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  titleContainer: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center'
  },
  newPasswordContainer: {
    flex: 5,
    display: 'flex',
    alignItems: 'center'
  },
  createContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
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

export default GeneratePasswordSheet