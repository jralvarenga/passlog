import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
  deleteUser,
  User
} from 'firebase/auth'
import app from './firebase'

const auth = getAuth(app)

// Auth handlers
export const loginInFirebaseAuth = async(email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password)
  return result
}

export const sendEmailConfirmationHandler = async(user: User) => {
  await sendEmailVerification(user)
}

export const createAccountInFirebaseAuth = async(email: string, password: string, name: string): Promise<User> => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(user, {
    displayName: name
  })
  await sendEmailConfirmationHandler(user)

  return user
}

export const returnCurrentUser = (): User | null => {
  return auth.currentUser
}

export const signOutHandler = async() => {
  await signOut(auth)
}

export const deleteAccountHandler = async() => {
  const user = auth.currentUser

  await deleteUser(user!)
}