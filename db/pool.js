#! .env.development 

const { Pool } = require("pg");

module.exports = new Pool({
  host: process.env.HOST, 
  user: process.env.ROLE_NAME,
  database: "inventory",
  password: process.env.ROLE_PASSWORD,
  port: 5432
});