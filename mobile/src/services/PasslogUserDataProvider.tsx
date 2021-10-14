import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react'
import { CardProps, NoteProps, PasslogUserDataProps, PasswordProps, SettingsProps, UserSettingsProps } from '../interface/interfaces'
import { getCardsFromStorage, getNotesFromStorage, getPasswordsFromStorage, getSettings, getUserSettings, setCardsInStorage, setNotesInStorage, setPasswordsInStorage } from '../lib/asyncStorage'
import { returnCurrentUser } from '../lib/auth'
import { getPasslogUserDataInFirestore } from '../lib/firestore'
import SplashScreen from 'react-native-bootsplash'

interface PasslogUserDataProviderProps {
  children: ReactElement
}

const PasslogUserDataContext = createContext({})

export const PasslogUserDataProvider = ({ children }: PasslogUserDataProviderProps) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  const [passwords, setPasswords] = useState<PasswordProps[]>([])
  const [cards, setCards] = useState<CardProps[]>([])
  const [notes, setNotes] = useState<NoteProps[]>([])
  const [settings, setSettings] = useState<SettingsProps>({})
  const [userSettings, setUserSettings] = useState<UserSettingsProps | null>(null)
  const [dataLoading, setDataLoading] = useState(true)

  const hideSplashScreen = () => {
    SplashScreen.hide({
      fade: true
    })
  }

  const getFromStorage = async() => {
    const passwords: PasswordProps[] = await getPasswordsFromStorage()
    const cards: CardProps[] = await getCardsFromStorage()
    const notes: NoteProps[] = await getNotesFromStorage()
    const settings: SettingsProps = await getSettings()
    setPasswords(passwords)
    setCards(cards)
    setNotes(notes)
    setSettings(settings)
  }

  const getFromFirebase = async() => {
    const { firestorePasswords, firestoreCards, firestoreNotes } = await getPasslogUserDataInFirestore()
    await setPasswordsInStorage(firestorePasswords)
    await setCardsInStorage(firestoreCards)
    await setNotesInStorage(firestoreNotes)
    setPasswords(firestorePasswords)
    setCards(firestoreCards)
    setNotes(firestoreNotes)
  }

  const getData = async() => {
    const user = returnCurrentUser()
    setUser(user)
    await getFromStorage()
    
    setDataLoading(false)
    hideSplashScreen()
    if (user) {
      const userSettings = await getUserSettings()
      setUserSettings(userSettings)
      if (userSettings.alwaysSync) {
        getFromFirebase()
      }
    }
  }

  useEffect(() => {
    const asyncHandler = async() => {
      await getData()
    }

    asyncHandler()
  }, [])

  const renderPasslogDataHandler = async() => {
    await getFromStorage()
  }

  return (
    <PasslogUserDataContext.Provider
      value={{
        passwords,
        setPasswords,
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