import { Alert, Snackbar, useTheme } from '@mui/material'

interface AppSnackbarProps {
  open: boolean
  setOpen: Function
  message: string
}

const AppSnackbar = ({ open, setOpen, message }: AppSnackbarProps) => {
  const theme = useTheme()

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={() => setOpen(false)}
      ContentProps={{
        style: {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.primary
        }
      }}
      sx={{ width: '95%' }}
      message={message}
    />
  )
}

export default AppSnackbar