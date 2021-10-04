import { Theme, useTheme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { useState } from 'react'
import CardContainer from '../components/CardContainer'
import GeneratePasswordSheet from '../components/GeneratePasswordSheet'
import SearchBar from '../components/SearchBar'
import TopBar from '../components/TopBar'
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
  cardsContainer: {
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

export default CardsPage