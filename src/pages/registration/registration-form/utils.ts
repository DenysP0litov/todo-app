import { FormikErrors } from 'formik'
import { RegistrationFormValues } from 'types'
import { validateEmail, validatePhone } from 'utils'

const validatePassword = (password: string) => {
  return /(?=.*[0-9])[A-Z0-9]{8,16}/i.test(password)
}

export const validateRegistration = (values: RegistrationFormValues) => {
  const errors: FormikErrors<RegistrationFormValues> = {}

  if (!values.email) errors.email = 'Enter your email!'
  if (values.email && !validateEmail(values.email))
    errors.email = 'Invalid email address!'

  if (!values.phone) errors.phone = 'Enter your phone number!'
  if (values.phone && !validatePhone(values.phone))
    errors.phone = 'Invalid phone number!'

  if (!values.password) errors.password = 'Enter your password!'
  if (values.password && !validatePassword(values.password))
    errors.password = 'Password must have at least 8 symbols!'

  if (!values.confirmPassword) errors.confirmPassword = 'Confirm your password!'
  if (values.confirmPassword && values.confirmPassword !== values.password)
    errors.confirmPassword = 'Passwords dont match!'

  if (!values.country) errors.country = 'Choose your country!'

  if (!values.acceptTerms) errors.acceptTerms = 'Accept our terms of service!'

  return errors
}
