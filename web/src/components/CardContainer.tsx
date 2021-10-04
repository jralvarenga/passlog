import { Theme, useTheme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { CardProps } from '../interfaces/interfaces'

interface CardContainerProps {
  card: CardProps
}

const CardContainer = ({ card }: CardContainerProps) => {
  const styles = styleSheet()
  const theme = useTheme()

  return (
    <div className={styles.container}>
      <div className={styles.cardTitleContainer}>
        <span className={styles.cardName}>
          {card.cardName}
        </span>
        <span style={{ color: theme.palette.text.secondary, fontSize: 14 }}>
          {card.type}
        </span>
      </div>
      <div className={styles.cardEmailContainer}>
        <span className={styles.cardEmail}>
          {card.holder}
        </span>
      </div>
    </div>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: 250,
    height: 130,
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.background.paper,
    cursor: 'pointer',
    margin: 10,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: 0,
      marginTop: 10,
      marginBottom: 10
    },
  },
  cardTitleContainer: {
    width: '100%',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  cardEmailContainer: {
    width: '100%',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  cardName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardEmail: {
    fontSize: 12,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  }
}))

export default CardContainer