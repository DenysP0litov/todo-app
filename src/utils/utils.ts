export const validateEmail = (email: string) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
}

export const validatePhone = (phone: string) => {
  return /^\++[0-9]{7,15}$/.test(phone)
}