import { useState, useEffect } from "react";
import services from "./services/Services.js";
import Persons from "./components/Persons.js";
import Add from "./components/Add.js";
import Filter from "./components/Filter.js";
const App = () => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    services.getData("http://localhost:3001/persons").then((response) => {
      setPersons(response);
      setfilteredPersons(response);
    });
  }, []);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPersons, setfilteredPersons] = useState([
    { name: "", number: "" },
  ]);
  const handleInput = (event) => {
    event.preventDefault();

    if (persons.some((x) => x.name === newName)) {
      const personToUpdate = persons.find((x) => x.name === newName); 
    
      if(window.confirm(`${personToUpdate.name} is already added to phonebook, replace the old number with a new one?`)){
    
        const newObject = {
          ...personToUpdate,  // copy the existing person object
          number: newNumber  // overwrite the number property with the new number
        };
    
        services.updateData("http://localhost:3001/persons", personToUpdate.id, newObject)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== personToUpdate.id ? person : updatedPerson));
            setfilteredPersons(persons.map(person => person.id !== personToUpdate.id ? person : updatedPerson));
          });
      }
    } 
    
    else if (newName.length > 0 && newNumber.length > 0) {
      const noteObject = {
        name: newName,
        number: newNumber,
        id: persons[persons.length - 1].id + 1,
      };

      const updatedPersons = persons.concat(noteObject);
      setPersons(updatedPersons);
      setfilteredPersons(updatedPersons);

      services.createData("http://localhost:3001/persons", noteObject);

      setNewName("");
      setNewNumber("");
    }
  };
  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };
  const handleInputChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const handleChangeSearch = (event) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);
    if (searchTerm.length > 0) {
      setfilteredPersons(persons.filter((x) => x.name.includes(searchTerm)));
      if (persons.filter((x) => x.name.includes(searchTerm)).length == 0) {
        setfilteredPersons([
          { name: `Nobodies name does not include: ${searchTerm} ` },
        ]);
      }
    } else {
      setfilteredPersons(persons);
    }
  };
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      services.deleteData("http://localhost:3001/persons", id).then(() => {
        setPersons((prevPersons) => prevPersons.filter((person) => person.id !== id));
        setfilteredPersons((prevPersons) => prevPersons.filter((person) => person.id !== id));
      });
    }
  };
  
  return (
    <div>
      <Filter search={search} handleChangeSearch={handleChangeSearch} />
      <Add
        newName={newName}
        handleInputChange={handleInputChange}
        newNumber={newNumber}
        handleInputChangeNumber={handleInputChangeNumber}
        handleInput={handleInput}
      />
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
