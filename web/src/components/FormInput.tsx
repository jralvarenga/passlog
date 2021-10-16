import { InputAdornment, TextField, Theme, useTheme, Box } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { ReactElement } from 'react'

interface FormInputProps {
  label: string
  value: string
  setValue: Function
  placeholder?: string | null
  width?: string | number,
  icon?: ReactElement
  multiline?: boolean
  rows?: number
  secureEntry?: boolean
  children?: any
  selectInput?: boolean
  onKeyDown?: Function
}

const FormInput = ({ label, value, setValue, placeholder, width, icon, multiline, rows, secureEntry, selectInput, onKeyDown, children }: FormInputProps) => {
  const styles = styleSheet()
  const theme = useTheme()
  
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: width ? width : '100%',
      }}
    >
      {icon && (
        icon
      )}
      <TextField
        label={label}
        type={secureEntry ? "password" : "text"}
        variant="filled"
        value={value}
        multiline={multiline}
        rows={rows ? rows : 1}
        // @ts-ignore
        onKeyDown={onKeyDown ? onKeyDown : () => { return }}
        style={{
          width: '100%',
          marginLeft: icon ? 10 : 0,
          [theme.breakpoints.down('sm')]: {
            marginLeft: icon ? 5 : 0,
          },
        }}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder ? placeholder : ""}
        inputProps={{
          className: multiline ? styles.textarea : styles.input,
        }}
        InputLabelProps={{
          className: styles.label,
        }}
        InputProps={{
          classes: {
            underline: styles.underline,
          },
          disableUnderline: true
        }}
        select={selectInput}
        children={children}
      />
    </Box>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  input: {
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    borderRadius: theme.shape.borderRadius
  },
  textarea: {
    fontSize: 14,
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    borderRadius: theme.shape.borderRadius
  },
  label: {
    textTransform: 'none',
    fontSize: 14,
    color: theme.palette.text.secondary
  },
  underline: {
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
  }
}))

export default FormInput