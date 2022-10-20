import { FormatLineSpacing } from '@mui/icons-material'
import { Select } from 'components/select/select'
import { FormikErrors, FormikValues, useFormik } from 'formik'
import { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import 'styles/user-form.scss'

const { getCodes } = require('country-list')

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

  const formik = useFormik({
    initialValues: {
      email: '',
      country: '',
      phone: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    validate,
    onSubmit: (values, event) => {
      validate(values)
    },
    validateOnChange: false,
    validateOnBlur: false,
  })
  const countries = getCodes()
  const navigate = useNavigate()

  const handleFormChange = (e: FormEvent) => {
    setFieldError((e.target as HTMLElement).getAttribute('name')!, '')
  }

  const {getFieldProps, handleSubmit, setTouched, setFieldValue, setFieldError, errors, touched, values} = formik

  return (
    <form 
      className="user-form" 
      onSubmit={handleSubmit}
      onChange={(e) => handleFormChange(e)}
    >
      <h1 className="user-form__title">Welcome!</h1>  

      <div className="user-form__row">
        <label htmlFor="email">Email Address</label>
        <input
          className="user-form__field"
          id="email"
          type="email"
          {...getFieldProps('email')}
        />
        {errors.email && (
          <span className="user-form__error">
            {errors.email}
          </span>
        )}
      </div>

      <div className="user-form__row">
        <label htmlFor="phone">Phone number</label>
        <input
          className="user-form__field"
          id="phone"
          type="phone"
          {...getFieldProps('phone')}
        />
        {errors.phone && (
          <span className="user-form__error">
            {errors.phone}
          </span>
        )}
      </div>

      <div className="user-form__row">
        <label htmlFor="password">Password</label>
        <input
          className="user-form__field"
          id="password"
          type="password"
          {...getFieldProps('password')}
        />
        {errors.password && (
          <span className="user-form__error">
            {errors.password}
          </span>
        )}
      </div>

      <div className="user-form__row">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          className="user-form__field"
          id="confirmPassword"
          type="password"
          {...getFieldProps('confirmPassword')}
        />
        {formik.errors.confirmPassword && (
          <span className="user-form__error">
            {formik.errors.confirmPassword}
          </span>
        )}
      </div>

      <div className="user-form__row user-form__row--country">
        <p>Country:</p>
        <Select
          name="country"
          values={countries}
          currentValue={values.country}
          setFieldValue={setFieldValue}
          setFieldError={setFieldError}
          title='country'
        />
        {errors.country && (
        <span className="user-form__error">
          {errors.country}
        </span>
        )}
      </div>

      <div className="user-form__row user-form__row--checkbox">
        <input
          className="user-form__checkbox"
          type="checkbox" 
          id="acceptTerms"
          {...getFieldProps('acceptTerms')}
        />
        <label htmlFor="acceptTerms">
          I'm agree with{' '}
          <a
            href="https://youtu.be/dQw4w9WgXcQ"
            target="_blank"
            rel="noreferrer"
          >
            terms of service
          </a>
        </label>
        {errors.acceptTerms && (
        <span className="user-form__error">
          {errors.acceptTerms}
        </span>
        )}
      </div>

      <button type="submit" className="user-form__button">
        Register
      </button>
      <span className="user-form__link" onClick={() => navigate('/login')}>
        I have an account already
      </span>
    </form>
  )
}
