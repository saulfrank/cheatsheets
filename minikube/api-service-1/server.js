const express = require('express');
const Request = require("request");
const app = express();
const port = 3000;
// const HOST = '0.0.0.0';
// app.use(express.json());

//send back 200 hello world
app.get('/', function (req, res) {
    console.log('hello');
    // console.log(process.env);

    // pull from random app api
    // TODO: change to environment variable
    // TODO: chnage to async await
    // http://192.168.64.2:30739/randomadd
    // http://api-service-2-service/randomadd
    Request.get("http://api-service-2-service/randomadd", (error, response, body) => {
        if(error) {
            res.write('Something went wrong with service 2: ' + error);
            return console.log(error);
        }

        const res_data = JSON.parse(body);
        console.log(res_data.randomadd);
        if(typeof res_data !== 'undefined' && res_data){
            res.write('hello there!\n\nThis is the micro service 1 made with node express.\n\nYour random number is ' + res_data.randomadd +
                ' \n\nThe random number comes from micro service 2 made with python fast api.');

            //------- talk to the golang micro service -------
            Request.get("http://api-service-3-service/ping", (error, response, body) => {
                if(error) {
                    res.write('Something went wrong with service 3: ' + error);
                    return console.log(error);
                }

                const res_data2 = JSON.parse(body);
                console.log(res_data2.message);
                if(typeof res_data2 !== 'undefined' && res_data2){
                    res.write('\n\n' + res_data2.message);
                    res.status(200).send();
                }
                else
                {
                    res.write('Something went wrong with Service 3: ' + res_data2);
                    // return console.log(error);
                }
            });
            ///res_data.randomadd
        }
        else
        {
            res.write('Something went wrong with Service 2 (random number not set): ' + res_data);
            // return console.log(error);
        }
    });





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