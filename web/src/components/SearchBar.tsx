import { Button, Theme, useTheme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import FormInput from './FormInput'
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  type: 'password' | 'card' | 'note',
  value: string
  setValue: Function
  buttonFunction?: any
}

const SearchBar = ({ type, value, setValue, buttonFunction }: SearchBarProps) => {
  const styles = styleSheet()
  const theme = useTheme()

  return (
    <div className={styles.container}>
      <FormInput
        label={`Search ${type}...`}
        value={value}
        setValue={setValue}
      />
      {type == 'password' && (
        <Button
          variant="contained"
          onClick={buttonFunction}
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
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between'
    },
  },
  generateButton: {
    fontSize: 14,
    height: '90%',
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
    textTransform: 'none',
    marginLeft: 7,
  },
}))

export default SearchBar