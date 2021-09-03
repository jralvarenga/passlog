import { DarkTheme as NavigationDarkTheme, Theme as NavigationThemeProps } from '@react-navigation/native';

export const darkTheme: NavigationThemeProps = {
  ...NavigationDarkTheme,
  dark: true,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: 'rgb(242, 75, 122)',
    background: 'rgb(20, 20, 20)',
    card: 'rgb(50, 50, 50)',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(20, 20, 20)',
    notification: 'rgb(242, 75, 122)',

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
    buttonStyle: {
      borderRadius: 10,
      backgroundColor: darkTheme.colors.primary
    }
  }
}