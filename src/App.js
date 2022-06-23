import AppForecast from './components/AppForecast';
import AppInfo from './components/AppInfo';
import AppWeather from './components/AppWeather';
import Appinit from './components/Appinit';
import AppMap from './components/AppMap';

import React, {useState,useEffect} from 'react';
import axios from 'axios';
import magGlass from './assets/search.png';

/*
Import images from assets folder for tri-state navigation
*/
import nyimg from './assets/ny.png';
import ctimg from './assets/ct.png';
import paimg from './assets/pa.png';
import njimg from './assets/nj.png';

function App() {
// this is my key: a8432471d54acd78ce5ac100db93f665
const [data,fetchData] = useState({ 
  "lat": 39.31, "lon": -74.5, "timezone": "America/New_York", "timezone_offset": -18000, "current": 
  {"dt": 1646318698, "sunrise": 1646306882, "sunset": 1646347929, "temp": 282.21, "feels_like": 278.41, "pressure": 1014, "humidity": 65, "dew_point": 275.99, "uvi": 2.55, "clouds": 40, "visibility": 10000, "wind_speed": 8.75, "wind_deg": 360, "wind_gust": 13.89, "weather": 
[{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d"}]}, "daily":[{"dt":1655827200,"sunrise":null,"sunset":null}]});
const [locdata,fetchLocationData] = useState([{"name":"Englewood Cliffs","state": "New Jersey" , "country":"US"}])
const [location,fetchLocation] = useState('')
const [loading,isLoading] = useState(true)
const [userPos,fetchUserPos] = useState({lat:40.8708917,lon:-73.9562796})

const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${userPos.lat}&lon=${userPos.lon}&appid=a8432471d54acd78ce5ac100db93f665`
//const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${userPos.lat}&lon=${userPos.lon}&appid=a8432471d54acd78ce5ac100db93f665`
const geourl =`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=a8432471d54acd78ce5ac100db93f665`
const [forecastdata,setForecast] = useState([]);
const [forecastdays,setForecastdays] = useState(['test']);


const getForecast = async () => {
  const temp = await fetch (url)
  .then(res=> res.json());
  setForecast(temp.daily.slice(1,6))
   //setday2(fordaytwo.getDate())
  const fordayone = new Date(temp.daily[1].dt*1000);
  const fordaytwo = new Date(temp.daily[2].dt *1000);
  const fordaythree = new Date(temp.daily[3].dt *1000);
  const fordayfour = new Date(temp.daily[4].dt *1000);
  const fordayfive = new Date(temp.daily[5].dt *1000);
  setForecastdays([fordayone.getDate(),fordaytwo.getDate(),fordaythree.getDate(),fordayfour.getDate(),fordayfive.getDate()])
  
}

useEffect(()=>{
  getForecast();
  isLoading(false);
  console.log(forecastdays)
},[]);


const updateLocation = () =>{
  axios.get(url).then((response) =>{
    fetchData(response.data)
    setForecast(response.data.daily.slice(1,6))
    const fordayone = new Date(response.daily[1].dt*1000);
    const fordaytwo = new Date(response.daily[2].dt *1000);
    const fordaythree = new Date(response.daily[3].dt *1000);
    const fordayfour = new Date(response.daily[4].dt *1000);
    const fordayfive = new Date(response.daily[5].dt *1000);
    setForecastdays([fordayone.getDate(),fordaytwo.getDate(),fordaythree.getDate(),fordayfour.getDate(),fordayfive.getDate()])
  })
}
const getStateLocationNY = ()=> {
  fetchUserPos({lat:40.7128 ,lon:74.0060})
  fetchLocation('New York')
  axios.get(geourl).then((response) => {
  fetchLocationData(response.data)});
  updateLocation();
}
const getStateLocationNJ = ()=> {
  fetchUserPos({lat: 40.0583, lon: 74.4057})
  fetchLocation('New Jersey')
  axios.get(geourl).then((response) => {
  fetchLocationData(response.data)});
  updateLocation();
}
const getStateLocationCT = ()=> {
  fetchUserPos({lat: 41.6032, lon: 73.0877})
  fetchLocation('Connecticut')
  axios.get(geourl).then((response) => {
  fetchLocationData(response.data)});
  updateLocation();
}
const getStateLocationPA = ()=> {
  fetchUserPos({lat: 39.9526, lon: 75.1652})
  fetchLocation('Philadelphia')
  axios.get(geourl).then((response) => {
  fetchLocationData(response.data)});
  updateLocation();
}

const searchLocation = (event) => {
  if(event.key === 'Enter') {
  axios.get(geourl).then((response) => {
    fetchLocationData(response.data)
    fetchUserPos({
      lat: response.data[0].lat,
      lon: response.data[0].lon
    })

    console.log(response)
  })
  updateLocation();
  }
  
}

  return (
<div className="App">
  <div className='head-init'>
      <Appinit/>
      <div className='head-searchbar'> 
      <input 
            value={location}
            onChange = {event => fetchLocation(event.target.value)} 
            onKeyPress = {searchLocation}
            placeholder= "Enter Location Here."
            type = "text" >
      </input>
        <button type="submit" className="search-button">
        <img src= {magGlass}/></button>
    </div>
  </div> 
      <AppInfo locdata = {locdata}/>
      <div className='tri-state-nav'>
      <ul>
      <li><button  onClick={getStateLocationNY}><img src={nyimg} /></button></li>
      <li><button  onClick={getStateLocationNJ}><img src={njimg} /> </button></li>
      <li><button  onClick={getStateLocationPA}><img src={paimg} /></button></li>
      <li><button  onClick={getStateLocationCT}><img src={ctimg} /></button></li>
      </ul>
    </div>
      <AppWeather data = {data}/>
      <AppForecast forecastdays={forecastdays} forecastdata={forecastdata} />
    <AppMap />
    <div className="custom-shape-divider-bottom-1655908463">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
    </svg>
</div>
</div>
  );
}

export default App;
