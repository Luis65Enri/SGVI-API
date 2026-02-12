const express = require('express');
const { body, query } = require('express-validator');
const router = express.Router();
const vehiculosController = require('../../controladores/vehiculos/controladorVehiculos');

const vehiculoValidations = [
    body('marca').notEmpty().withMessage('Marca requerida'),
    body('modelo').notEmpty().withMessage('Modelo requerido'),
    body('placa').notEmpty().withMessage('Placa requerida').isLength({ min: 6 }),
];

router.get('/vehiculos/listar', vehiculosController.getVehiculos);
router.post('/vehiculos/guardar', vehiculoValidations, vehiculosController.createVehiculo);
router.put('/vehiculos/editar', vehiculoValidations, vehiculosController.updateVehiculo);
router.delete('/vehiculos/eliminar', vehiculosController.deleteVehiculo);

module.exports = router;