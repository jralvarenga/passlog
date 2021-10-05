import React, { createContext, useContext, useEffect, useState } from 'react'
import { testCards, testNotes, testPasswords } from '../data/test'
import { CardProps, NoteProps, PasslogUserDataProps, PasswordProps } from '../interfaces/interfaces'

const PasslogUserDataContext = createContext({})

export const PasslogUserDataProvider = ({ children }: any) => {
  const [dataLoading, setDataLoading] = useState(true)
  const [renderPasslogData, setRenderPasslogData] = useState(0)
  const [passwords, setPasswords] = useState<PasswordProps[]>([])
  const [cards, setCards] = useState<CardProps[]>([])
  const [notes, setNotes] = useState<NoteProps[]>([])

  useEffect(() => {
    setPasswords(testPasswords)
    setCards(testCards)
    setNotes(testNotes)
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
        notes,
        setNotes,
        renderPasslogDataHandler,
        dataLoading,
        setDataLoading,
      }}>
      {children}
    </PasslogUserDataContext.Provider>
  )
}

export const usePasslogUserData = (): PasslogUserDataProps => useContext(PasslogUserDataContext)