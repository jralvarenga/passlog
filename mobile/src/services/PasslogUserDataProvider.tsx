import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react'
import { CardProps, PasswordProps } from '../interface/interfaces'
import { testPasswords, testCards } from '../data/testData'

interface PasslogUserDataProviderProps {
  children: ReactElement
}

const PasslogUserDataContext = createContext({})

export const PasslogUserDataProvider = ({ children }: PasslogUserDataProviderProps) => {
  const [passwords, setPasswords] = useState<PasswordProps[]>([])
  const [cards, setCards] = useState<CardProps[]>([])

  useEffect(() => {
    setPasswords(testPasswords)
    setCards(testCards)
  }, [])

  return (
    <PasslogUserDataContext.Provider value={{ passwords, setPasswords, cards, setCards }}>
      {children}
    </PasslogUserDataContext.Provider>
  )
}

export const usePasslogUserData = () => useContext(PasslogUserDataContext)