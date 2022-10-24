export const validatePassword = (password: string) => {
  return /(?=.*[0-9])[A-Z0-9]{8,16}/i.test(password)
}