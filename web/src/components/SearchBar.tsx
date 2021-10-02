import { Button, Theme, useTheme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'

interface SearchBarProps {
  type: 'password' | 'card' | 'note',
  value: string
  setValue: Function
}

const SearchBar = ({ type, value, setValue }: SearchBarProps) => {
  const styles = styleSheet()
  const theme = useTheme()

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(value) => setValue(value)}
        placeholder={`Search ${type}...`}
      />
      {type == 'password' && (
        <Button
          variant="contained"
          className={styles.generateButton}
        >
          Generate
        </Button>
      )}
    </div>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    width: '100%',
    height: '85%',
    borderRadius: 10,
    border: '0px',
    backgroundColor: theme.palette.background.paper,
    paddingLeft: 10,
    [theme.breakpoints.down('sm')]: {
      height: '100%',
    },
  },
  generateButton: {
    fontSize: 14,
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
    textTransform: 'none',
    marginLeft: 5,
    marginRight: 5,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
}))

export default SearchBar