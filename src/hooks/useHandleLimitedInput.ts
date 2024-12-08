import React, { useState } from 'react'

export const useHandleLimitedInput = <T extends HTMLInputElement | HTMLTextAreaElement>({
  callback,
  defaultValue = '',
  limit,
  strict,
}: {
  callback?: (value: string) => void
  defaultValue?: string
  limit: number
  strict?: boolean
}) => {
  const [limitCorrect, setCorrect] = useState(true)
  const [value, setValue] = useState(defaultValue)

  const handleChange = (e: React.ChangeEvent<T>) => {
    if (e.target.value.length > limit) {
      setCorrect(false)
      if (strict) {
        return
      }
    }
    setValue(e.target.value)
    callback?.(e.target.value)
  }

  return { handleChange, limitCorrect, setValue, value }
}
