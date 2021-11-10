const {pool, Pool} = require('pg');
require('dotenv').config();

class ServicePg {
    
    constructor(db_config){
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB,
            password: process.env.DB_PASSWORD,
            ssl: { rejectUnauthorized: false },
            port: process.env.DB_PORT
    });
    }

// Ejecuta la clase y el metodo se debe hacer
// de forma asincrona para que respuesta tenga un valor
  
async executeSQL(sql,params) {
    let response = await this.pool.query(sql,params);
    return response;
  }
}


module.exports = ServicePg;