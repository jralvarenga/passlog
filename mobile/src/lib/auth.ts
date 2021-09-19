import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

// Auth handlers
export const loginInFirebaseAuth = async(email: string, password: string) => {
  const result = await auth().signInWithEmailAndPassword(email, password)
  return result
}

export const sendEmailConfirmationHandler = async(user: FirebaseAuthTypes.User) => {
  await user.sendEmailVerification()
}

export const createAccountInFirebaseAuth = async(email: string, password: string, name: string): Promise<FirebaseAuthTypes.User> => {
  const { user } = await auth().createUserWithEmailAndPassword(email, password)
  await user.updateProfile({
    displayName: name
  })
  await sendEmailConfirmationHandler(user)

  return user
}

export const returnCurrentUser = (): FirebaseAuthTypes.User | null => {
  return auth().currentUser
}

export const signOutHandler = async() => {
  await auth().signOut()
}

export const deleteAccountHandler = async() => {
  const user = auth().currentUser

  await user?.delete()
}