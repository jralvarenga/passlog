import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { exp } from "react-native-reanimated";

export interface PasswordProps {
  profileName: string
  password: string
  id: string
  email: string
  comments: string
  user: string
  date: string
}

export interface CardProps {
  addedInfo: string
  cardName: string
  date: string
  holder: string
  id: string
  number: string
  type: string
}

export interface PasslogUserDataProps {
  passwords?: PasswordProps[]
  setPasswords?: Function
  cards?: CardProps[]
  setCards?: Function
  renderPasslogDataHandler?: Function
  settings?: SettingsProps
  setSettings?: Function
  user?: FirebaseAuthTypes.User | null
  setUser?: Function
  userSettings?: UserSettingsProps | null
  setUserSettings?: Function
}

export interface SettingsProps {
  onStartSecurity?: boolean
  useBiometrics?: boolean
  usePin?: boolean
  pinNumber?: string
  biometricType?: 'biometric' | 'face-id' | 'touch-id' | 'none'
}

export interface UserSettingsProps {
  name: string
  uid: string
  alwaysSync: boolean
}