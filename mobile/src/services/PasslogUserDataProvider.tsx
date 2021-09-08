import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react'
import { CardProps, PasswordProps } from '../interface/interfaces'
import { getCardsFromStorage, getPasswordsFromStorage } from '../lib/asyncStorage'

interface PasslogUserDataProviderProps {
  children: ReactElement
}

const PasslogUserDataContext = createContext({})

export const PasslogUserDataProvider = ({ children }: PasslogUserDataProviderProps) => {
  const [renderPasslogData, setRenderPasslogData] = useState(0)
  const [passwords, setPasswords] = useState<PasswordProps[]>([])
  const [cards, setCards] = useState<CardProps[]>([])

  const getData = async() => {
    const passwords: PasswordProps[] = await getPasswordsFromStorage()
    const cards: CardProps[] = await getCardsFromStorage()
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
    <PasslogUserDataContext.Provider value={{ passwords, setPasswords, cards, setCards, renderPasslogDataHandler }}>
      {children}
    </PasslogUserDataContext.Provider>
  )
}

export const usePasslogUserData = () => useContext(PasslogUserDataContext)