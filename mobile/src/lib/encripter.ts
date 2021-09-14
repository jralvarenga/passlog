import CryptoES from 'crypto-es'
import { CRYPTO_IV, CRYPTO_KEY } from '../../crypto_keys'
import { CardProps, NoteProps, PasswordProps } from '../interface/interfaces'

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

export const encryptNote = (note: NoteProps) => {
  const encrypted: NoteProps = {
    id: note.id,
    title: encryptString(note.title).toString(),
    body: encryptString(note.body).toString(),
    date: note.date
  }
  return encrypted
}

export const decryptPassword = (password: PasswordProps) => {
  const decrypted: PasswordProps = {
    id: password.id,
    profileName: decryptString(password.profileName),
    user: decryptString(password.user),
    email: decryptString(password.email),
    password: decryptString(password.password),
    comments: decryptString(password.comments),
    date: password.date
  }
  return decrypted
}

export const decryptCard = (card: CardProps) => {
  const decrypted: CardProps = {
    id: card.id,
    cardName: decryptString(card.cardName),
    holder: decryptString(card.holder),
    number: decryptString(card.number),
    type: decryptString(card.type),
    addedInfo: decryptString(card.addedInfo),
    date: card.date
  }
  return decrypted
}

export const decryptNote = (note: NoteProps) => {
  const decrypted: NoteProps = {
    id: note.id,
    title: decryptString(note.title),
    body: decryptString(note.body),
    date: note.date
  }
  return decrypted
}