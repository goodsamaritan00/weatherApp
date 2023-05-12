import React from 'react'

export const CurrForecast = ({ day, unit }) => {
  return (
    <div>
        <p>{day.date}</p>
        <img src={day.day.condition.icon} />
        <p>{unit ? day.day.avgtemp_c + '°C' : day.day.avgtemp_f + '°F'}</p>
        <p>Chance of rain: {day.day.daily_chance_of_rain}%</p>
    </div>
  )
}
