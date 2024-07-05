
import express from 'express';
import API_KEY from './sources/keys.js';
import fetch from 'node-fetch';

const app = express();

// middleware

app.use(express.json());

// create a post route
app.post('/weather', async (req, res) => {
    let { cityName } = req.body;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}`;
    console.log(cityName)
    if (!cityName) {
        return res.status(400).send('You need to provide a city name');
    }
    try {
        const apiResponse = await fetch(apiUrl);
        if (!apiResponse.ok) {
            throw new Error('API request failed');
        }
        const data = await apiResponse.json();
        const temp = data.main.temp;
        const tempCelsius = temp - 273.15;
        data.main.temp = tempCelsius;
        res.send({ weatherText: `The weather in ${cityName} is ${tempCelsius.toFixed(0)} degrees Celsius.`});
    } catch (error) {
        res.status(500).send({ weatherText: `City not found: ${cityName}`});
    }
});

// create a get route
app.get('/', (req, res) => {
    res.send('hello from backend to frontend!');
});

export default app;