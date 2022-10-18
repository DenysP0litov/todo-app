import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import 'styles/user-form.scss'

export const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: () => {},
  })

  const navigate = useNavigate()

  return (
    <form className="user-form" onSubmit={formik.handleSubmit}>
      <h1 className="user-form__title">Welcome <br />back!</h1>  
      <label htmlFor="email">Email Address</label>

      <input
        className="user-form__field"
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
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

      <button type="submit" className="user-form__button">
        Login
      </button>
      <span onClick={() => navigate('/register')} className="user-form__link">
        I have no account yet
      </span>
    </form>
  )
}
