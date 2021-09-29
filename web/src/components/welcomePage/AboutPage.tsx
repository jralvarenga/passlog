import { FC } from 'react'
import { createStyles, makeStyles } from '@mui/styles'
import { Theme, useTheme } from '@mui/material'

const AboutPage: FC = () => {
  const styles = styleSheet()
  const theme = useTheme()

  return (
    <div className={styles.container} id="about-page">
      <div className={styles.body}>
        <p>
          <span className={styles.title}>
            About <span style={{ color: theme.palette.primary.light }}>Passlog</span>
          </span>
        </p>
        <p>
          <span>
            Passlog is an open source proyect where you can store all your private data like passwords, notes & cards and keep them safe in one place all for free.
          </span>
        </p>
        <p>
          <span>
            Passlog works with AES encryption so you lnow that all the data you enter will be safely storage and no one else can see it besides you.
          </span>
        </p>
        <ul>
          <li>This is what you enter: my_awesomepassword123</li>
          <li>This is what is stored: ugiGVHIUfuw78==</li>
        </ul>
        <p>
          <span>
            All Passlog data is storage in your device, but you can choose whether to have a copy in our cloud, where you can have your data on any device.
          </span>
        </p>
      </div>
      <div className={styles.imgContainer}>
        <img
          src="/assets/icons/security.svg"
          alt=""
          className={styles.securityImg}
        />
      </div>
    </div>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    padding: 35,
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      padding: 25,
      flexDirection: 'column-reverse',
      marginBottom: 100
    },
  },
  body: {
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '70%',
    },
  },
  imgContainer: {
    width: '50%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '30%',
    },
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: 35,
    },
  },
  securityImg: {
    width: 500,
    height: 500,
    [theme.breakpoints.down('sm')]: {
      width: 200,
      height: 200,
    },
  }
}))

export default AboutPage