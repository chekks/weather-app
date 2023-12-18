import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherFailure, fetchWeatherSuccess } from './redux/actions';

import searchIcon from './assets/search.png'

const api = {
  key: '12040234b5ed6f6502d1dd7af8317da2',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('Philippines');
    const { weather, error } = useSelector((state) => state);
    const { name, main } = weather;

    const onSearch = async () => {
        if (!search) return;

        try {
            const response = await fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`);
            const res = await response.json();

            if (!response.ok) {
                throw new Error(); // Throwing an empty error
            }

            dispatch(fetchWeatherSuccess(res));
        } catch {
            console.error('Error during API call.');
            dispatch(fetchWeatherFailure('Error fetching data.'));
        }   
    }

    useEffect(() => {
        onSearch();
    }, [])

    return (
        <div className="container">
            <h1> Weather App</h1>

            <div className='search'>
                <input type='text' placeholder='Search...' onChange={(e) => setSearch(e.target.value)}/>
                <div className='search-icon' onClick={onSearch} >
                    <img src={searchIcon} alt="Search Icon"/>
                </div>
            </div>

            {name && (
                <div className='weather'>
                    <h2>{name}</h2>

                    {main && main.temp !== undefined && (
                        <p>The temperature is <span>{main.temp}&deg;C</span></p>
                    )}
                </div>
            )}

            {error && <p className='error'> Enter a valid country</p>}
        </div>
    );
}

export default App;
