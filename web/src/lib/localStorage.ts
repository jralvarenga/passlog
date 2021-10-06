import { CardProps, NoteProps, PasswordProps } from '../interfaces/interfaces'
import { decryptCard, decryptNote, decryptPassword } from './encripter'

const asyncLocalStorage = {
  setItem: async (key: string, value: string) => {
    await Promise.resolve()
    localStorage.setItem(key, value)
  },
  getItem: async (key: string) => {
    await Promise.resolve()
    localStorage.getItem(key)
  },
  removeItem: async (key: string) => {
    await Promise.resolve()
    localStorage.removeItem(key)
  },
  clearAll: async () => {
    await Promise.resolve()
    localStorage.clear()
  },
}

export const getPasswordsFromLocalStorage = async(): Promise<PasswordProps[]> => {
  const jsonPasswords = await asyncLocalStorage.getItem('passwords')
  let passwords: PasswordProps[] = jsonPasswords != null ? JSON.parse(jsonPasswords) : []
  
  passwords = passwords.map((password) => {
    const decrypted: PasswordProps = decryptPassword(password)
    return decrypted
  })

  return passwords
}

export const getCardsFromLocalStorage = async(): Promise<CardProps[]> => {
  const jsonCards = await asyncLocalStorage.getItem('cards')
  let cards: CardProps[] = jsonCards != null ? JSON.parse(jsonCards) : []

  cards = cards.map((card) => {
    const decrypted: CardProps = decryptCard(card)
    return decrypted
  })

  return cards
}

export const getNotesFromLocalStorage = async(): Promise<NoteProps[]> => {
  const jsonCards = await asyncLocalStorage.getItem('notes')
  let notes: NoteProps[] = jsonCards != null ? JSON.parse(jsonCards) : []

  notes = notes.map((note) => {
    const decrypted: NoteProps = decryptNote(note)
    return decrypted
  })

  return notes
}

/*export const getSettings = async(): Promise<SettingsProps> => {
  const jsonSettings = await asyncLocalStorage.getItem('settings')
  const settings: SettingsProps = jsonSettings != null ? JSON.parse(jsonSettings) : {
    pinNumber: '',
    useBiometrics: false,
    usePin: false,
    askForAlwaysSync: false,
    firstTime: true
  }

  return settings
}

export const getUserSettings = async(): Promise<UserSettingsProps> => {
  const jsonSettings = await asyncLocalStorage.getItem('user')
  const settings: UserSettingsProps = JSON.parse(jsonSettings!)

  return settings
}*/