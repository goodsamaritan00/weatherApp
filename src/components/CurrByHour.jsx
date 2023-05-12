import React from 'react'

export const CurrByHour = ({ item, unit }) => {
  return (
    <div>
       <img src={item.condition.icon} />
       <p>{item.time}</p>
       <p>{unit ? item.temp_c + '°C' : item.temp_f + '°F'}</p>
    </div>
  )
}
