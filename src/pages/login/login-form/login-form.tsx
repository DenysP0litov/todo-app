import { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Formik, FormikErrors } from 'formik'
import { LoginFormValues } from 'types';
import { loginFormInitialValues as initialValues } from './constants'
import { FormTextInput } from 'components/form'
import 'styles/user-form.scss'
import { useSelector } from 'react-redux';
import { usersSelectors } from 'store/users/selectors';
import { useDispatch } from 'react-redux';
import { LoginUser } from 'store/users';

export const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const users = useSelector(usersSelectors.users)

  const validate = (values: LoginFormValues) => {
    const errors: FormikErrors<LoginFormValues> = {}
    const user = users.find(user => user.email === values.email)
  
    if (!values.email) errors.email = 'Enter your email!'
    else if (!user)
      errors.email = 'User with this email doesn\'t exist'
  
    if (!values.password) errors.password = 'Enter your password!'
    else if (user?.password !== values.password)
      errors.password = 'Invalid password!'
  
    return errors
  }

  const handleSubmit = (values: LoginFormValues) => {
    dispatch(LoginUser({email: values.email}))
    localStorage.setItem('current-user-email', JSON.stringify(values.email))
    navigate('/todos')
  }

  return (
    <Formik
      <LoginFormValues>
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
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
            <h1 className="user-form__title">Welcome <br />back!</h1>  
            <FormTextInput label="Email" name="email" type="text"/>
            <FormTextInput label="Password" name="password" type="password"/>
            <button type="submit" className="user-form__button">
              Login
            </button>
            <span onClick={() => navigate('/register')} className="user-form__link">
              I have no account yet
            </span>
          </Form>
        )
      }}
    </Formik>
  )
}
