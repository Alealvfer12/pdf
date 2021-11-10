process.env.NODE_CONFIG_DIR = './src/config';

//Import dependencies
const express = require('express');
const cors = require('cors');
const config = require('config');


//Initialize express
const app = express();


app.use(express.json());
app.use(cors());


//Endpoint
app.get('/', (req,res) =>{
    res.send('Welcome ');
});

const ruta_pdf = require('./libs/bovinos/routes/bovinos');
app.use(ruta_pdf);



//Port
const port = config.get('SERVER.port');

//Levantamiento
app.listen(port, () => {
    console.log(`Escuchando API en http://localhost:${port}`);
 });


 module.exports = app
