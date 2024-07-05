import express from 'express';
import fetch from 'node-fetch';
import { API_KEY } from './sources/keys.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello from backend to frontend!');
});

app.post('/weather', async (req, res) => {
    const { cityName } = req.body;

    if (!cityName) {
        return res.status(400).send({ weatherText: 'City name is required' });
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
        const data = await response.json();

        if (data.cod === '404') {
            return res.status(404).send({ weatherText: 'City is not found!' });
        }

        const temperature = data.main.temp;
        res.send({ weatherText: `Current temperature in ${cityName} is ${temperature}K` });
    } catch (error) {
        res.status(500).send({ weatherText: 'Error fetching weather data' });
    }
});

export default app;
