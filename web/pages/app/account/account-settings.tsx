import { Theme, useTheme  } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import Header from '../../../src/components/Header'
import HeaderNavigationBar from '../../../src/components/HeaderNavigationBar'
import PageLayout from '../../../src/components/PageLayout'
import { returnCurrentUser } from '../../../src/lib/auth'

const AccountSettings = () => {
  const styles = styleSheet()
  const theme = useTheme()
  const user = returnCurrentUser()

  return (
    <PageLayout className={styles.container}>
      <Header
        name="My Account"
      />
      <HeaderNavigationBar
        title={user!.displayName!}
      />
    </PageLayout>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
    maxWidth: 800,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
    },
  },
}))

export default AccountSettings