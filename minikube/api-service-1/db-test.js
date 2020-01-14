const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

//--------- Initiate the Express app -----
const app = express();
const port = 3001;

//------------ DATABASE CONNECTION ---------------
// const pg_config = {
//     user: 'test_user',
//     database: 'test_db',
//     password: 'Hello123^',
//     host: '127.0.0.1',
//     port: 5400,
//     max: 10, // max number of clients in the pool
//     idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed,
//     connectionTimeoutMillis: 1000
// };
var pg_port = 5432;
if(process.env.global_pipeline_stage == 'localhost'){pg_port=5400}

const pg_config = {
    user: process.env.pg_user,
    database: process.env.pg_database,
    password: process.env.pg_password,
    host: process.env.pg_host,
    port: pg_port,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed,
    connectionTimeoutMillis: 1000
};

console.log(pg_config);

const pool = new Pool(pg_config);

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
// pool.on('error', (err, client) => {
//     console.error('Unexpected error on idle client', err)
//     process.exit(-1)
// });

// async/await - check out a client


app.get('/', async function (req, res) {
    // console.log(pool);
    // const client = await pool.connect();
    // console.log(client);
    // console.log('about');

        const result = await pool.query('SELECT * FROM customer limit 10', (err, res) => {
            console.log(err, res);
            pool.end();
        });
    //     console.log(result.rows[0]);
     res.send('About, World!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));