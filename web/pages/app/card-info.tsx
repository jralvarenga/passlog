import { Theme, useTheme, IconButton  } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { useEffect, useState } from 'react'
import HeaderNavigationBar, { HEADERBAR_HEIGHT } from '../../src/components/HeaderNavigationBar'
import PageLayout from '../../src/components/PageLayout'
import { CardProps } from '../../src/interfaces/interfaces'
import { usePasslogUserData } from '../../src/services/PasslogUserdataProvider'
import {Mail as EmailIcon, Lock as CardIcon, FileCopy as ContentCopyIcon, Menu as MenuIcon } from '@mui/icons-material'
import copy from 'copy-to-clipboard'
import AppSnackbar from '../../src/components/AppSnackbar'
import Header from '../../src/components/Header'

const CardInfoPage = () => {
  const styles = styleSheet()
  const theme = useTheme()
  const { selectedPasslogItem } = usePasslogUserData()
  const [card, setCard] = useState<CardProps>()
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")

  useEffect(() => {
    // @ts-ignore
    setCard(selectedPasslogItem)
  }, [selectedPasslogItem])

  const copyToClipboard = (type: 'Numbers' | 'Holder') => {
    if (type == 'Holder') {
      copy(card!.holder)
      setSnackbarMessage("Holder copied!")
      setOpenSnackbar(true)
    } else {
      copy(card!.number)
      setSnackbarMessage("Numbers copied!")
      setOpenSnackbar(true)
    }
  }

  return (
    <PageLayout className={styles.container}>
      <Header
        name="Card info"
      />
      <HeaderNavigationBar
        title={card?.cardName ? card!.cardName : ""}
        showIcon
        icon={<MenuIcon style={{ color: theme.palette.text.primary }} />}
        iconFunction={() => console.log('hi man')}
      />
      <div className={styles.body}>
        <span style={{ fontSize: 14 }}>
          Card of {card?.type ? card!.type : ""}
        </span>
        <div className={styles.cardInfoContainer}>
          <div className={styles.cardInfoBox}>
            <div style={{ display: 'flex', alignItems: 'center', width: '85%' }}>
              <EmailIcon
                style={{ marginRight: 5 }}
              />
              <span
                onClick={() => copyToClipboard('Holder')}
                className={styles.emailCardSpan}
              >
                {card?.holder ? card!.holder : ""}
              </span>
            </div>
            <IconButton
              onClick={() => copyToClipboard('Holder')}
              style={{ backgroundColor: theme.palette.background.paper }}
            >
              <ContentCopyIcon style={{ color: theme.palette.text.primary, fontSize: 25 }} />
            </IconButton>
          </div>
          <div className={styles.cardInfoBox}>
            <div style={{ display: 'flex', alignItems: 'center', width: '85%' }}>
              <CardIcon
                style={{ marginRight: 5 }}
              />
              <span
                onClick={() => copyToClipboard('Numbers')}
                className={styles.emailCardSpan}
              >
                {card?.number ? card!.number : ""}
              </span>
            </div>
            <IconButton
              onClick={() => copyToClipboard('Numbers')}
              style={{ backgroundColor: theme.palette.background.paper }}
            >
              <ContentCopyIcon style={{ color: theme.palette.text.primary, fontSize: 25 }} />
            </IconButton>
          </div>
          <span style={{ marginTop: 15, fontSize: 14 }}>
            Last update on {card?.date ? card!.date : ""}
          </span>
        </div>
      </div>
      <AppSnackbar
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        message={snackbarMessage}
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
  body: {
    width: '100%',
    height: `calc(100% - ${HEADERBAR_HEIGHT})`,
    maxWidth: 800,
    display: 'flex',
    flexDirection: 'column',
    padding: 15
  },
  cardInfoContainer: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  cardInfoBox: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5
  },
  emailCardSpan: {
    fontSize: 16,
    padding: 10,
    width: '100%',
    cursor: 'pointer',
    borderRadius: 10,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14
    },
  },
}))

export default CardInfoPage