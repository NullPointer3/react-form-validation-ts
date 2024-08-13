import React, { useEffect, useState } from 'react'

interface Props {
  placeholder: string,
  name: string,
  value: string,
  onChange: ({name, value, error}: 
    { 
      name: string, 
      value: string, 
      error: string | boolean
    }) => void
  validate: (input: string) => boolean | string
}

const Field = (props: Props) => {
  const [value, setValue] = useState<string>(props.value)
  const [isError, setError] = useState<boolean | string>(false)

  useEffect(() => {
    setValue(props.value)
  },[props.value])

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const name = props.name
    const { value } = evt.target
    const error = props.validate ? props.validate(value) : false
    setValue(value)
    setError(error)

    props.onChange({ name, value, error})
  }
  return (
    <div>
      <input
        placeholder={props.name}
        value={value}
        onChange={onChange}
      />
      <span>{isError}</span>
    </div>
  )
}

export default Field