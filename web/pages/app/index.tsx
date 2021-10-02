import { useState } from 'react'
import { Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import NavBar from '../../src/components/NavBar'
import AppBody from '../../src/components/AppBody'
import Header from '../../src/components/Header'

const AppIndex = () => {
  const styles = styleSheet()
  const [index, setIndex] = useState(0)

  return (
    <div className={styles.container}>
      <Header name="Web App"  />
      <NavBar
        index={index}
        setIndex={setIndex}
      />
      <AppBody
        index={index}
        setIndex={setIndex}
      />
    </div>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse'
    },
  }
}))

export default AppIndex