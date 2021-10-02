import { Theme, useTheme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { useState } from 'react'
import PasswordContainer from '../components/PasswordContainer'
import SearchBar from '../components/SearchBar'
import TopBar from '../components/TopBar'
import { usePasslogUserData } from '../services/PasslogUserdataProvider'

const PasswordsPage = () => {
  const styles = styleSheet()
  const theme = useTheme()
  const { passwords, setPasswords } = usePasslogUserData()
  console.log(passwords)
  const [searchInput, setSearchInput] = useState("")

  const updateSearchInput = (e: any) => {
    const text = e.target.value
    setSearchInput(text)
  }

  return (
    <div className={styles.container}>
      <TopBar title="Passwords" />
      <div className={styles.body}>
        <div className={styles.searchBarContainer}>
          <SearchBar
            type="password"
            value={searchInput}            
            setValue={updateSearchInput}
          />
        </div>
        <div className={styles.passwordsContainer}>
          {passwords?.map((password, i) => (
            <PasswordContainer
              key={i}
              password={password}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 20
  },
  body: {
    width: '100%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 20,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 30,
    },
  },
  searchBarContainer: {
    width: '100%',
    maxWidth: 300,
    height: '10%',
    marginTop: 5,
    marginBottom: 15,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  passwordsContainer: {
    width: '100%',
    height: '90%',
    overflowY: 'scroll',
    overflowX: 'hidden',
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: -10,
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      marginLeft: 0,
    },
  }
}))

export default PasswordsPage