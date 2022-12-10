const Pool = require("pg").Pool;
require('dotenv').config();

export class dbConnection {

    constructor()
    {
        new Pool({
            user: process.env.DB_USER,
            password: process.env.DB_USER,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_DATABASE
          });
    }
} 

/* const pool = new Pool({
  user: process.env.user,
  password: process.env.password,
  host: process.env.host,
  port: process.env.port,
  database: process.env.database
});

module.exports = pool; */