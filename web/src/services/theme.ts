import { createTheme } from '@mui/material'

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: 'rgb(142, 68, 173)'
    },
    secondary: {
      main: 'rgb(142, 68, 173)'
    },
    background: {
      default: 'rgb(20, 20, 20)',
      paper: 'rgb(50, 50, 50)'
    },
    error: {
      main: '#ff2e2e'
    },
    text: {
      primary: 'rgb(255, 255, 255)',
      secondary: 'rgb(200, 200, 200)'
    }
  },
  shape: {
    borderRadius: 10
  },
  typography: {
    fontFamily: 'poppins',
    fontSize: 16,
  }
}) 