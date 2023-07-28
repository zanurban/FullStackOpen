import Country from './Country'

const Result = ({ countries, searchName, visibleCountries, setVisibleCountries }) => {

  const isSingleResult = () => countries.length === 1;
  const isFewResults = () => countries.length >= 2 && countries.length <= 10;
  const isManyResults = () => countries.length > 10;

  if (!searchName) {
    return <div></div>
  }

  if (isSingleResult()) {
    return (
      <div>
        <Country country={countries[0]} visibleCountries={visibleCountries} setVisibleCountries={setVisibleCountries} />
      </div>
    )
  }

  if (isFewResults()) {
    return (
      <div>
        {countries.map(country =>
          <div key={country.name}>
            <Country country={country} visibleCountries={visibleCountries} setVisibleCountries={setVisibleCountries} />
          </div>
        )}
      </div>
    )
  }

  if (isManyResults()) {
    return <div>Too many matches, specify another filter</div>
  }

  return <div></div>
}

export default Result
