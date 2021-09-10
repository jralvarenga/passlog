import AsyncStorage from '@react-native-async-storage/async-storage'
import { CardProps, PasswordProps, SettingsProps } from '../interface/interfaces'
import { decryptString, encryptCard, encryptPassword } from './encripter'

// Get methods

export const getPasswordsFromStorage = async(): Promise<PasswordProps[]> => {
  const jsonPasswords = await AsyncStorage.getItem('profiles')
  let passwords: PasswordProps[] = jsonPasswords != null ? JSON.parse(jsonPasswords) : []
  
  passwords = passwords.map((password) => {
    const decrypted: PasswordProps = {
      id: password.id,
      profileName: decryptString(password.profileName),
      user: decryptString(password.user),
      email: decryptString(password.email),
      password: decryptString(password.password),
      comments: decryptString(password.comments),
      date: password.date
    }
    return decrypted
  })

  return passwords
}

export const getCardsFromStorage = async(): Promise<CardProps[]> => {
  const jsonCards = await AsyncStorage.getItem('cards')
  let cards: CardProps[] = jsonCards != null ? JSON.parse(jsonCards) : []

  cards = cards.map((card) => {
    const decrypted: CardProps = {
      id: card.id,
      cardName: decryptString(card.cardName),
      holder: decryptString(card.holder),
      number: decryptString(card.number),
      type: decryptString(card.type),
      addedInfo: decryptString(card.addedInfo),
      date: card.date
    }
    return decrypted
  })

  return cards
}

export const getSettings = async(): Promise<SettingsProps> => {
  const jsonSettings = await AsyncStorage.getItem('settings')
  const settings: SettingsProps = jsonSettings != null ? JSON.parse(jsonSettings) : {
    onStartSecurity: false,
    pinNumber: '',
    useBiometrics: false,
    usePin: false,
    biometricType: 'none'
  }

  return settings
}

// Set methods

export const setPasswordsInStorage = async(passwords: PasswordProps[]) => {
  passwords = passwords.map((password) => encryptPassword(password))
  const jsonValue = JSON.stringify(passwords)  
  await AsyncStorage.setItem('profiles', jsonValue)
}

export const setCardsInStorage = async(cards: CardProps[]) => {
  cards = cards.map((card) => encryptCard(card))
  const jsonValue = JSON.stringify(cards)
  await AsyncStorage.setItem('cards', jsonValue)
}

export const setSettingsInStorage = async(settings: SettingsProps) => {
  const jsonValue = JSON.stringify(settings)
  await AsyncStorage.setItem('settings', jsonValue)
}