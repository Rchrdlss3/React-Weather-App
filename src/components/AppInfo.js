import React from 'react'

function AppInfo({locdata}) {
  const currentdate = new Date()
  const date = `${currentdate.getMonth()+1}/${currentdate.getDate()}`;
  return (
    <div>
        <h1 className="locationName">{locdata[0].name}, {locdata[0].state} , {locdata[0].country}</h1>
        
    </div>
  )
}

export default AppInfo