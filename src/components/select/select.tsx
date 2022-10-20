import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import classNames from 'classnames'
import { useState } from 'react'
import './select.scss'

type Props = {
  name: string
  title: string
  currentValue: string
  values: string[]
  setFieldValue: (field: string, value: string | undefined) => void
  setFieldError: (field: string, value: string | undefined) => void
}

export const Select: React.FC<Props> = ({
  name,
  title,
  currentValue,
  values,
  setFieldValue,
  setFieldError,
}) => {
  const [listStatus, setListStatus] = useState(false)
  const [searchStatus, setSearchStatus] = useState(false)
  const [searchQuery, setQuery] = useState(currentValue)
  const longestValueLength = Math.max(...values.map((value) => value.length))
  const longestValue = values.find(
    (value) => value.length === longestValueLength
  )

  const handleClick = () => {
    setListStatus(!listStatus)
    setSearchStatus(!searchStatus)
  }

  const changeSelect = (value: string) => {
    setFieldValue(name, value)
    setFieldError(name, '')
    setListStatus(false)
    setSearchStatus(false)
    setQuery('')
  }

  const selectNone = () => {
    changeSelect('')
  }

  return (
    <div className="select">
      {searchStatus ? (
        <input 
          className="select__field"
          value={searchQuery}
          onChange={(e) => setQuery(e.target.value)}
        />
      ) : (
        <div
          className={classNames('select__field', {
            'select__field--unselected': !currentValue,
          })}
          onClick={handleClick}
        >
          {(currentValue && (
            <>
              <span className={`fi fi-${currentValue.toLocaleLowerCase()}`} />{' '}
              {currentValue}
            </>
          )) ||
            title}
        </div>
      )}
      <ArrowDropDown 
        className={classNames('select__arrow', {'select__arrow--up': listStatus})}
        onClick={() => setListStatus(!listStatus)}
      />
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
        {values.map((value) => {
          if (value.includes(searchQuery.toLocaleUpperCase())) {
            return (
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
            )
          }
        })}
      </ul>
    </div>
  )
}
