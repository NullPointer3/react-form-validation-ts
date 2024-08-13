import React, { useState } from 'react'
import  isEmail  from 'validator/lib/isEmail'
import Field from './Field.tsx'

interface InputFields {
  name: string,
  email: string
}

interface Errors {
  name?: string,
  email?: string
}

type OnFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => void
type Validate = () => boolean


const Form = () => {
  const [inputFields, setInputFields] = useState<InputFields>({
    name: '',
    email: ''
  })
  const [people, setPeople] = useState<InputFields[]>([])
  const [fieldErrors, setFieldErrors] = useState<Errors>({})

  const validate: Validate = () => {
    const person = inputFields
    const errors = fieldErrors 
    const errMessages = Object.keys(errors).filter(k => errors[k])

    if(!person.name) return true
    if(!person.email) return true
    if(errMessages.length) return true
    return false
  }

  const onInputChange = ({name, value, error}: 
    { 
      name: string, 
      value: string, 
      error: string | boolean
    }) => {
    const fields = inputFields
    const errors = fieldErrors
    
    fields[name] = value
    errors[name] = error
    
    setInputFields(fields)
    setFieldErrors(errors)
  }

  const onFormSubmit: OnFormSubmit = (evt) => {
    const person = inputFields
    evt.preventDefault()

    if(validate()) return

    setPeople(prev => [...prev, person])
    setInputFields({
      name: '',
      email: ''
    })
  }
  return (
    <main className="">
      <div className="">
        <form onSubmit={onFormSubmit} >
          <Field
            placeholder="Name"
            name="name"
            value={inputFields.name}
            onChange={onInputChange}
            validate={val => (val? false : "Name Required")}
          />
          <Field
            placeholder='Email'
            name='email'
            value={inputFields.email}
            onChange={onInputChange}
            validate={val => (isEmail(val)? false: 'Invalid Email')}
          />
          <input 
            type="submit" 
            value="Submit" 
            className=""
            disabled={validate()}
          />
        </form>
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700">People</h3>
          <ul className="mt-4 space-y-2">
            {people.map((person, i) => (
              <li key={i} className="text-gray-700">
                {person.name} <span className="text-gray-500">({person.email})</span>
              </li>
           ))}
          </ul>
        </div>
      </div>
    </main>

  )
}

export default Form