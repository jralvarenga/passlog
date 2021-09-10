import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react'
import { CardProps, PasslogUserDataProps, PasswordProps, SettingsProps } from '../interface/interfaces'
import { getCardsFromStorage, getPasswordsFromStorage, getSettings } from '../lib/asyncStorage'
import { returnCurrentUser } from '../lib/firebase'

interface PasslogUserDataProviderProps {
  children: ReactElement
}

const PasslogUserDataContext = createContext({})

export const PasslogUserDataProvider = ({ children }: PasslogUserDataProviderProps) => {
  const [renderPasslogData, setRenderPasslogData] = useState(0)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  const [passwords, setPasswords] = useState<PasswordProps[]>([])
  const [cards, setCards] = useState<CardProps[]>([])
  const [settings, setSettings] = useState<SettingsProps>({})

  const getData = async() => {
    const user = returnCurrentUser()
    setUser(user)
    const passwords: PasswordProps[] = await getPasswordsFromStorage()
    const cards: CardProps[] = await getCardsFromStorage()
    const settings: SettingsProps = await getSettings()
    setPasswords(passwords)
    setCards(cards)
    setSettings(settings)
  }

  useEffect(() => {
    getData()
  }, [renderPasslogData])

  const renderPasslogDataHandler = () => {
    setRenderPasslogData(renderPasslogData + 1)
  }

  return (
    <PasslogUserDataContext.Provider value={{ passwords, setPasswords, cards, setCards, renderPasslogDataHandler, settings, setSettings, user, setUser }}>
      {children}
    </PasslogUserDataContext.Provider>
  )
}

export const usePasslogUserData = (): PasslogUserDataProps => useContext(PasslogUserDataContext)