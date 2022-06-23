import React from 'react'
import axios from 'axios';

function AppMap(){
  return (
    <div>
        <div class='mapclass'>
            <div class='temp-row'>
        <img src='https://tile.openweathermap.org/map/temp_new/4/10/10?appid=a8432471d54acd78ce5ac100db93f665' /> 
        <h2>Temperature</h2>
        </div>
        <div class='clouds-row'>
       <img src='https://tile.openweathermap.org/map/clouds/4/10/10?appid=a8432471d54acd78ce5ac100db93f665' />
       <h2>Clouds</h2>
       </div>
       <div class='wind-row'>
       <img src='https://tile.openweathermap.org/map/wind_new/4/10/10?appid=a8432471d54acd78ce5ac100db93f665'/>
       <h2>Wind Speed</h2>
       </div>
       </div>
    </div>
  )
}

export default AppMap
