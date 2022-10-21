import { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { FormCountrySelect, FormTextInput } from 'components/form'
import { LinkedTextCheckbox } from 'components/form/linked-text-checkbox'
import { registrationFormInitialValues as initialValues } from './constants'
import { validateRegistration as validate } from './utils'
import 'styles/user-form.scss'
import { RegistrationFormValues } from 'types'

export const RegistrationForm = () => {  
  const navigate = useNavigate()

  const handleLoginLinkClick = () => {
    navigate('./login')
  }

  return (
    <Formik
      <RegistrationFormValues>
      initialValues={initialValues}
      validate={validate}
      onSubmit={() => {}}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({handleSubmit, setFieldError}) => { 
        const handleFormChange = (e: FormEvent) => {
          setFieldError((e.target as HTMLElement).getAttribute('name')!, '')
        }

        return (
          <Form
            className="user-form" 
            onSubmit={handleSubmit}
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
