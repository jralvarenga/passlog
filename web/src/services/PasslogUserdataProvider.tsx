import React, { createContext, useContext, useEffect, useState } from 'react'
import { testCards, testNotes, testPasswords } from '../data/test'
import { CardProps, NoteProps, PasslogUserDataProps, PasswordProps } from '../interfaces/interfaces'
import { getCardsFromLocalStorage, getNotesFromLocalStorage, getPasswordsFromLocalStorage } from '../lib/localStorage'

const PasslogUserDataContext = createContext({})

export const PasslogUserDataProvider = ({ children }: any) => {
  const [dataLoading, setDataLoading] = useState(true)
  const [renderPasslogData, setRenderPasslogData] = useState(0)
  const [passwords, setPasswords] = useState<PasswordProps[]>([])
  const [selectedPasslogItem, setSelectedPasslogItem] = useState<PasswordProps | CardProps | NoteProps | null>(null)
  const [cards, setCards] = useState<CardProps[]>([])
  const [notes, setNotes] = useState<NoteProps[]>([])

  const getData = async() => {
    //const user = returnCurrentUser()
    //setUser(user)
    let passwords: PasswordProps[] = await getPasswordsFromLocalStorage()
    let cards: CardProps[] = await getCardsFromLocalStorage()
    let notes: NoteProps[] = await getNotesFromLocalStorage()
    //let settings: SettingsProps = await getSettings()
    setPasswords(passwords)
    setCards(cards)
    setNotes(notes)
    //setSettings(settings)
    setDataLoading(false)
    /*if (user) {
      const userSettings = await getUserSettings()
      setUserSettings(userSettings)
      if (userSettings.alwaysSync) {
        const { firestorePasswords, firestoreCards, firestoreNotes } = await getPasslogUserDataInFirestore()
        await setPasswordsInStorage(firestorePasswords)
        await setCardsInStorage(firestoreCards)
        await setNotesInStorage(firestoreNotes)
        passwords = firestorePasswords
        cards = firestoreCards
        notes = firestoreNotes
      }
    }*/
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
        setSelectedPasslogItem,
        selectedPasslogItem,
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