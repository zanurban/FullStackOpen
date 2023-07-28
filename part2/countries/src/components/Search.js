const Search = ({ searchName, setSearchName }) => {

    const handleInputChange = (event) => {
      let value = event.target.value || '';
      setSearchName(value)
    }
  
    return (
      <div>
        find countries <input value={searchName} onChange={handleInputChange} />
      </div>
    )
  }
  
  export default Search
  