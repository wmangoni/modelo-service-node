const common = require('lambda-common');
const pg     = require('pg');

const DB_HOST     = process.env.DB_HOST;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_USER     = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT     = process.env.DB_PORT;

const poolDB = new pg.Pool({
  database: DB_DATABASE,
  user    : DB_USER,
  password: DB_PASSWORD,
  host    : DB_HOST,
  port    : DB_PORT,
  max     : 1,
  min     : 0,
  idleTimeoutMillis      : 120000,
  connectionTimeoutMillis: 10000
});

const executeQuery = (consulta, params = []) => {
  return poolDB.connect()
    .then(client => {
      return client.query(consulta, params)
        .then(result => {
          client.release(true);
          return result.rows;
        })        
        .catch(error => {
          client.release(true);
          common.logger.error('executeQuery safea.db', error);
          return Promise.reject(error);
        });
    });
};

module.exports = {
  executeQuery
};