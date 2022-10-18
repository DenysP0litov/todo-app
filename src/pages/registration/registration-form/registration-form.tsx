import { Select } from 'components/select/select'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import 'styles/user-form.scss'

const { getCodes } = require('country-list')

export const RegistrationForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      country: '',
      phone: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    onSubmit: () => {},
  })
  const countries = getCodes()
  const navigate = useNavigate()

  return (
    <form className="user-form" onSubmit={formik.handleSubmit}>
      <h1 className="user-form__title">Welcome!</h1>  

      <label htmlFor="email">Email Address</label>
      <input
        className="user-form__field"
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <label htmlFor="phone">Phone number</label>
      <input
        className="user-form__field"
        id="phone"
        name="phone"
        type="phone"
        onChange={formik.handleChange}
        value={formik.values.confirmPassword}
      />

      <label htmlFor="password">Password</label>
      <input
        className="user-form__field"
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />

      <label htmlFor="confirm-password">Confirm Password</label>
      <input
        className="user-form__field"
        id="confirm-password"
        name="confirm-password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.confirmPassword}
      />

      <div className="user-form__row">
        <p>Country:</p>
        <Select
          values={countries}
          currentValue=""
          onChange={() => {}}
          title="Country"
        />
      </div>

      <div className="user-form__row">
        <input type="checkbox" name="accept-terms" id="accept-terms" />
        <label htmlFor="accept-terms">
          I'm agree with{' '}
          <a
            href="https://youtu.be/dQw4w9WgXcQ"
            target="_blank"
            rel="noreferrer"
          >
            terms conditions
          </a>
        </label>
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
