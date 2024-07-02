
import express from 'express';

const app = express();
const PORT = 3000;

// middleware

app.use(express.json());


// create a post route
app.post('/weather', (req, res) => {
    let  {cityName}  = req.body;
    if (!cityName) {
        return res.status(400).send('You need to provide a city name');
    } else {
        return res.status(200).send(cityName);
    }
});


app.get('/', (req, res) => {
    res.send('hello from backend to frontend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

