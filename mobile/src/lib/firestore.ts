import firestore from '@react-native-firebase/firestore'
import { CardProps, PasswordProps } from '../interface/interfaces'
import { returnCurrentUser } from './auth'
import { decryptCard, decryptPassword } from './encripter'

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

export const getPasslogUserDataInFirestore = async(): Promise<{ firestorePasswords: PasswordProps[], firestoreCards: CardProps[] }> => {
  const user = returnCurrentUser()
  const passwordsCollection = firestore().collection('data').doc(user?.uid).collection('passwords')
  const cardsCollection = firestore().collection('data').doc(user?.uid).collection('cards')

  let passwords: PasswordProps[] = []
  let cards: CardProps[] = []
  const getPasswords = await passwordsCollection.get()
  const getCards = await cardsCollection.get()

  getPasswords.forEach((doc) => {
    /* @ts-ignore */
    const data: PasswordProps = decryptPassword(doc.data())
    passwords.push(data)
  })
  getCards.forEach((doc) => {
    /* @ts-ignore */
    const data: CardProps = decryptCard(doc.data())
    cards.push(data)
  })

  return {
    firestorePasswords: passwords,
    firestoreCards: cards
  }
}

export const createNewPasslogDocument = async(data: PasswordProps | CardProps, collection: 'passwords' | 'cards') => {
  const user = returnCurrentUser()
  const docRef = firestore().collection('data').doc(user?.uid).collection(collection).doc(data.id)

  await docRef.set({
    ...data
  })
}

export const deletePasslogDocument = async(docId: string, collection: 'passwords' | 'cards') => {  
  const user = returnCurrentUser()
  const docRef = firestore().collection('data').doc(user?.uid).collection(collection).doc(docId)

  await docRef.delete()
}

export const updatePasslogDocument = async(data: PasswordProps | CardProps, collection: 'passwords' | 'cards') => {
  const user = returnCurrentUser()
  const docRef = firestore().collection('data').doc(user?.uid).collection(collection).doc(data.id)

  await docRef.update({
    ...data
  })
}