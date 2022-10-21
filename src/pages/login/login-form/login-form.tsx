import { FormTextInput } from 'components/form';
import { Form, Formik, FormikErrors, FormikValues, useFormik } from 'formik'
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom'
import 'styles/user-form.scss'

export const LoginForm = () => {
  const validate = (values: FormikValues) => {
    const errors: FormikErrors<FormikValues> = {}

    if (!values.email) {
      errors.email = 'Enter your email!'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address!'
    }

    if (!values.password) {
      errors.password = 'Enter your password!'
    } else if (!/(?=.*[0-9])[A-Z0-9]{8,16}/i.test(values.password)) {
      errors.password = 'Password must have at least 8 symbols!'
    }
  
    return errors
  };

  const navigate = useNavigate()

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
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
