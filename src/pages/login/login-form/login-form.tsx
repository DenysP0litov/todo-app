import { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { LoginFormValues } from 'types';
import { loginFormInitialValues as initialValues } from './constants'
import { loginFormValidate as validate } from './utils'
import { FormTextInput } from 'components/form'
import 'styles/user-form.scss'

export const LoginForm = () => {
  const navigate = useNavigate()

  return (
    <Formik
      <LoginFormValues>
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
