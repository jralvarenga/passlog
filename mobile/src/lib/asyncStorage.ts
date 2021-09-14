import AsyncStorage from '@react-native-async-storage/async-storage'
import { CardProps, NoteProps, PasswordProps, SettingsProps, UserSettingsProps } from '../interface/interfaces'
import { decryptCard, decryptNote, decryptPassword, decryptString, encryptCard, encryptNote, encryptPassword } from './encripter'

// Get methods

export const getPasswordsFromStorage = async(): Promise<PasswordProps[]> => {
  const jsonPasswords = await AsyncStorage.getItem('profiles')
  let passwords: PasswordProps[] = jsonPasswords != null ? JSON.parse(jsonPasswords) : []
  
  passwords = passwords.map((password) => {
    const decrypted: PasswordProps = decryptPassword(password)
    return decrypted
  })

  return passwords
}

export const getCardsFromStorage = async(): Promise<CardProps[]> => {
  const jsonCards = await AsyncStorage.getItem('cards')
  let cards: CardProps[] = jsonCards != null ? JSON.parse(jsonCards) : []

  cards = cards.map((card) => {
    const decrypted: CardProps = decryptCard(card)
    return decrypted
  })

  return cards
}

export const getNotesFromStorage = async(): Promise<NoteProps[]> => {
  const jsonCards = await AsyncStorage.getItem('notes')
  let notes: NoteProps[] = jsonCards != null ? JSON.parse(jsonCards) : []

  notes = notes.map((note) => {
    const decrypted: NoteProps = decryptNote(note)
    return decrypted
  })

  return notes
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

export const getUserSettings = async(): Promise<UserSettingsProps> => {
  const jsonSettings = await AsyncStorage.getItem('user')
  const settings: UserSettingsProps = JSON.parse(jsonSettings!)

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

export const setNotesInStorage = async(notes: NoteProps[]) => {
  notes = notes.map((note) => encryptNote(note))
  const jsonValue = JSON.stringify(notes)
  await AsyncStorage.setItem('notes', jsonValue)
}

export const setSettingsInStorage = async(settings: SettingsProps) => {
  const jsonValue = JSON.stringify(settings)
  await AsyncStorage.setItem('settings', jsonValue)
}

export const setUserSettings = async(settings: UserSettingsProps) => {
  const jsonValue = JSON.stringify(settings)
  await AsyncStorage.setItem('user', jsonValue)
}

// Delete methods

export const removeUserSettings = async() => {
  await AsyncStorage.removeItem('user')
}

export const wipeAllStorageData = async() => {
  await AsyncStorage.multiRemove(['user', 'settings', 'cards', 'notes', 'profiles'])
}