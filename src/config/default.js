require('dotenv').config();

module.exports={
    SECRET_KEY:process.env.SECRET_KEY,
    SERVER:{
        port: process.env.PORT
    },
    DB:{
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB,
            password: process.env.DB_PASSWORD,
            ssl: { rejectUnauthorized: false },
            port: process.env.DB_PORT
    },
    registrosDisponiblesBovino:['controlCelo', 'controlParto', 
        'controlPrenez', 'controlRetiros', 'genealogicos']
}