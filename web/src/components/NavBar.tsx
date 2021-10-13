import { Theme, useTheme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { Key as KeyIcon, Book as BookIcon, CreditCard as CreditCardIcon, Settings as SettingsIcon } from 'react-feather'

interface NavBarProps {
  index: number
  setIndex: Function
}

export const NAVBAR_WIDHT = 70
export const NAVBAR_HEIGHT = 70

const NavBar = ({ index, setIndex }: NavBarProps) => {
  const styles = styleSheet()
  const theme = useTheme()

  return (
    <div className={styles.container}>
      <div
        className={styles.iconContainer}
        onClick={() => setIndex(0)}
      >
        <KeyIcon
          color={index == 0 ? theme.palette.primary.main : theme.palette.text.secondary}
        />
      </div>
      <div
        className={styles.iconContainer}
        onClick={() => setIndex(1)}
      >
        <BookIcon
          color={index == 1 ? theme.palette.primary.main : theme.palette.text.secondary}
        />
      </div>
      <div
        className={styles.iconContainer}
        onClick={() => setIndex(2)}
      >
        <CreditCardIcon
          color={index == 2 ? theme.palette.primary.main : theme.palette.text.secondary}
        />
      </div>
      <div
        className={styles.iconContainer}
        onClick={() => setIndex(3)}
      >
        <SettingsIcon
          color={index == 3 ? theme.palette.primary.main : theme.palette.text.secondary}
        />
      </div>
    </div>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: NAVBAR_WIDHT,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: NAVBAR_HEIGHT,
      flexDirection: 'row',
    },
  },
  iconContainer: {
    width: '100%',
    height: NAVBAR_WIDHT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      width: '25%',
      height: '100%',
    },
  }
}))

export default NavBar