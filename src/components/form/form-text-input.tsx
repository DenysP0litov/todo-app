import { Field, useField } from "formik"
import { FC } from "react"

type Props = {
  label: string
  name: string
  type: string
}

export const FormTextInput: FC<Props> = ({label, name, type}) => {
  const [,meta] = useField(name);
  
  return (
    <div className="user-form__row">
      <label htmlFor={name}>{label}</label>
      <Field name={name} type={type} className="user-form__field" />
      {meta.error && <span className="user-form__error">{meta.error}</span>}
    </div>
  )
}
