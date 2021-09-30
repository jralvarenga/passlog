import { Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'

interface NavBarProps {
  index: number
  setIndex: Function
}

export const NAVBAR_WIDHT = 80
export const NAVBAR_HEIGHT = 70

const NavBar = ({ index, setIndex }: NavBarProps) => {
  const styles = styleSheet()

  return (
    <div className={styles.container}>
      xd
    </div>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: NAVBAR_WIDHT,
    height: '100%',
    backgroundColor: 'red',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: NAVBAR_HEIGHT,
    },
  }
}))

export default NavBar