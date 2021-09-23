import { Theme, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { createStyles, makeStyles } from '@mui/styles'

const Home: NextPage = () => {
  const styles = styleSheet()

  return (
    <div className={styles.container}>
      <Typography>HI man</Typography>
    </div>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    backgroundColor: theme.palette.primary.main
  },
}))

export default Home
