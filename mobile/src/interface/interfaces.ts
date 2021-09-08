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
}

export interface SettingsProps {
  useBiometrics?: boolean
  usePin?: boolean
  pinNumber?: string
}