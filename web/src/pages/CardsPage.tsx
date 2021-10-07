import { Theme, useTheme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { useState } from 'react'
import CardContainer from '../components/CardContainer'
import GeneratePasswordSheet from '../components/GeneratePasswordSheet'
import SearchBar from '../components/SearchBar'
import TopBar, { TOPBAR_HEIGHT, TOPBAR_HEIGHT_MOBILE } from '../components/TopBar'
import { usePasslogUserData } from '../services/PasslogUserdataProvider'

const CardsPage = () => {
  const styles = styleSheet()
  const { cards, setCards } = usePasslogUserData()
  const [searchInput, setSearchInput] = useState("")
  const [showGeneratePassword, setShowGeneratePassword] = useState(false)

  return (
    <div className={styles.container}>
      <TopBar title="Cards" />
      <div className={styles.body}>
        <div className={styles.searchBarContainer}>
          <SearchBar
            type="card"
            value={searchInput}            
            setValue={setSearchInput}
            buttonFunction={() => setShowGeneratePassword(true)}
          />
        </div>
        <div className={styles.cardsContainer}>
          {cards?.map((card, i) => (
            <CardContainer
              key={i}
              card={card}
            />
          ))}
        </div>
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
  cardsContainer: {
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
  }
}))

export default CardsPage