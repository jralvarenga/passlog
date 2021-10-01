import { Theme, useTheme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'

interface TopBarProps {
  title: string
}

const TopBar = ({ title }: TopBarProps)  => {
  const styles = styleSheet()
  const theme = useTheme()

  return (
    <div className={styles.container}>
      <img
        className={styles.passlogLogo}
        src="/assets/icons/passlog_logo.svg"
        alt=""
      />
      <span className={styles.title}>{title}</span>
    </div>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
    height: '10%',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  passlogLogo: {
    width: 20,
    height: 43,
    marginRight: 30
  },
}))

export default TopBar