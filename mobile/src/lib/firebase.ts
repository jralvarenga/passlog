import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

// Auth handlers
export const loginInFirebaseAuth = async(email: string, password: string) => {
  const result = await auth().signInWithEmailAndPassword(email, password)
  return result
}

export const returnCurrentUser = (): FirebaseAuthTypes.User | null => {
  return auth().currentUser
}

export const signOutHandler = async() => {
  await auth().signOut()
}