import { Field, useField } from "formik"
import { FC } from "react"

type Props = {
  name: string
  label: string
  linkedLabel: string
  link: string
}

export const LinkedTextCheckbox: FC<Props> = ({name, label, linkedLabel, link}) => {
  const [,meta] = useField(name);
  
  return (
    <div className="user-form__row user-form__row--checkbox">
      <Field name={name} type="checkbox" className="user-form__checkbox" />
      <label htmlFor="acceptTerms">
        {label}{' '}
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
        >
          {linkedLabel}
        </a>
      </label>
      {meta.error && (
      <span className="user-form__error">
        {meta.error}
      </span>
      )}
    </div>
  )
}
