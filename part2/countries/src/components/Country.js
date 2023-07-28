import axios from 'axios'
import { useState, useEffect } from 'react'
import Button from './Button'

const Country = ({ country, visibleCountries, setVisibleCountries }) => {
  const [weather, setWeather] = useState({})

  const WEATHER_API_KEY = process.env.REACT_APP_API_KEY
  const weatherApiUrl = `http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${country.capital}`

  useEffect(() => {
    axios.get(weatherApiUrl)
      .then(response => {
        const { current } = response.data
        setWeather({
          icon: current.weather_icons[0],
          temperature: current.temperature,
          windSpeed: current.wind_speed,
          windDirection: current.wind_dir
        })
      })
      .catch(error => console.error(error))
  }, [weatherApiUrl])

  if (!visibleCountries[country.name]) {
    return (
      <div>
        {country.name}
        <Button visibleCountries={visibleCountries} setVisibleCountries={setVisibleCountries} name={country.name} />
      </div>
    )
  }

  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt="Country Flag" width="8%" />
      <h3>Weather in {country.capital}</h3>
      <div>
        <h4>Temperature</h4>
        <p>{weather.temperature} Celsius</p>
        <img src={weather.icon} alt="Weather Icon" width="5%" />
        <h4>Wind</h4>
        <p>Speed: {weather.windSpeed} mph</p>
        <p>Direction: {weather.windDirection}</p>
      </div>
    </div>
  )
}

export default Country
