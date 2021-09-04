export const generatePassword = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890123456789!¡#$%&?¡_!¡#$%&?¡_";
  let password = ""
  for ( let i = 0; i < 13; i++ ) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return password
}