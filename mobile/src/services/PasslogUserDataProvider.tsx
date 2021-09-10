import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react'
import { CardProps, PasslogUserDataProps, PasswordProps, SettingsProps } from '../interface/interfaces'
import { getCardsFromStorage, getPasswordsFromStorage, getSettings } from '../lib/asyncStorage'

interface PasslogUserDataProviderProps {
  children: ReactElement
}

const PasslogUserDataContext = createContext({})

export const PasslogUserDataProvider = ({ children }: PasslogUserDataProviderProps) => {
  const [renderPasslogData, setRenderPasslogData] = useState(0)
  const [passwords, setPasswords] = useState<PasswordProps[]>([])
  const [cards, setCards] = useState<CardProps[]>([])
  const [settings, setSettings] = useState<SettingsProps>({})

  const getData = async() => {
    const passwords: PasswordProps[] = await getPasswordsFromStorage()
    const cards: CardProps[] = await getCardsFromStorage()
    const settings: SettingsProps = await getSettings()
    setPasswords(passwords)
    setCards(cards)
  }

  useEffect(() => {
    getData()
  }, [renderPasslogData])

  const renderPasslogDataHandler = () => {
    setRenderPasslogData(renderPasslogData + 1)
  }

  return (
    <PasslogUserDataContext.Provider value={{ passwords, setPasswords, cards, setCards, renderPasslogDataHandler, settings, setSettings }}>
      {children}
    </PasslogUserDataContext.Provider>
  )
}

export const usePasslogUserData = (): PasslogUserDataProps => useContext(PasslogUserDataContext)