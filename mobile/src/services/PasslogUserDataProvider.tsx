import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react'
import { CardProps, PasslogUserDataProps, PasswordProps, SettingsProps, UserSettingsProps } from '../interface/interfaces'
import { getCardsFromStorage, getPasswordsFromStorage, getSettings, getUserSettings } from '../lib/asyncStorage'
import { returnCurrentUser } from '../lib/auth'

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
  const [userSettings, setUserSettings] = useState<UserSettingsProps | null>(null)

  const getData = async() => {
    const user = returnCurrentUser()
    setUser(user)
    const passwords: PasswordProps[] = await getPasswordsFromStorage()
    const cards: CardProps[] = await getCardsFromStorage()
    const settings: SettingsProps = await getSettings()
    if (user) {
      const userSettings = await getUserSettings()
      console.log(userSettings)
      setUserSettings(userSettings)
    }
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
    <PasslogUserDataContext.Provider value={{ passwords, setPasswords, cards, setCards, renderPasslogDataHandler, settings, setSettings, user, setUser, userSettings, setUserSettings }}>
      {children}
    </PasslogUserDataContext.Provider>
  )
}

export const usePasslogUserData = (): PasslogUserDataProps => useContext(PasslogUserDataContext)