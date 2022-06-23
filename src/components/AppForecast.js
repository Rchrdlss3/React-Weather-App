import React from 'react'
import {useState,useEffect} from 'react';

const url = `https://api.openweathermap.org/data/2.5/onecall?lat=40.8708917&lon=-73.9562796&appid=a8432471d54acd78ce5ac100db93f665`

function AppForecast({forecastdata}) {
  const [forecastdays,setForecastdays] = useState(['test']); 
  const getforecastDays = async () => {
  const temp = await fetch (url)
    .then(res=> res.json());
    const fordayone = new Date(temp.daily[1].dt*1000);
    const fordaytwo = new Date(temp.daily[2].dt *1000);
    const fordaythree = new Date(temp.daily[3].dt *1000);
    const fordayfour = new Date(temp.daily[4].dt *1000);
    const fordayfive = new Date(temp.daily[5].dt *1000);
    setForecastdays([fordayone.getDate(),fordaytwo.getDate(),fordaythree.getDate(),fordayfour.getDate(),fordayfive.getDate()])
  }
  useEffect(()=>{
  getforecastDays();
  },[]);

  return (
    <div>
      <div className ='forecastrow' >
      <div className='forecast-datetime'>{forecastdays ?<h1>
            <ul>
            <li>{forecastdays[0]}</li>
            <li>{forecastdays[1]}</li> 
            <li>{forecastdays[2]}</li>
            <li>{forecastdays[3]}</li>
            <li>{forecastdays[4]}</li>
            </ul>
            </h1>:null}
            </div>
        {forecastdata.map((forecast) => {
          return(  
            <div className ="forecast-day" ><img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} /> {Math.round((forecast.temp.day-273.15)*9/5+32)}°
            <div className='forecast-highlow'>H:{Math.round((forecast.temp.max-273.15)*9/5+32)}° L:{Math.round((forecast.temp.min-273.15)*9/5+32)}°</div>
            </div>
          )}
            )}
      </div>
      
      <div/>
    </div>
  )
}

export default AppForecast