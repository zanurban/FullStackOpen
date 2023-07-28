import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Result from './components/Result'
import Search from './components/Search'

const App = () => {
  const [searchName, setSearchName] = useState('')
  const [visibleCountries, setVisibleCountries] = useState({})
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  const url = `https://studies.cs.helsinki.fi/restcountries/api/all`

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setCountries(response.data)
        filterCountries(response.data)
      })
      .catch(error => console.error(error));
  }, [url])

  useEffect(() => {
    let visibilityState = {}
    countries.forEach(country => visibilityState[country.name] = false)
    setVisibleCountries(visibilityState)
  }, [countries])

  useEffect(() => {
    filterCountries(countries);
  }, [searchName, countries]);

  const filterCountries = (countries) => {
    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(searchName.toLowerCase())
    )
    setFilteredCountries(filtered);
  }

  return (
    <div>
      <Search searchName={searchName} setSearchName={setSearchName} />
      <Result 
        countries={filteredCountries} 
        visibleCountries={visibleCountries} 
        setVisibleCountries={setVisibleCountries}
      />
    </div>
  )
}

export default App
