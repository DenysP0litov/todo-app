import { FormCountrySelect, FormTextInput } from 'components/form'
import { LinkedTextCheckbox } from 'components/form/linked-text-checkbox'
import { Formik, FormikErrors, FormikValues} from 'formik'
import { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import 'styles/user-form.scss'

export const RegistrationForm = () => {
  const validate = (values: FormikValues) => {
    const errors: FormikErrors<FormikValues> = {}

    if (!values.email) {
      errors.email = 'Enter your email!'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address!'
    }

    if (!values.phone) {
      errors.phone = 'Enter your phone number!'
    } else if (!/^\++[0-9]{7,15}$/.test(values.phone)) {
      errors.phone = 'Invalid phone number!'
    }

    if (!values.password) {
      errors.password = 'Enter your password!'
    } else if (!/(?=.*[0-9])[A-Z0-9]{8,16}/i.test(values.password)) {
      errors.password = 'Password must have at least 8 symbols!'
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirm your password!'
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Passwords dont match!'
    }
    
    if (!values.country) {
      errors.country = 'Choose your country!'
    }

    if (!values.acceptTerms) {
      errors.acceptTerms = 'Accept our terms of service!'
    }
  
    return errors
  };

  const navigate = useNavigate()

  return (
    <Formik
      initialValues={{
        email: '',
        country: '',
        phone: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
      }}
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
          <form 
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
            <span className="user-form__link" onClick={() => navigate('/login')}>
              I have an account already
            </span>
          </form>
      )}}
    </Formik>
  )
}
