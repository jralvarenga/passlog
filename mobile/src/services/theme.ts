import { DarkTheme as NavigationDarkTheme, Theme as NavigationThemeProps } from '@react-navigation/native';

export const darkTheme: NavigationThemeProps = {
  ...NavigationDarkTheme,
  dark: true,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: 'rgb(79, 198, 219)',
    background: 'rgb(20, 20, 20)',
    card: 'rgb(50, 50, 50)',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(20, 20, 20)',
    notification: 'rgb(79, 198, 219)',

  },
}

export const darkElementsTheme = {
  Text: {
    style: {
      color: darkTheme.colors.text,
      fontSize: 16,
      fontFamily: 'inter-regular'
    }
  },
  Button: {
    buttonStyle: {
      borderRadius: 10,
      backgroundColor: darkTheme.colors.primary
    }
  }
}