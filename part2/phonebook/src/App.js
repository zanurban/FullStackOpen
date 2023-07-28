import { useState, useEffect } from "react";
import services from "./services/Services.js";
import Persons from "./components/Persons.js";
import Add from "./components/Add.js";
import Filter from "./components/Filter.js";
import Notification from "./components/Notification.js";
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
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  const handleInput = (event) => {
    event.preventDefault();

    if (persons.some((x) => x.name === newName)) {
      const personToUpdate = persons.find((x) => x.name === newName);

      if (
        window.confirm(
          `${personToUpdate.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const newObject = { ...personToUpdate, number: newNumber };
        services
          .updateData(
            "http://localhost:3001/persons",
            personToUpdate.id,
            newObject
          )
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personToUpdate.id ? person : updatedPerson
              )
            );
            setfilteredPersons(
              persons.map((person) =>
                person.id !== personToUpdate.id ? person : updatedPerson
              )
            );
            setMessage(
              `Updated ${personToUpdate.name} phone number to ${newObject.number}`
            );
            setMessageType("success");
            setTimeout(() => {
              setMessage(null);
              setMessageType("");
            }, 2000);
          })
          .catch((error) => {
            console.log(error);
            setMessage(`Error: Could not update ${personToUpdate.name}`);
            setMessageType("error");
            setTimeout(() => {
              setMessage(null);
              setMessageType("");
            }, 2000);
          });
      }
    } else if (newName.length > 0 && newNumber.length > 0) {
      const noteObject = {
        name: newName,
        number: newNumber,
        id: persons[persons.length - 1].id + 1,
      };

      const updatedPersons = persons.concat(noteObject);
      setPersons(updatedPersons);
      setfilteredPersons(updatedPersons);

      services.createData("http://localhost:3001/persons", noteObject);
      setMessage(`Added ${noteObject.name}`);
      setMessageType("success");
      setTimeout(() => {
        setMessage(null);
        setMessageType("");
      }, 2000);
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
        setPersons((prevPersons) =>
          prevPersons.filter((person) => person.id !== id)
        );
        setfilteredPersons((prevPersons) =>
          prevPersons.filter((person) => person.id !== id)
        );
        setMessage(`Deleted ${name}`);
        setMessageType("success");
        setTimeout(() => {
          setMessage(null);
          setMessageType("");
        }, 2000);
      });
    }
  };

  return (
    <div>
      <Notification message={message} messageType={messageType} />
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
