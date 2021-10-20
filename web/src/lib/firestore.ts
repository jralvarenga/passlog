import app from './firebase'
import {
  collection,
  doc,
  getFirestore,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  runTransaction
} from 'firebase/firestore'
import { returnCurrentUser } from './auth'
import { CardProps, NoteProps, PasswordProps } from '../interfaces/interfaces'
import { decryptCard, decryptNote, decryptPassword, encryptCard, encryptNote, encryptPassword } from './encripter'

const firestore = getFirestore(app)

export const createUserDocument = async(uid: string) => {
  const currentDate = new Date()
  const docRef = doc(collection(firestore, "data"), uid)
  await setDoc(docRef, {
    createdIn: `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`
  })
}

export const getPasslogUserDataInFirestore = async(): Promise<{ firestorePasswords: PasswordProps[], firestoreCards: CardProps[], firestoreNotes: NoteProps[] }> => {
  const user = returnCurrentUser()
  const passwordsCollection = collection(doc(collection(firestore, 'data'), user?.uid), 'passwords')
  const cardsCollection = collection(doc(collection(firestore, 'data'), user?.uid), 'cards')
  const notesCollection = collection(doc(collection(firestore, 'data'), user?.uid), 'notes')

  let passwords: PasswordProps[] = []
  let cards: CardProps[] = []
  let notes: NoteProps[] = []
  
  const getPasswords = await getDocs(passwordsCollection)
  const getCards = await getDocs(cardsCollection)
  const getNotes = await getDocs(notesCollection)

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

export const createNewPasslogDocument = async(data: PasswordProps | CardProps | NoteProps, type: 'passwords' | 'cards' | 'notes') => {
  const user = returnCurrentUser()
  const docRef = doc(collection(doc(collection(firestore, 'data'), user?.uid), type), data.id)

  await setDoc(docRef, {
    ...data
  })
}

export const deletePasslogDocument = async(docId: string, type: 'passwords' | 'cards' | 'notes' | 'notes') => {  
  const user = returnCurrentUser()
  const docRef = doc(collection(doc(collection(firestore, 'data'), user?.uid), type), docId)

  await deleteDoc(docRef)
}

export const updatePasslogDocument = async(data: PasswordProps | CardProps | NoteProps, type: 'passwords' | 'cards' | 'notes') => {
  const user = returnCurrentUser()
  const docRef = doc(collection(doc(collection(firestore, 'data'), user?.uid), type), data.id)

  await updateDoc(docRef, {
    ...data
  })
}

export const fullBackupInFirestore = async(passwords: PasswordProps[], cards: CardProps[], notes: NoteProps[]) => {
  const user = returnCurrentUser()
  await runTransaction(firestore, async(trns) => {
    const passwordsCollection = collection(doc(collection(firestore, 'data'), user?.uid), 'passwords')
    const cardsCollection = collection(doc(collection(firestore, 'data'), user?.uid), 'cards')
    const notesCollection = collection(doc(collection(firestore, 'data'), user?.uid), 'notes')

    passwords.map((password) => {
      const docRef = doc(passwordsCollection, password.id)
      password = encryptPassword(password)

      trns.set(docRef, password)
    })

    cards.map((card) => {
      const docRef = doc(cardsCollection, card.id)
      card = encryptCard(card)

      trns.set(docRef, card)
    })

    notes.map((note) => {
      const docRef = doc(notesCollection, note.id)
      note = encryptNote(note)

      trns.set(docRef, note)
    })
  })
}

export const deleteUserPasslogData = async() => {
  const user = returnCurrentUser()

  await runTransaction(firestore, async(trns) => {
    const passwordsCollection = collection(doc(collection(firestore, 'data'), user?.uid), 'passwords')
    const cardsCollection = collection(doc(collection(firestore, 'data'), user?.uid), 'cards')
    const notesCollection = collection(doc(collection(firestore, 'data'), user?.uid), 'notes')

    const getPasswords = await getDocs(passwordsCollection)
    const getCards = await getDocs(cardsCollection)
    const getNotes = await getDocs(notesCollection)

    getPasswords.forEach((doc) => {
      // @ts-ignore
      const ref = doc(passwordsCollection, doc.id)
      trns.delete(ref)
    })
    getCards.forEach((doc) => {
      // @ts-ignore
      const ref = doc(cardsCollection, doc.id)
      trns.delete(ref)
    })
    getNotes.forEach((doc) => {
      // @ts-ignore
      const ref = doc(notesCollection, doc.id)
      trns.delete(ref)
    })
  })
}

export const deleteUserDocument = async() => {
  const user = returnCurrentUser()
  const userRef = doc(collection(firestore, "data"), user?.uid)

  await deleteDoc(userRef)
}