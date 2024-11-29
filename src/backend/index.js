//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

const cors = require('cors');

var express = require('express');
var app = express();
var pool = require('./mysql-connector');
const routerDispositivo = require('./routes/dispositivo')

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// to parse application/json
app.use(express.json());

// to serve static files
app.use(express.static('/home/node/app/static/'));

// to enable cors
app.use(cors(corsOptions));

app.use('/dispositivo', routerDispositivo)


// Mensaje inicial
app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});
