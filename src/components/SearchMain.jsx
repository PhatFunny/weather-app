import React, {useEffect, useState} from 'react';
import WeatherDetail from './WeatherDetail';

function SearchMain() {
    const [searchTerm, seSearchTerm] = useState('mumbai');
    const [tempInfo, setTempInfo] = useState({});

    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=3ac9f91cc876228c2435f57f86ba19c8`

            let res = await fetch(url);
            let data = await res.json();
            
            const {temp, humidity, pressure} = data.main;
            const {main: weatherType} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country, sunset} = data.sys; 

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weatherType,
                name,
                speed,
                country,
                sunset
            };

            setTempInfo(myNewWeatherInfo);

        } catch (error){
            console.log(error);
        }
    }

    useEffect(() => {
        getWeatherInfo()
    }, [])
    
    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input 
                        type='search' 
                        placeholder='Type city name ...' 
                        id='search' 
                        value={searchTerm}
                        onChange={(e) => seSearchTerm(e.target.value) }/>
                </div>
                <button className='searchButton' onClick={getWeatherInfo}>
                    Search
                </button> 
            </div>
            <WeatherDetail {...tempInfo} />
        </>
    )
}

export default SearchMain