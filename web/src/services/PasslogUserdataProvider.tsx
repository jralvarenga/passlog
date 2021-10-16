import { User } from '@firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { CardProps, NoteProps, PasslogUserDataProps, PasswordProps, SettingsProps, UserSettingsProps } from '../interfaces/interfaces'
import { returnCurrentUser } from '../lib/auth'
import { getCardsFromLocalStorage, getNotesFromLocalStorage, getPasswordsFromLocalStorage, getSettings, getUserSettings } from '../lib/localStorage'

const PasslogUserDataContext = createContext({})

export const PasslogUserDataProvider = ({ children }: any) => {
  const [dataLoading, setDataLoading] = useState(true)
  const [renderPasslogData, setRenderPasslogData] = useState(0)
  const [passwords, setPasswords] = useState<PasswordProps[]>([])
  const [selectedPasslogItem, setSelectedPasslogItem] = useState<PasswordProps | CardProps | NoteProps | null>(null)
  const [cards, setCards] = useState<CardProps[]>([])
  const [notes, setNotes] = useState<NoteProps[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [settings, setSettings] = useState<SettingsProps>({})
  const [userSettings, setUserSettings] = useState<UserSettingsProps | null>(null)

  const getData = async() => {
    const user = returnCurrentUser()
    setUser(user)
    let passwords: PasswordProps[] = getPasswordsFromLocalStorage()
    let cards: CardProps[] = getCardsFromLocalStorage()
    let notes: NoteProps[] = getNotesFromLocalStorage()
    let settings: SettingsProps = getSettings()
    setPasswords(passwords)
    setCards(cards)
    setNotes(notes)
    setSettings(settings)
    setDataLoading(false)
    if (user) {
      const userSettings = getUserSettings()
      setUserSettings(userSettings)
      /*if (userSettings.alwaysSync) {
        const { firestorePasswords, firestoreCards, firestoreNotes } = await getPasslogUserDataInFirestore()
        await setPasswordsInStorage(firestorePasswords)
        await setCardsInStorage(firestoreCards)
        await setNotesInStorage(firestoreNotes)
        passwords = firestorePasswords
        cards = firestoreCards
        notes = firestoreNotes
      }*/
    }
  }

  useEffect(() => {
    const asyncHandler = async() => {
      await getData()
    }

    asyncHandler()
  }, [renderPasslogData])

  const renderPasslogDataHandler = () => {
    setRenderPasslogData(renderPasslogData + 1)
  }

  return (
    <PasslogUserDataContext.Provider
      value={{
        passwords,
        setPasswords,
        selectedPasslogItem,
        setSelectedPasslogItem,
        cards,
        setCards,
        renderPasslogDataHandler,
        settings,
        setSettings,
        user,
        setUser,
        userSettings,
        setUserSettings,
        dataLoading,
        setDataLoading,
        notes,
        setNotes
      }}>
      {children}
    </PasslogUserDataContext.Provider>
  )
}

export const usePasslogUserData = (): PasslogUserDataProps => useContext(PasslogUserDataContext)