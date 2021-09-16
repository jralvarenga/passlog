import { DarkTheme as NavigationDarkTheme, Theme as NavigationThemeProps } from '@react-navigation/native';

interface TransitionColors {
  color: string,
  fontColor: string
}

export const darkTheme: NavigationThemeProps = {
  ...NavigationDarkTheme,
  dark: true,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: 'rgb(142, 68, 173)',
    background: 'rgb(20, 20, 20)',
    card: 'rgb(50, 50, 50)',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(20, 20, 20)',
    notification: 'rgb(142, 68, 173)',

  },
}

export const darkElementsTheme = {
  Text: {
    style: {
      color: darkTheme.colors.text,
      fontSize: 16,
    }
  },
  Button: {
    containerStyle: {
      borderRadius: 15,
    },
    buttonStyle: {
      borderRadius: 15,
      backgroundColor: darkTheme.colors.primary
    }
  }
}