import { MenuItem, Theme, useTheme } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { createStyles, makeStyles } from '@mui/styles'
import FormInput from '../../src/components/FormInput'
import Header from '../../src/components/Header'
import HeaderNavigationBar, { HEADERBAR_HEIGHT } from '../../src/components/HeaderNavigationBar'
import { AccountCircle as AccountCircleIcon, MoreHoriz as NumberIcon } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { CardProps } from '../../src/interfaces/interfaces'
import { createId } from '../../src/lib/createId'
import { useRouter } from 'next/router'
import PageLayout from '../../src/components/PageLayout'

const CreateCardPage = () => {
  const styles = styleSheet()
  const theme = useTheme()
  const router = useRouter()
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [holder, setHolder] = useState("")
  const [number, setNumber] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const { query } = router
    const gnp: any = query.gnp
    setNumber(gnp)
  }, [router])

  const createCard = () => {
    setLoading(true)
    const currentDate = new Date()
    currentDate.setMinutes(currentDate.getMinutes() + currentDate.getTimezoneOffset())
    const newCard: CardProps = {
      id: createId(),
      type: type,
      cardName: name,
      holder: holder,
      number: number,
      addedInfo: "",
      date: `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`
    }
    console.log(newCard)
    setLoading(false)
    router.back()
  }

  return (
    <PageLayout className={styles.container}>
      <Header
        name="Create Card"
      />
      <HeaderNavigationBar
        title="Create Card"
      />
      <div className={styles.body}>
        <div className={styles.inputsContainer}>
          <div
            className={styles.inputBox}
            style={{ justifyContent: 'space-between' }}
          >
            <FormInput
              label="Card name"
              placeholder="Name"
              width="48%"
              value={name}
              setValue={setName}
              icon={
                <AccountCircleIcon
                  style={{
                    color: theme.palette.background.paper
                  }}
                />
              }
            />
            <FormInput
              placeholder="Steve Adonis Dolphin"
              label="Card type"
              width="48%"
              value={type}
              setValue={setType}
              selectInput
            >
              <MenuItem value="" disabled>Select type</MenuItem>
              <MenuItem value="ID">ID</MenuItem>
              <MenuItem value="Pay card">Pay card</MenuItem>
              <MenuItem value="Licence">Licence</MenuItem>
              <MenuItem value="Promo code">Promo code</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </FormInput>
          </div>
          <div className={styles.inputBox}>
            <FormInput
              label="The holder"
              placeholder="Steve Adonis Dolphin"
              value={holder}
              setValue={setHolder}
              icon={
                <AccountCircleIcon
                  style={{
                    color: theme.palette.background.paper
                  }}
                />
              }
            />
          </div>
          <div className={styles.inputBox}>
            <FormInput
              label="The numbers"
              placeholder="***********7882"
              value={number}
              setValue={setNumber}
              icon={
                <NumberIcon
                  style={{
                    color: theme.palette.background.paper
                  }}
                />
              }
            />
          </div>
        </div>
        <div className={styles.createButtonContainer}>
          <LoadingButton
            className={styles.createButton}
            onClick={createCard}
            variant="contained"
            loading={loading}
          >
            Create card
          </LoadingButton>
        </div>
      </div>
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
    padding: 20
  },
  inputsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 5,
  },
  inputBox: {
    width: '100%',
    marginBottom: 30,
    display: 'flex',
    alignItems: 'center'
  },
  createButtonContainer: {
    width: '100%',
    flex: 0.7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  createButton: {
    fontSize: 16,
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
    textTransform: 'none',
    marginLeft: 5,
    marginRight: 5,
  },
}))

export default CreateCardPage