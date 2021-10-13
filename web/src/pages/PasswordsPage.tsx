import { Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { useState } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import GeneratePasswordSheet from '../components/GeneratePasswordSheet'
import PasswordContainer from '../components/PasswordContainer'
import SearchBar from '../components/SearchBar'
import TopBar, { TOPBAR_HEIGHT, TOPBAR_HEIGHT_MOBILE } from '../components/TopBar'
import { usePasslogUserData } from '../services/PasslogUserdataProvider'
import lockedAnimation from '../assets/animations/locked.json'
import EmptyDataDiv from '../components/EmptyDataDiv'
import { useRouter } from 'next/router'
import { PasswordProps } from '../interfaces/interfaces'

const PasswordsPage = () => {
  const styles = styleSheet()
  const { passwords, setPasswords } = usePasslogUserData()
  const router = useRouter()
  const [searchInput, setSearchInput] = useState("")
  const [showGeneratePassword, setShowGeneratePassword] = useState(false)

  const sortedPasswords = passwords?.sort((a: PasswordProps, b: PasswordProps) => {
    if (a.profileName > b.profileName) {
      return 1
    }
    if (a.profileName < b.profileName) {
      return -1
    }
    return 0
  })

  const filteredPasswords = sortedPasswords?.filter((password: PasswordProps) =>
    password.profileName.toLowerCase().includes(searchInput.toLowerCase()) ||
    password.email.toLowerCase().includes(searchInput.toLowerCase()) ||
    password.user.toLowerCase().includes(searchInput.toLowerCase())
  )

  return (
    <div className={styles.container}>
      <TopBar title="Passwords" />
      <div className={styles.body}>
        <div className={styles.searchBarContainer}>
          <SearchBar
            type="password"
            value={searchInput}            
            setValue={setSearchInput}
            buttonFunction={() => setShowGeneratePassword(true)}
          />
        </div>
        {passwords?.length != 0 ? (
          <div className={styles.passwordsContainer}>
            {filteredPasswords?.map((password, i) => (
              <PasswordContainer
                key={i}
                password={password}
              />
            ))}
          </div>
        ) : (
          <EmptyDataDiv
            text="Start adding your passwords and keep them safe here"
            buttonFunction={() => router.push('/app/create-password')}
          >
            <Player
              autoplay
              keepLastFrame
              src={lockedAnimation}
              className={styles.animationContainer}
            />
          </EmptyDataDiv>
        )}
      </div>
      <GeneratePasswordSheet
        open={showGeneratePassword}
        setOpen={setShowGeneratePassword}
      />
    </div>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  body: {
    width: '100%',
    height: `calc(100% - ${TOPBAR_HEIGHT})`,
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 20, 
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: 10, 
      height: `calc(100% - ${TOPBAR_HEIGHT_MOBILE})`,
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
    marginLeft: -10,
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'wrap',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      marginLeft: 0,
    },
  },
  animationContainer: {
    width: 250,
    height: 250,
  }
}))

export default PasswordsPage