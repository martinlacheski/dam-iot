var PORT = 3000;

const cors = require('cors');

var express = require('express');
var app = express();
var pool = require('./mysql-connector');
const routerDevice = require('./routes/devices')

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

// Para parsear a application/json
app.use(express.json());

// to serve static files
app.use(express.static('/home/node/app/static/'));

// Para habilitar cors
app.use(cors(corsOptions));

// Rutas
app.get('/devices', routerDevice.devicesGet)
app.get('/device/:id', routerDevice.getDeviceByID)
app.get('/device/state/:id', routerDevice.deviceGetStateValv)
app.get('/device/data/:id', routerDevice.deviceGetData)
app.post('/device/change/', routerDevice.deviceChangeSwitchStatus)


// Mensaje inicial
app.listen(PORT, function(req, res) {
    console.log(`NodeJS API running correctly on port ${PORT}`);
});
