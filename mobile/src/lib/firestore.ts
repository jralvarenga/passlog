import firestore from '@react-native-firebase/firestore'
import { CardProps, NoteProps, PasswordProps } from '../interface/interfaces'
import { returnCurrentUser } from './auth'
import { decryptCard, decryptNote, decryptPassword, encryptCard, encryptNote, encryptPassword } from './encripter'

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

export const getPasslogUserDataInFirestore = async(): Promise<{ firestorePasswords: PasswordProps[], firestoreCards: CardProps[], firestoreNotes: NoteProps[] }> => {
  const user = returnCurrentUser()
  const passwordsCollection = firestore().collection('data').doc(user?.uid).collection('passwords')
  const cardsCollection = firestore().collection('data').doc(user?.uid).collection('cards')
  const notesCollection = firestore().collection('data').doc(user?.uid).collection('notes')

  let passwords: PasswordProps[] = []
  let cards: CardProps[] = []
  let notes: NoteProps[] = []
  const getPasswords = await passwordsCollection.get()
  const getCards = await cardsCollection.get()
  const getNotes = await notesCollection.get()

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
  getNotes.forEach((doc) => {
    /* @ts-ignore */
    const data: NoteProps = decryptNote(doc.data())
    notes.push(data)
  })

  return {
    firestorePasswords: passwords,
    firestoreCards: cards,
    firestoreNotes: notes
  }
}

export const createNewPasslogDocument = async(data: PasswordProps | CardProps | NoteProps, collection: 'passwords' | 'cards' | 'notes') => {
  const user = returnCurrentUser()
  const docRef = firestore().collection('data').doc(user?.uid).collection(collection).doc(data.id)

  await docRef.set({
    ...data
  })
}

export const deletePasslogDocument = async(docId: string, collection: 'passwords' | 'cards' | 'notes' | 'notes') => {  
  const user = returnCurrentUser()
  const docRef = firestore().collection('data').doc(user?.uid).collection(collection).doc(docId)

  await docRef.delete()
}

export const updatePasslogDocument = async(data: PasswordProps | CardProps | NoteProps, collection: 'passwords' | 'cards' | 'notes') => {
  const user = returnCurrentUser()
  const docRef = firestore().collection('data').doc(user?.uid).collection(collection).doc(data.id)

  await docRef.update({
    ...data
  })
}

export const fullBackupInFirestore = async(passwords: PasswordProps[], cards: CardProps[], notes: NoteProps[]) => {
  const user = returnCurrentUser()
  const batch = firestore().batch()
  const passwordsCollection = firestore().collection('data').doc(user?.uid).collection('passwords')
  const cardsCollection = firestore().collection('data').doc(user?.uid).collection('cards')
  const notesCollection = firestore().collection('data').doc(user?.uid).collection('notes')

  passwords.map((password) => {
    const docRef = passwordsCollection.doc(password.id)
    password = encryptPassword(password)
    batch.set(docRef, password)
  })

  cards.map((card) => {
    const docRef = cardsCollection.doc(card.id)
    card = encryptCard(card)
    batch.set(docRef, card)
  })
  
  notes.map((note) => {
    const docRef = notesCollection.doc(note.id)
    note = encryptNote(note)
    batch.set(docRef, note)
  })

  batch.commit()
  
}

export const deleteUserPasslogData = async() => {
  const user = returnCurrentUser()
  const batch = firestore().batch()
  const passwordsCollection = firestore().collection('data').doc(user?.uid).collection('passwords')
  const cardsCollection = firestore().collection('data').doc(user?.uid).collection('cards')
  const notesCollection = firestore().collection('data').doc(user?.uid).collection('notes')

  
  const getPasswords = await passwordsCollection.get()
  const getCards = await cardsCollection.get()
  const getNotes = await notesCollection.get()

  getPasswords.forEach((doc) => {
    const ref = passwordsCollection.doc(doc.id)
    batch.delete(ref)
  })
  getCards.forEach((doc) => {
    const ref = cardsCollection.doc(doc.id)
    batch.delete(ref)
  })
  getNotes.forEach((doc) => {
    const ref = notesCollection.doc(doc.id)
    batch.delete(ref)
  })

  batch.commit()
}

export const deleteUserDocument = async() => {
  const user = returnCurrentUser()
  const userRef = firestore().collection('data').doc(user?.uid)

  await userRef.delete()
}