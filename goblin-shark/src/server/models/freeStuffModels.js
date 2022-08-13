const { Pool } = require('pg');

// connecting to ElephantSQL DB
const PG_URI = 'postgres://tbthajdp:P_2hIVBsSQcoCyymTDGN1-62v8VCyaBV@queenie.db.elephantsql.com/tbthajdp';

// create a new pool here using connection string from URI 
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
}