import { DarkTheme, Theme as ThemeProps } from '@react-navigation/native';

export const darkTheme: ThemeProps = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(79, 198, 219)',
    background: 'rgb(20, 20, 20)',
    card: 'rgb(50, 50, 50)',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(20, 20, 20)',
    notification: 'rgb(79, 198, 219)',

  }
}