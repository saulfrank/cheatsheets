const express = require('express');
const Request = require("request");
// const fetch = require("node-fetch");
const fetchTimeout = require('fetch-timeout');
const responseTime = require('response-time');
const {promisify} = require('util');
// const axios = require('axios');
const redis = require('redis');
const { Pool } = require('pg');
require('dotenv').config();

//--------- Initiate the Express app -----
const app = express();
const port = 3000;
// const HOST = '0.0.0.0';
// app.use(express.json());
// use response-time as a middleware
app.use(responseTime());

//---- connect to REDIS ------
// create and connect redis client to local instance.
//TODO: timeout
const client = redis.createClient(process.env.redis_connect);
//
console.log(process.env.redis_connect);
// console.log(client);
client.on('ready', function() {
    redisIsReady = true;
    console.log('redis is running');
});
const getAsync = promisify(client.get).bind(client);

// Print redis errors to the console
client.on('error', (err) => {
    console.log("Error " + err);
});

//------------ DATABASE CONNECTION ---------------
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
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
});



//send back 200 hello world
app.get('/', async (req, res) => {
    console.log('hello');
    // console.log(process.env);

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

    };


    //-------- python micro service 2 [JSON response] -------
    try {
        console.log(`${process.env.global_pipeline_stage}`);
        console.log(`${process.env.api2_python}/randomadd`);

        let api2 = await fetchTimeout(`${process.env.api2_python}/randomadd`,options,3000,"API2 timeout :(");
        const api2_data = await api2.json();
        // console.log(api2_data);
        await res.write('hello there!\n\nThis is the micro service 1 made with node express.\n\nAll API and database calls are asynchronous.\n\nYour random number is ' + api2_data.randomadd +
            ' \n\nThe random number comes from micro service 2 made with python fast api.');

    } catch (err) {
        res.status(500).end('\n\nSomething went wrong with api 2 :( - ' + err);
    }

    //-------- Go micro service 3 [JSON response] -------
    try {
        console.log(`${process.env.api3_go}/ping`);
        let api3 = await fetchTimeout(`${process.env.api3_go}/ping`,options,3000,"API3 timeout :(");
        const api3_data = await api3.json();

        // console.log(api3_data);

        await res.write('\n\n' + api3_data["message"]);

    } catch (err) {
        res.status(500).end('\n\nSomething went wrong with api 3 :( - ' + err);
    }

    //--- talk to redis
    const datetime = new Date();
    client.set('now_key', datetime, 'EX', 10, redis.print);

    const redis_data = await getAsync('now_key');
    await res.write('\n\nRedis time stored and retrieved: ' + redis_data);

    // async/await - check out a client
    res.write('\n\n\n\nProstgresql database retrieved sample data: ');

    let response;
    try {
        response = await pool.query('SELECT c.first_name, c.last_name, a.address ' +
            'FROM customer c, address a where a.address_id =c.address_id limit 10');
        // return response.rows;
        response.rows.forEach(row => {
            res.write('\n\n' + row["first_name"] + ' ' + row["last_name"] + ' - ' + row["address"]);
        });
    } catch (error) {
        // handle error
        // do not throw anything
        console.log('database error');
        console.log(error);
    }


    // console.log(data);


    res.status(200).send();
    //
});
// ().catch(err => console.log(err.stack));

app.get('/about', function (req, res) {
    console.log('about');
    res.send('About, World!');
});

app.get('/environment', (req, res)=>{

    var env = process.env;

    Object.keys(env).forEach(function(key) {
        res.write('export ' + key + '="' + env[key] +'"\n');
    });

    res.status(200).send();
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!");
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));