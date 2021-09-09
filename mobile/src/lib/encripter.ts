import CryptoES from 'crypto-es'
import { CardProps, PasswordProps } from '../interface/interfaces'

const CRYPTO_KEY = 'defgt4gyfgv747fv474v4rg974v4t7yt'
const CRYPTO_IV = 'fiuewgf48fbgw3y8aopfhnuew8h4yugh'

const key = CryptoES.enc.Hex.parse(CRYPTO_KEY)
const iv = CryptoES.enc.Hex.parse(CRYPTO_IV)

export const encryptString = (string: any) =>{
  return CryptoES.AES.encrypt(string, key, { iv: iv })
}
export const decryptString = (string: any) => {
  const decrypted = CryptoES.AES.decrypt(string, key, { iv: iv })
  if (decrypted.sigBytes < 0) {
    return string
  } else {
    return CryptoES.enc.Utf8.stringify(decrypted)
  }
}

export const encryptPassword = (password: PasswordProps) => {
  const encrypted: PasswordProps = {
    id: password.id,
    profileName: encryptString(password.profileName).toString(),
    user: encryptString(password.user).toString(),
    email: encryptString(password.email).toString(),
    password: encryptString(password.password).toString(),
    comments: encryptString(password.comments).toString(),
    date: password.date
  }
  return encrypted
}

export const encryptCard = (card: CardProps) => {
  const encrypted: CardProps = {
    id: card.id,
    cardName: encryptString(card.cardName).toString(),
    holder: encryptString(card.holder).toString(),
    number: encryptString(card.number).toString(),
    type: encryptString(card.type).toString(),
    addedInfo: encryptString(card.addedInfo).toString(),
    date: card.date
  }
  return encrypted
}