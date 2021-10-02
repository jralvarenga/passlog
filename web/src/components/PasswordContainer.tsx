import { Theme, useTheme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { PasswordProps } from '../interfaces/interfaces'

interface PasswordContainerProps {
  password: PasswordProps
}

const PasswordContainer = ({ password }: PasswordContainerProps) => {
  const styles = styleSheet()
  const theme = useTheme()

  return (
    <div className={styles.container}>
      <div className={styles.passwordTitleContainer}>
        <span className={styles.passwordName}>
          {password.profileName}
        </span>
        {password.user != '' && (
          <span style={{ color: theme.palette.text.secondary, fontSize: 14 }}>
            {password.user}
          </span>
        )}
      </div>
      <div className={styles.passwordEmailContainer}>
        <span className={styles.passwordEmail}>
          {password.email}
        </span>
      </div>
    </div>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: 250,
    height: 130,
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.background.paper,
    cursor: 'pointer',
    margin: 10,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: 0,
      marginTop: 10,
      marginBottom: 10
    },
  },
  passwordTitleContainer: {
    width: '100%',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  passwordEmailContainer: {
    width: '100%',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  passwordName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  passwordEmail: {
    fontSize: 12,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  }
}))

export default PasswordContainer