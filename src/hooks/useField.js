import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value.toUpperCase())
  }

  const maxLength = 1

  const onReset = () => {
    setValue('')
  }

  const setMyValue = (value) => {
    setValue(value)
  }

  return {
    type,
    value,
    onChange,
    onReset,
    maxLength,
    setMyValue
  }
}