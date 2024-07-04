import express from 'express';

//create an instance of express application
const app = express();

//middleware to parse json
app.use(express.json());

//set up route to handle GET requests
app.get('/', (req, res) => {
   res.send(`hello from backend to frontend!`)
});
app.post('/weather', (req, res) => {
   const { cityName } = req.body; //destructure request body to get the city name
   res.send(`City name received: ${cityName}`);
});

const PORT = 3000;
//make server listen to port 3000
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});