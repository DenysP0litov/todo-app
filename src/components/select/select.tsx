import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import classNames from 'classnames'
import { useState } from 'react'
import './select.scss'

type Props = {
  title: string
  currentValue: string
  values: string[]
  onChange: (value: string) => void
}

export const Select: React.FC<Props> = ({
  title,
  currentValue,
  values,
  onChange,
}) => {
  const [listStatus, setStatus] = useState(false)
  const longestValueLength = Math.max(...values.map((value) => value.length))
  const longestValue = values.find((value) => value.length === longestValueLength)

  const changeSelect = (value: string) => {
    onChange(value)
    setStatus(false)
  }

  return (
    <div className="select">
      <div
        className={classNames('select__field', {
          'select__field--unselected': !currentValue,
        })}
        onClick={() => setStatus(!listStatus)}
      >
        {currentValue || title}
        {listStatus ? (
          <ArrowDropUp className="select__arrow" />
        ) : (
          <ArrowDropDown className="select__arrow" />
        )}
      </div>
      <div className='select__width-expander'>
        <span className="fi fi-ua" />
        {' ' + longestValue}
      </div>
      <ul
        className={classNames('select__list', {
          'select__list--active': listStatus,
        })}
      >
        <li
          onClick={() => changeSelect('')}
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
