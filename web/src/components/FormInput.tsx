import { TextField, Theme, useTheme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'

interface FormInputProps {
  label: string
  value: string
  setValue: Function
  placeholder?: string | null
  width?: string | number
}

const FormInput = ({ label, value, setValue, placeholder, width }: FormInputProps) => {
  const styles = styleSheet()
  const theme = useTheme()
  
  return (
    <TextField
      label={label}
      variant="filled"
      value={value}
      style={{ width: width ? width : '100%' }}
      onChange={(value) => setValue(value)}
      placeholder={placeholder ? placeholder : ""}
      inputProps={{
        className: styles.input,
      }}
      InputLabelProps={{
        className: styles.label
      }}
      InputProps={{
        classes: {
          underline: styles.underline
        }
      }}
    />
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  input: {
    textTransform: 'none',
    fontSize: 14,
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
    borderBottomRightRadius: theme.shape.borderRadius
  }
}))

export default FormInput