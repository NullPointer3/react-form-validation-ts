import React, { useState } from 'react'
import './Form.css'
import isEmail from 'validator/lib/isEmail'

interface InputFields {
  name: string
  email: string
}
interface Errors  {
  name?: string
  email?: string
}

type OnInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => void
type OnFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => void
type Validate = (person: InputFields) => Errors

const Form = () => {
  const [inputFields, setInputFields] = useState<InputFields>({name: '', email: ''})
  const [people, setPeople] = useState<InputFields[]>([])
  const [fieldErros, setFieldErrors] = useState<Errors>({})
 

  const onInputChange: OnInputChange = evt => {
    const { name , value } = evt.target
    setInputFields(prev => ({
      ...prev,
      [name] : value
    }))
  }

  const onFormSubmit: OnFormSubmit = evt => {
    const person = inputFields
    const fieldErrors = validate(person)
    setFieldErrors( fieldErrors )
    evt.preventDefault()

    if(Object.keys(fieldErrors).length) return 
    
    setPeople(prev => [...prev, person])
    setInputFields({
      name:'',
      email: ''
    })
    
  }

  const validate: Validate = person => {
    const errors: Errors = {}
      
    if(!person.name) errors.name = 'Name Required'
    if(!person.email) errors.email = 'Email Requied'
    if(person.email && !isEmail(person.email)) errors.email = 'Invalid Email'
    return errors
  }

  return (
    <main>
      <form action="#"
        onSubmit={onFormSubmit}
      >
        <div>
          <input 
            name='name'
            type="text"
            placeholder='Name'
            value={inputFields.name}
            onChange={onInputChange}
          />
          <span className='errors'>{fieldErros.name}</span>
        </div>
        <div>
          <input 
            type="text"
            name='email'
            placeholder='Email'
            value={inputFields.email}
            onChange={onInputChange}
          />
          <span className='errors'>{fieldErros.email}</span>
        </div>
        <input type="submit"/>
      </form>
      <div>
        <h3>People</h3>
        <ul>
          {people.map((person, i) => (
            <li key={i}>{person.name} ({person.email})</li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default Form