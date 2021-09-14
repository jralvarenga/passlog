import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react'
import { CardProps, NoteProps, PasslogUserDataProps, PasswordProps, SettingsProps, UserSettingsProps } from '../interface/interfaces'
import { getCardsFromStorage, getNotesFromStorage, getPasswordsFromStorage, getSettings, getUserSettings, setCardsInStorage, setPasswordsInStorage } from '../lib/asyncStorage'
import { returnCurrentUser } from '../lib/auth'
import { getPasslogUserDataInFirestore } from '../lib/firestore'

interface PasslogUserDataProviderProps {
  children: ReactElement
}

const PasslogUserDataContext = createContext({})

export const PasslogUserDataProvider = ({ children }: PasslogUserDataProviderProps) => {
  const [renderPasslogData, setRenderPasslogData] = useState(0)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  const [passwords, setPasswords] = useState<PasswordProps[]>([])
  const [cards, setCards] = useState<CardProps[]>([])
  const [notes, setNotes] = useState<NoteProps[]>([])
  const [settings, setSettings] = useState<SettingsProps>({})
  const [userSettings, setUserSettings] = useState<UserSettingsProps | null>(null)
  const [dataLoading, setDataLoading] = useState(false)

  const getData = async() => {
    const user = returnCurrentUser()
    setUser(user)
    let passwords: PasswordProps[] = await getPasswordsFromStorage()
    let cards: CardProps[] = await getCardsFromStorage()
    let notes: NoteProps[] = await getNotesFromStorage()
    let settings: SettingsProps = await getSettings()
    if (user) {
      const userSettings = await getUserSettings()
      setUserSettings(userSettings)
      if (userSettings.alwaysSync) {
        const { firestorePasswords, firestoreCards } = await getPasslogUserDataInFirestore()
        await setPasswordsInStorage(firestorePasswords)
        await setCardsInStorage(firestoreCards)
        passwords = firestorePasswords
        cards = firestoreCards
      }
    }
    setPasswords(passwords)
    setCards(cards)
    setNotes(notes)
    setSettings(settings)
  }

  useEffect(() => {
    getData()
  }, [renderPasslogData])

  const renderPasslogDataHandler = () => {
    setRenderPasslogData(renderPasslogData + 1)
  }

  return (
    <PasslogUserDataContext.Provider value={{ passwords, setPasswords, cards, setCards, renderPasslogDataHandler, settings, setSettings, user, setUser, userSettings, setUserSettings, dataLoading, setDataLoading, notes, setNotes }}>
      {children}
    </PasslogUserDataContext.Provider>
  )
}

export const usePasslogUserData = (): PasslogUserDataProps => useContext(PasslogUserDataContext)