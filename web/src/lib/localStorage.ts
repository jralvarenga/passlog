import { CardProps, NoteProps, PasswordProps, SettingsProps, UserSettingsProps } from '../interfaces/interfaces'
import { decryptCard, decryptNote, decryptPassword, encryptCard, encryptNote, encryptPassword } from './encripter'

// Get methods

export const getPasswordsFromLocalStorage = (): PasswordProps[] => {
  const jsonPasswords = localStorage.getItem('profiles')
  let passwords: PasswordProps[] = jsonPasswords != null ? JSON.parse(jsonPasswords) : []
  
  passwords = passwords.map((password) => {
    const decrypted: PasswordProps = decryptPassword(password)
    return decrypted
  })

  return passwords
}

export const getCardsFromLocalStorage = (): CardProps[] => {
  const jsonCards = localStorage.getItem('cards')
  let cards: CardProps[] = jsonCards != null ? JSON.parse(jsonCards) : []

  cards = cards.map((card) => {
    const decrypted: CardProps = decryptCard(card)
    return decrypted
  })

  return cards
}

export const getNotesFromLocalStorage = (): NoteProps[] => {
  const jsonCards = localStorage.getItem('notes')
  let notes: NoteProps[] = jsonCards != null ? JSON.parse(jsonCards) : []

  notes = notes.map((note) => {
    const decrypted: NoteProps = decryptNote(note)
    return decrypted
  })

  return notes
}

export const getSettings = (): SettingsProps => {
  const jsonSettings = localStorage.getItem('settings')
  const settings: SettingsProps = jsonSettings != null ? JSON.parse(jsonSettings) : {
    pinNumber: '',
    useBiometrics: false,
    usePin: false,
    askForAlwaysSync: false,
    firstTime: true
  }

  return settings
}

export const getUserSettings = (): UserSettingsProps => {
  const jsonSettings = localStorage.getItem('user')
  const settings: UserSettingsProps = JSON.parse(jsonSettings!)

  return settings
}

// Set methods

export const setPasswordsInLocalStorage = async(passwords: PasswordProps[]) => {
  passwords = passwords.map((password) => encryptPassword(password))
  const jsonValue = JSON.stringify(passwords)  
  localStorage.setItem('profiles', jsonValue)
}

export const setCardsInLocalStorage = async(cards: CardProps[]) => {
  cards = cards.map((card) => encryptCard(card))
  const jsonValue = JSON.stringify(cards)
  localStorage.setItem('cards', jsonValue)
}

export const setNotesInLocalStorage = async(notes: NoteProps[]) => {
  notes = notes.map((note) => encryptNote(note))
  const jsonValue = JSON.stringify(notes)
  localStorage.setItem('notes', jsonValue)
}

export const setSettingsInLocalStorage = async(settings: SettingsProps) => {
  const jsonValue = JSON.stringify(settings)
  localStorage.setItem('settings', jsonValue)
}

export const setUserSettings = async(settings: UserSettingsProps) => {
  const jsonValue = JSON.stringify(settings)
  localStorage.setItem('user', jsonValue)
}

// Delete methods

export const removeUserSettings = () => {
  localStorage.removeItem('user')
}

export const wipeAllStorageData = () => {
  localStorage.clear()
}