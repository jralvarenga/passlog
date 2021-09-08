export const createId = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let key = ""
  for ( let i = 0; i < 16; i++ ) {
    key += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return key;
}