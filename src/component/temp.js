import React, {useState, useEffect} from 'react'
import "./style.css"
import Weathercard from './weatherCard'

const Temp = () => {

    const [searchValue, setSearchValue] = useState("pune")
    const [tempInfo, setTempInfo] = useState({})
    
    const getWeatherInfo = async() => {
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=4cecad4f35fddedb45faa0552a9159d5`
            
            let res = await fetch(url)
            let data = await res.json()
            const{temp,humidity, pressure} = data.main
            const{main:weathermode} = data.weather[0]
            const{name} = data
            const{speed} = data.wind
            const{country,sunset} = data.sys

            const myNewWeatherInfo = {
                temp,
                humidity, 
                pressure,
                weathermode,
                name,
                country,
                sunset,
                speed
            }

            setTempInfo(myNewWeatherInfo)
    
        }catch(error)
        {
            console.log(error)
        }
    }
    
    useEffect(()=>{
        getWeatherInfo()
    },[])
    
  return (
    <>
    <div className="wrap">
        <div className="search">
            <input type="search"
            placeholder="search..."
            autoFocus id="search"
            className="searchTerm" 
            value={searchValue}
            onChange={(e)=>{setSearchValue(e.target.value)}}/>
            <button className="searchButton" type="button" onClick={getWeatherInfo}>Search</button>
        </div>
    </div>

    <Weathercard tempInfo = {tempInfo}/>
    </>
  )
}

export default Temp