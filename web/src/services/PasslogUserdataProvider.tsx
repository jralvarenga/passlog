import React, { createContext, useContext, useEffect, useState } from 'react'
import { testCards, testPasswords } from '../data/test'
import { CardProps, PasslogUserDataProps, PasswordProps } from '../interfaces/interfaces'

const PasslogUserDataContext = createContext({})

export const PasslogUserDataProvider = ({ children }: any) => {
  const [dataLoading, setDataLoading] = useState(true)
  const [renderPasslogData, setRenderPasslogData] = useState(0)
  const [passwords, setPasswords] = useState<PasswordProps[]>([])
  const [cards, setCards] = useState<CardProps[]>([])

  useEffect(() => {
    setPasswords(testPasswords)
    setCards(testCards)
    setDataLoading(false)
  }, [renderPasslogData])

  const renderPasslogDataHandler = () => {
    setRenderPasslogData(renderPasslogData + 1)
  }

  return (
    <PasslogUserDataContext.Provider
      value={{
        passwords,
        setPasswords,
        cards,
        setCards,
        renderPasslogDataHandler,
        dataLoading,
        setDataLoading,
      }}>
      {children}
    </PasslogUserDataContext.Provider>
  )
}

export const usePasslogUserData = (): PasslogUserDataProps => useContext(PasslogUserDataContext)