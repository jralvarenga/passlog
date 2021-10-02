import React, { createContext, useContext, useEffect, useState } from 'react'
import { testPasswords } from '../data/test'
import { PasslogUserDataProps, PasswordProps } from '../interfaces/interfaces'

const PasslogUserDataContext = createContext({})

export const PasslogUserDataProvider = ({ children }: any) => {
  const [dataLoading, setDataLoading] = useState(true)
  const [renderPasslogData, setRenderPasslogData] = useState(0)
  const [passwords, setPasswords] = useState<PasswordProps[]>([])

  useEffect(() => {
    setPasswords(testPasswords)
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
        renderPasslogDataHandler,
        dataLoading,
        setDataLoading,
      }}>
      {children}
    </PasslogUserDataContext.Provider>
  )
}

export const usePasslogUserData = (): PasslogUserDataProps => useContext(PasslogUserDataContext)