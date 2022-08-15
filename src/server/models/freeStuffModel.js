const { Pool } = require('pg');

// connecting to ElephantSQL DB
const PG_URI =
  'postgres://nnnbaxad:holoSBgq1fi8vo1XFR-0eCTo0eziwglq@heffalump.db.elephantsql.com/nnnbaxad';

// create a new pool here using connection string from URI
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
