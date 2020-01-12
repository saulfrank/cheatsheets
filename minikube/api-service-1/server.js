const express = require('express');
const Request = require("request");
// const fetch = require("node-fetch");
const fetchTimeout = require('fetch-timeout');
const app = express();
const port = 3000;
require('dotenv').config();
// const HOST = '0.0.0.0';
// app.use(express.json());

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

    // pull from random app api
    // TODO: change to environment variable
    // TODO: chnage to async await
    // http://192.168.64.2:30739/randomadd
    // http://api-service-2-service/randomadd
    //-------- python micro service 2 [JSON response] -------
    try {
        console.log(`${process.env.global_pipeline_stage}`);
        console.log(`${process.env.api2_python}/randomadd`);

        let api2 = await fetchTimeout(`${process.env.api2_python}/randomadd`,options,3000,"API2 timeout :(");
        const api2_data = await api2.json();
        // console.log(api2_data);
        await res.write('hello there!\n\nThis is the micro service 1 made with node express.\n\nYour random number is ' + api2_data.randomadd +
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

    await res.status(200).send();
    //
});

app.get('/about', function (req, res) {
    console.log('about');
    res.send('About, World!')
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