import React, { useState } from 'react'

type InputFields = {
  name: string
  email: string
}
type OnInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => void
type OnFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => void 

const Form = () => {
  const [inputFields, setInputFields] = useState<InputFields>({name: '', email: ''})
  const [people, setPeople] = useState<InputFields[]>([])

  const onInputChange: OnInputChange = evt => {
    const { name , value } = evt.target
    setInputFields(prev => ({
      ...prev,
      [name] : value
    }))
  }

  const onFormSubmit: OnFormSubmit = evt => {
    const ppl = [...people, inputFields]
    setPeople(ppl)
    setInputFields({name:'', email:''})
    evt.preventDefault()
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
        </div>
        <div>
          <input 
            type="text"
            name='email'
            placeholder='Email'
            value={inputFields.email}
            onChange={onInputChange}
          />
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