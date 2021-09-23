import { Button, Theme } from '@mui/material'
import type { NextPage } from 'next'
import { createStyles, makeStyles } from '@mui/styles'

const Home: NextPage = () => {
  const styles = styleSheet()

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.topBarItemContainer}>
          <img className={styles.passlogLogo} src="assets/svg/passlog_logo.svg" alt="" />
          <span className={styles.logoTitle}>
            Passlog
          </span>
        </div>
        <div
          className={styles.topBarItemContainer}
          style={{ justifyContent: 'flex-end', paddingRight: 15 }}
        >
          <Button
            className={styles.button}
            variant="outlined"
          >
            Download
          </Button>
        </div>
      </div>
      <div className={styles.body}></div>
    </div>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  topBar: {
    flex: 0.5,
    backgroundColor: theme.palette.primary.main,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  topBarItemContainer: {
    width: '50%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 15
  },
  logoTitle: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  passlogLogo: {
    width: 25,
    height: 54,
    marginRight: '2%'
  },
  button: {
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
    textTransform: 'none'
  },
  body: {
    flex: 5,
  },
}))

export default Home
