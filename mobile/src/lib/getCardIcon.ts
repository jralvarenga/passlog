interface PasswordIconResponse {
  icon: string
  iconFamily: string
}

export const cardIcon = (type: string): PasswordIconResponse => {
  type = type.toLowerCase()  

  if (type.includes('id') || type.includes('license')) {
   return { icon: 'card-account-details', iconFamily: 'material' }
  } else if (type.includes('credit') || type.includes('debit')) {
    return { icon: 'card', iconFamily: 'ionicons' }
  } else  {
    return { icon: '', iconFamily: '' }
  }
}