import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import classNames from 'classnames'
import { FormikErrors, FormikTouched } from 'formik'
import { useState } from 'react'
import './select.scss'

type Props = {
  name: string
  title: string
  currentValue: string
  values: string[]
  onChange: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) =>
    | Promise<void>
    | Promise<
        FormikErrors<{
          email: string
          country: string
          phone: string
          password: string
          confirmPassword: string
          acceptTerms: boolean
        }>
      >
  onBlur: (
    touched: FormikTouched<{
      email: string
      country: string
      phone: string
      password: string
      confirmPassword: string
      acceptTerms: boolean
    }>,
    shouldValidate?: boolean | undefined
  ) =>
    | Promise<
        FormikErrors<{
          email: string
          country: string
          phone: string
          password: string
          confirmPassword: string
          acceptTerms: boolean
        }>
      >
    | Promise<void>
  formikTouched: FormikTouched<{
    email: string;
    country: string;
    phone: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  }>
}

export const Select: React.FC<Props> = ({
  name,
  title,
  currentValue,
  values,
  formikTouched,
  onChange,
  onBlur
}) => {
  const [listStatus, setStatus] = useState(false)
  const longestValueLength = Math.max(...values.map((value) => value.length))
  const longestValue = values.find(
    (value) => value.length === longestValueLength
  )

  const changeSelect = (value: string) => {
    onBlur({...formikTouched, country: true})
    onChange(name, value)
    setStatus(false)
  }

  const selectNone = () => {
    changeSelect('')
  }

  return (
    <div className="select">
      <div
        className={classNames('select__field', {
          'select__field--unselected': !currentValue,
        })}
        onClick={() => setStatus(!listStatus)}
      >
        {(currentValue && (
          <>
            <span className={`fi fi-${currentValue.toLocaleLowerCase()}`} />{' '}
            {currentValue}
          </>
        )) ||
          title}
        {listStatus ? (
          <ArrowDropUp className="select__arrow" />
        ) : (
          <ArrowDropDown className="select__arrow" />
        )}
      </div>
      <div className="select__width-expander">
        <span className="fi fi-ua" />
        {' ' + longestValue}
      </div>
      <ul
        className={classNames('select__list', {
          'select__list--active': listStatus,
        })}
      >
        <li
          onClick={selectNone}
          key="None"
          className="select__list-item"
        >
          None
        </li>
        {values.map((value) => (
          <li
            onClick={() => changeSelect(value)}
            key={value}
            className={classNames('select__list-item', {
              'select__list-item--active': value === currentValue,
            })}
          >
            <span className={`fi fi-${value.toLocaleLowerCase()}`} />
            {' ' + value}
          </li>
        ))}
      </ul>
    </div>
  )
}
