import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import axios from 'axios'
import Country from './components/Country'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  })

  const countriesToShow = () => {
    const shownCountries = countries.filter(country =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    )

    switch(true) {
      case shownCountries.length > 10:
        return <div>Too many matches, specify another filter</div>
      case shownCountries.length > 1:
        return shownCountries.map(country =>
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => setFilter(country.name.common)}>
              show
            </button>
          </div>
        )
      case shownCountries.length === 1:
        return <Country country={shownCountries[0]} />
      default:
        return <div>Nothing to show</div>
    }
  }
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <div>
        <Filter
          filter={filter}
          handleChange={handleFilterChange}
        />
      </div>
      <div>
        {filter.length > 0
          ? countriesToShow()
          : 'Use filter to search for countries'
        }
      </div>
    </div>
  )
}

export default App