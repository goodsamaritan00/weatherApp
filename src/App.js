import React, { useEffect } from 'react'

import { useState } from 'react'

import { ImLocation } from 'react-icons/im';

// spinner
import { ClipLoader } from 'react-spinners'

// styles
import styles from './styles/App.module.css'


import { CurrByHour } from './components/CurrByHour'
import { CurrForecast } from './components/CurrForecast'


// options
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '0b77ce5851mshaa9b819cb6abbacp1a2e77jsnff4965e0f865',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
  }
};


function App() {

   // search location
const [input, setInput] = useState('Berlin')
const [location, setLocation] = useState(input)

// weatherData
const [weatherData, setWeatherData] = useState([])

// loader
const [loader, setLoader] = useState(true)

// set unit
const [unit, setUnit] = useState(true)

const changeLocation = async () => {
  setLoader(true)

  const res = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&days=5`, options)
  const data = await res.json()
  setWeatherData(data)
  setLoader(false)

  console.log(data)
}


useEffect(() => {
  changeLocation()
}, [location])

  return (
    <div className={styles.currWrapper}>
      {loader === true ? <ClipLoader className={styles.loader} /> : 
        <>
      <div className={styles.inputChangeUnit}>
        <div className={styles.input}>
          <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={() => setLocation(input)} ><ImLocation /></button>
        </div>
        <div className={styles.changeUnit}>
            <button onClick={() => setUnit(true)}>°C</button>
            <span></span>
            <button onClick={() => setUnit(false)}>°F</button>
        </div>
      </div>
        <div>
          <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
        </div>
        <div className={styles.currByHour}>
        <div>
            <img src={weatherData.current.condition.icon} />
        </div>
        <div>
          <p className={styles.temperature}>{unit ? weatherData.current.temp_c + '°C' : weatherData.current.temp_f + '°F' }</p>
          <p>Feels like: {unit ? weatherData.current.feelslike_c + '°C' : weatherData.current.feelslike_f + '°F'}</p>
        </div>
        <div>
          
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Max. Temperature: {unit ? weatherData.forecast.forecastday[0].day.maxtemp_c + '°C' : weatherData.forecast.forecastday[0].day.maxtemp_f + '°F'}</p>
          <p>Min. Temperature: {unit ? weatherData.forecast.forecastday[0].day.mintemp_c + '°C' : weatherData.forecast.forecastday[0].day.mintemp_f + '°F'}</p>
        </div>
        <div className={styles.byHour}>
            {weatherData.forecast.forecastday[0].hour.map((item) => {
              return <CurrByHour unit={unit} item={item} />
          })}
        </div>
      </div>
      <div className={styles.forecast}>
          {weatherData.forecast.forecastday.map((day) => {
            return <CurrForecast day={day} unit={unit}  />
          })}
      </div>
        </>
      }
    </div>
  );
}

export default App;
