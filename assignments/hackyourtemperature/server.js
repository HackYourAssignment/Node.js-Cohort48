import app from './app.js'
const PORT = 3000;


//make server listen to port 3000
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});