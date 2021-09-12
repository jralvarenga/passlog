import firestore from '@react-native-firebase/firestore'
import { CardProps, PasswordProps } from '../interface/interfaces'
import { returnCurrentUser } from './auth'

export const createUserDocument = async(uid: string) => {
  const currentDate = new Date()
  const docRef = firestore().collection('data').doc(uid)
  await docRef.set({
    createdIn: `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`
  })
}

export const searchForLegacyBackup = async(uid: string) => {
  const docRef = firestore().collection('data').doc(uid)
  const data = (await docRef.get()).data()

  if (data?.backupData && data?.backupData.lenght != 0) {
    return true
  } else {
    return false
  }
}

export const createNewPasslogDocument = async(data: PasswordProps | CardProps, collection: 'passwords' | 'cards') => {
  const user = returnCurrentUser()
  const docRef = firestore().collection('data').doc(user?.uid).collection(collection).doc(data.id)

  await docRef.set({
    ...data
  })
}