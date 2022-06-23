import React from 'react'
import cloudimg from '../assets/clouds.png'
import humidimg from '../assets/humidity.png'
import sunriseimg from '../assets/sunrise.png'
import sunsetimg from '../assets/sunset.png'
function AppWeather({data}) {
  /*const unixTime = data.daily[0].dt;
  //const weatherdate = new Date(unixTime*1000);
  console.log(weatherdate)*/
  const imgurl = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`
  const date = new Date (data.current.sunrise*1000);
  const sunrisehr = date.getHours();
  const sunrisemin = date.getMinutes();
  const sunsetdate = new Date(data.current.sunset*1000);
  const sunsethr = (sunsetdate.getHours())-12;
  const sunsetmin = sunsetdate.getMinutes();
  return (
<div>
    {data.current ? <h1 className='tempdesc'>{data.current.weather[0].main}</h1>:null}
    {data.current ? <h1 className="temperature">{Math.round((data.current.temp-273.15)*9/5+32)}°</h1>:null}
    {data.current ? <img className='weatherimage' src={imgurl}/>:null}
    {data.current ? <h1 className="feelsLike">Feels Like: {Math.round((data.current.feels_like-273.15)*9/5+32)}°</h1>:null}
  <div className='weatherInfo'>
    {data.current ? <ul>
        <li><img src= {cloudimg}/><h3>Clouds:</h3> {data.current.clouds}  </li>
        <li><img src= {humidimg}/><h3> Humidity: </h3>{data.current.humidity}</li>
        <li><img src= {sunriseimg}/><h3>Sunrise: </h3>{sunrisehr}:{sunrisemin}am</li>
        <li><img src= {sunsetimg}/><h3>Sunset: </h3>{sunsethr}:{sunsetmin} pm</li>
        </ul>:null}
    </div>
    
</div>
  )
}

export default AppWeather
