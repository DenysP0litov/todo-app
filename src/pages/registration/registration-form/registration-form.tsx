import { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Formik, FormikErrors } from 'formik'
import { FormCountrySelect, FormTextInput } from 'components/form'
import { LinkedTextCheckbox } from 'components/form/linked-text-checkbox'
import { registrationFormInitialValues as initialValues } from './constants'
import 'styles/user-form.scss'
import { RegistrationFormValues, User } from 'types'
import { validateEmail, validatePhone } from 'utils'
import { validatePassword } from './utils'
import { UsersStore } from 'store-mobx'

const usersStore = new UsersStore()

export const RegistrationForm = () => {  
  const navigate = useNavigate()
  const users = usersStore.users

  const validate = (values: RegistrationFormValues) => {
    const errors: FormikErrors<RegistrationFormValues> = {}
  
    if (!values.email) errors.email = 'Enter your email!'
    else if (!validateEmail(values.email))
      errors.email = 'Invalid email address!'
    else if (users.find(user => user.email === values.email))
      errors.email = 'This email is used already!'
  
    if (!values.phone) errors.phone = 'Enter your phone number!'
    else if (!validatePhone(values.phone))
      errors.phone = 'Invalid phone number!'
    else if (users.find(user => user.phone === values.phone))
      errors.phone = 'This phone is used already!'
  
    if (!values.password) errors.password = 'Enter your password!'
    else if (!validatePassword(values.password))
      errors.password = 'Password must have at least 8 symbols!'
  
    if (!values.confirmPassword) errors.confirmPassword = 'Confirm your password!'
    else if (values.confirmPassword !== values.password)
      errors.confirmPassword = 'Passwords dont match!'
  
    if (!values.country) errors.country = 'Choose your country!'
  
    if (!values.acceptTerms) errors.acceptTerms = 'Accept our terms of service!'
  
    return errors
  }

  const handleLoginLinkClick = () => {
    navigate('./login')
  }

  const handleSubmit = (values: RegistrationFormValues) => {
    const {email, phone, password, country} = values
    const newUser: User = {
      email,
      phone,
      password,
      country,
      lists: [],
    }

    usersStore.AddUser(newUser)
    usersStore.LoginUser({email})

    localStorage.setItem('users', JSON.stringify([...users, newUser]))
    localStorage.setItem('current-user-email', JSON.stringify(email))

    navigate('/todos')
  }

  return (
    <Formik
      <RegistrationFormValues>
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({setFieldError}) => { 
        const handleFormChange = (e: FormEvent) => {
          setFieldError((e.target as HTMLElement).getAttribute('name')!, '')
        }

        return (
          <Form
            className="user-form" 
            onChange={(e) => handleFormChange(e)}
          >
            <h1 className="user-form__title">Welcome!</h1>  
            <FormTextInput label="Email adress" name="email" type="text" />
            <FormTextInput label="Phone number" name="phone" type="text" />
            <FormTextInput label="Password" name="password" type="password" />
            <FormTextInput label="Confirm password" name="confirmPassword" type="password" />
            <FormCountrySelect name="country"/>
            <LinkedTextCheckbox 
              name="acceptTerms" 
              label="I'm agree with" 
              linkedLabel="terms of service"
              link="https://youtu.be/dQw4w9WgXcQ"
            />
            <button type="submit" className="user-form__button">
              Register
            </button>
            <span className="user-form__link" onClick={handleLoginLinkClick}>
              I have an account already
            </span>
          </Form>
      )}}
    </Formik>
  )
}
