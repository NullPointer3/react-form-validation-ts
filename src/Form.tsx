import React, { useState } from 'react'
import  isEmail  from 'validator/lib/isEmail'

interface InputFields {
  name: string,
  email: string
}

interface Errors {
  name?: string,
  email?: string
}

type OnInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => void
type OnFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => void
type Validate = (person: InputFields) => Errors


const Form = () => {
  const [inputFields, setInputFields] = useState<InputFields>({
    name: '',
    email: ''
  })
  const [people, setPeople] = useState<InputFields[]>([])
  const [fieldErrors, setFieldErrors] = useState<Errors>({})

  const onInputChange: OnInputChange = (evt) => { 
    const { name,value } = evt.target
    setInputFields(prev => ({
      ...prev,
      [name]: value
    }))

  }

  const validate: Validate = (person) => {
    const errors: Errors = {}
    if(!person.name) errors.name = 'Name Required'
    if(!person.email) errors.email = 'Email Required'
    if(person.email && !isEmail(person.email)) errors.email = "Invalid Email"
    return errors 
  }

  const onFormSubmit: OnFormSubmit = (evt) => {
    const person = inputFields
    const errors = validate(person)
    setFieldErrors(errors)
    evt.preventDefault()

    if(Object.keys(errors).length) return

    setPeople(prev => [...prev, person])
    setInputFields({
      name: '',
      email: ''
    })
  }
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <form 
        action=""
        onSubmit={onFormSubmit}  
        className="space-y-6"
        >
          <div className="flex flex-col">
            <input 
              type="text" 
              name='name'
              placeholder='Name'
              value={inputFields.name}
              onChange={onInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-red-500 text-sm mt-1">{fieldErrors.name}</span>
          </div>
          <div className="flex flex-col">
            <input 
            type="text"
            name='email'
            placeholder='Email'
            value={inputFields.email}
            onChange={onInputChange} 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />  
            <span className="text-red-500 text-sm mt-1">{fieldErrors.email}</span>
          </div>
          <input 
            type="submit" 
            value="Submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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