import { ReactElement } from 'react'
import { Button, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'

interface EmptyDataDivProps {
  text: string
  buttonFunction: Function
  children: ReactElement
}

const EmptyDataDiv = ({ text, buttonFunction, children }: EmptyDataDivProps) => {
  const styles = styleSheet()

  return (
    <div className={styles.container}>
      <div>
        {children}
      </div>
      <span className={styles.text}>
        {text}
      </span>
      <br />
      <div className={styles.buttonContainer}>
        {/* @ts-ignore */}
        <Button
          className={styles.createButton}
          onClick={buttonFunction}
          variant="contained"
        >
          Create one here
        </Button>
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
    alignItems: 'center'
  },
  text: {
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  createButton: {
    width: '50%',
    fontSize: 16,
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
    textTransform: 'none',
    marginLeft: 5,
    marginRight: 5,
  },
  buttonContainer:{
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}))

export default EmptyDataDiv