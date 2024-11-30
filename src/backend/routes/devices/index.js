const express = require('express')

const routerDevice = express.Router()

var pool = require('../../mysql-connector');

// Obtener el listado de todos los dispositivos
routerDevice.devicesGet = async (req, res) => {
    pool.query(`SELECT
	        d.dispositivoId, d.nombre, d.ubicacion, e.nombre AS ElectroValvula
        FROM
	        Dispositivos d 
        INNER JOIN Electrovalvulas e
        WHERE d.electrovalvulaId = e.electrovalvulaId`, function (err, result, fields) {
        if (err) {
            res.status(404).send('404 - Dispositivos no encontrados');
            return;
        }
        res.send(result);
    });
};

// Obtener el detalle del dispositivo seleccionado
routerDevice.deviceGetData = async (req, res) => {
    pool.query(`SELECT 
            d.nombre, d.ubicacion, m.fecha, m.medicionId, m.valor
        FROM Dispositivos d 
        INNER JOIN Mediciones m 
        WHERE d.dispositivoId = ${req.params.id} 
        ORDER BY m.medicionId DESC `, function (err, result, fields) {
        if (err) {
            res.status(404).send('404 - Datos del dispositivo no encontrado');
            return;
        }
        res.send(result);
    });
};

// Obtener el estado de la valvula del dispositivo seleccionado en Log_Riegos
routerDevice.deviceGetStateValv = async (req, res) => {
    pool.query(`SELECT apertura
        FROM Log_Riegos
        WHERE electrovalvulaId = ${req.params.id} 
        ORDER BY logRiegoId DESC LIMIT 1
        `, function (err, result, fields) {
        if (err) {
            res.status(404).send('404 - Estado de apertura de la válvula del dispositivo no encontrado');
            return;
        }
        res.send(result);
    });
};

// Actualizar el estado de la electrovalvula del dispositivo seleccionado
routerDevice.deviceChangeSwitchStatus = async (req, res) => {
    // Validar los datos de entrada
    const { state, measure, valve, device } = req.body;

    if (typeof state !== 'number' || typeof measure !== 'number' || typeof valve !== 'number' || typeof device !== 'number') {
        return res.status(400).send('Los datos proporcionados no son números');
    }

    if (state !== 0 && state !== 1) {
        return res.status(400).send('El estado de la válvula debe ser 0 (cerrada) o 1 (abierta)');
    }

    if (measure < 0 || measure > 100) {
        return res.status(400).send('La medición de humedad debe estar entre 0 y 100');
    }

    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send('Error al conectar a la base de datos');
        }

        connection.beginTransaction((err) => {
            if (err) {
                return connection.rollback(() => {
                    connection.release();
                    return res.status(500).send('Error al iniciar la transacción');
                });
            }

            // Insertar el registro en Log_Riegos
            connection.query('INSERT INTO Log_Riegos (apertura, fecha, electrovalvulaId) VALUES (?, NOW(), ?)', 
                [state, valve], (err, result) => {
                if (err) {
                    return connection.rollback(() => {
                        connection.release();
                        return res.status(409).send('Error al insertar en Log_Riegos: ' + err.message);
                    });
                }

                // Insertar el registro en Mediciones
                connection.query('INSERT INTO Mediciones (fecha, valor, dispositivoId) VALUES (NOW(), ?, ?)', 
                    [measure, device], (err, result) => {
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            return res.status(409).send('Error al insertar en Mediciones: ' + err.message);
                        });
                    }

                    // Finalizar la transacción. Verificar si hubo error en la transacción
                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                return res.status(500).send('Error al confirmar la transacción');
                            });
                        }

                        // Enviar los datos
                        connection.release();
                        return res.send('Datos insertados correctamente');
                    });
                });
            });
        });
    });
};

module.exports = routerDevice   