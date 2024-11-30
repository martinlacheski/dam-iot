//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

const cors = require('cors');

var express = require('express');
var app = express();
var pool = require('./mysql-connector');
const routerDevice = require('./routes/devices')

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

//app.use('/devices', routerDevice)

app.get('/devices', routerDevice.devicesGet)
app.get('/device/:id', routerDevice.deviceGetData)
app.get('/device/state/:id', routerDevice.deviceGetStateValv)
app.post('/device/change/', routerDevice.deviceChangeSwitchStatus)


// Mensaje inicial
app.listen(PORT, function(req, res) {
    console.log(`NodeJS API running correctly on port ${PORT}`);
});
