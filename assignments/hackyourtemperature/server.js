/*new server*/
import express from 'express';
import fetch from 'node-fetch';
const PORT = 3000;

//create an instance of express application
const app = express();

//middleware to parse json
app.use(express.json());

//set up route to handle requests
app.get('/', (req, res) => {
    res.send(`hello from backend to frontend!`)
});

app.post('/weather', async (req, res) => {
    const { cityName } = req.body; //destructure request body to get the city name
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keys.API_KEY}`;

    if (!cityName) {
        return res.status(400).json({ error: "City name is required" });
    }
    if (cityName.length > 100) {
        return res.status(400).json({ error: "City name is too long" });
    }
    if (typeof cityName !== 'string') {
        return res.status(400).json({ error: "City name must be a string" });
    }


    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        if (data.cod === '404') {
            res.json({ weatherText: "City is not found!" });
        } else {
            const temperature = data.main.temp;
            const city= data.name;

            const weatherText = `The current temperature in ${city} is ${temperature}°C`;
            res.json({ weatherText });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});