import { FormikErrors } from "formik"
import { LoginFormValues } from "types"

export const loginFormValidate = (values: LoginFormValues) => {
  const errors: FormikErrors<LoginFormValues> = {}

  if (!values.email) errors.email = 'Enter your email!'

  if (!values.password) errors.password = 'Enter your password!'

  return errors
}