import { Select } from "components/select"
import { getCodes } from "country-list"
import { useField } from "formik"
import { FC } from "react"

type Props = {
  name: string
}

export const FormCountrySelect: FC<Props> = ({name}) => {
  const [, meta, helpers] = useField(name);
  const countries = getCodes()
  
  return (
    <div className="user-form__row user-form__row--country">
      <p>Country:</p>
      <Select
        values={countries}
        currentValue={meta.value}
        setFieldValue={helpers.setValue}
        setFieldError={helpers.setError}
        title='country'
      />
      {meta.error && (
      <span className="user-form__error">
        {meta.error}
      </span>
      )}
    </div>
  )
}