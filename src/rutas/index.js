const { Router } = require('express');
const Rutas = Router();
Rutas.use('/motoristas', require('./motoristas/rutasMotorista'));
Rutas.use('/vehiculos', require('./vehiculos/rutasVehiculo'));
Rutas.use('/registros', require('./registros/rutasRegistro'));

module.exports = Rutas; 