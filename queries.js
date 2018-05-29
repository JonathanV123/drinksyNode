const { Pool, Client } = require('pg');
require('dotenv').config({ path: 'variables.env' })
const connectionString = process.env.PG_CONNECTION_STRING;

// pools will use environment variables
// for connection information

const pool = new Pool({
    connectionString: connectionString,
})

pool.query('select * from test_table', (err, res) => {
  console.log(err, res)
  pool.end()
})
 

// async function test_connection() {
//     try {
//         let response = await pool.query("select * from jonTable");
//         console.log(response.rows);
//     }
//     catch(error){
//         console.log(error);
//     }
 
// }

// test_connection();