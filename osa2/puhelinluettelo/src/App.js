import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import NewPersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const person = persons.find(p => p.name === newName)

    // name not found, create new entry
    if (!person) {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          showNotification(`Added ${returnedPerson.name}`)
        })
      
      return
    }

    // name found, change number
    if (person.number !== newNumber) {
      if (window.confirm(
        `${person.name} is already added to phonebook,`
        + ` replace the old number with a new one?`
      )) {
        const updatedPerson = { ...person, number: newNumber }

        personService
          .update(updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(
              p => p.id !== returnedPerson.id ? p : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
            showNotification(`Updated number for ${returnedPerson.name}`)
          })
      }

      return
    }

    // name found, do nothing
    alert(`${newName} is already added to phonebook`)
  }

  const deleteEntry = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(response => {
          if (response.status === 200) {
            setPersons(persons.filter(p => p.id !== id))
            showNotification(`Contact deleted`)
          }
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter
        filter={filter}
        handleChange={handleFilterChange}
      />
      <h2>Add new</h2>
      <NewPersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons
        persons={personsToShow}
        deletePerson={deleteEntry}
      />
    </div>
  )

}

export default App
