interface PasswordIconResponse {
  icon: string
  iconFamily: string
}

export const passwordIcon = (name: string): PasswordIconResponse => {
  name = name.toLowerCase()

  if (name.includes('google') || name.includes('gmail')) {
   return { icon: 'logo-google', iconFamily: 'ionicons' }
  } else if (name.includes('facebook') || name.includes('fb') || name.includes('messenger') || name.includes('msg')) {
    return { icon: 'facebook', iconFamily: 'material' }
  } else if (name.includes('instagram') || name.includes('insta')) {
    return { icon: 'logo-instagram', iconFamily: 'ionicons' }
  } else if (name.includes('github')) {
    return { icon: 'logo-github', iconFamily: 'ionicons' }
  } else if (name.includes('playstation') || name.includes('play')) {
    return { icon: 'logo-playstation', iconFamily: 'ionicons' }
  } else if (name.includes('amazon') || name.includes('prime') || name.includes('prime video')) {
    return { icon: 'logo-amazon', iconFamily: 'ionicons' }
  } else if (name.includes('xbox')) {
    return { icon: 'logo-xbox', iconFamily: 'ionicons' }
  } else if (name.includes('microsoft')) {
    return { icon: 'microsoft', iconFamily: 'material' }
  } else if (name.includes('netflix')) {
    return { icon: 'netflix', iconFamily: 'material' }
  } else if (name.includes('twitter') || name.includes('tw')) {
    return { icon: 'twitter', iconFamily: 'material' }
  } else if (name.includes('pinterest')) {
    return { icon: 'pinterest', iconFamily: 'material' }
  } else if (name.includes('discord')) {
    return { icon: 'discord', iconFamily: 'material' }
  } else if (name.includes('uber')) {
    return { icon: 'uber', iconFamily: 'material' }
  } else if (name.includes('internet') || name.includes('wifi')) {
    return { icon: 'wifi', iconFamily: 'ionicons' }
  } else if (name.includes('file')) {
    return { icon: 'file-outline', iconFamily: 'ionicons' }
  } else if (name.includes('adobe')) {
    return { icon: 'adobe', iconFamily: 'material' }
  } else  {
    return { icon: '', iconFamily: '' }
  }
}