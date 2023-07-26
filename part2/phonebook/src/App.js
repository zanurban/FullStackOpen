import { useState } from 'react'
import Persons from './components/Persons.js'
import Add from './components/Add.js'
import Filter from './components/Filter.js'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '031769811' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [filteredPersons, setfilteredPersons] = useState([{name: '',number: ''}])
  const handleInput = (event)=>{
    event.preventDefault()
    
    if(persons.some(x => x.name==newName)){
      window.alert(`${newName} is already added to phonebook`);
    }
    else if(newName.length > 0 && newNumber.length > 0){
      const noteObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(noteObject))
      setNewName('')
      setNewNumber('')
    }
  }
  const handleInputChange = (event) =>{
    setNewName(event.target.value)
  }
  const handleInputChangeNumber = (event) =>{
    setNewNumber(event.target.value)
  }
  const handleChangeSearch = (event) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);
    if(searchTerm.length > 0){
      setfilteredPersons(persons.filter((x) => x.name.includes(searchTerm)));
      if(persons.filter((x) => x.name.includes(searchTerm)).length == 0){
        setfilteredPersons([{name:`Nobodies name does not include: ${searchTerm} `}])
      }
    }
    else{
      setfilteredPersons(persons)
    }
  }
  return (
    <div>
      <Filter search={search} handleChangeSearch={handleChangeSearch}/>
      <Add newName={newName} handleInputChange={handleInputChange} newNumber={newNumber} handleInputChangeNumber={handleInputChangeNumber} handleInput={handleInput}/>
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App