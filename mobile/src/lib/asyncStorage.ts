import AsyncStorage from '@react-native-async-storage/async-storage'
import { CardProps, PasswordProps, SettingsProps } from '../interface/interfaces'

// Get methods

export const getPasswordsFromStorage = async(): Promise<PasswordProps[]> => {
  const jsonPasswords = await AsyncStorage.getItem('passwords')
  const passwords: PasswordProps[] = jsonPasswords != null ? JSON.parse(jsonPasswords) : []

  return passwords
}

export const getCardsFromStorage = async(): Promise<CardProps[]> => {
  const jsonCards = await AsyncStorage.getItem('cards')
  const cards: CardProps[] = jsonCards != null ? JSON.parse(jsonCards) : []

  return cards
}

export const getSettings = async(): Promise<SettingsProps> => {
  const jsonSettings = await AsyncStorage.getItem('settings')
  const settings: SettingsProps = jsonSettings != null ? JSON.parse(jsonSettings) : {}

  return settings
}

// Set methods

export const setPasswordsInStorage = async(passwords: PasswordProps[]) => {
  const jsonValue = JSON.stringify(passwords)
  await AsyncStorage.setItem('passwords', jsonValue)
}

export const setCardsInStorage = async(cards: CardProps[]) => {
  const jsonValue = JSON.stringify(cards)
  await AsyncStorage.setItem('cards', jsonValue)
}

export const setSettingsInStorage = async(settings: SettingsProps) => {
  const jsonValue = JSON.stringify(settings)
  await AsyncStorage.setItem('settings', jsonValue)
}