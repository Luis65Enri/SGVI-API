const express = require('express');
const { body, query } = require('express-validator');
const router = express.Router();
const registrosController = require('../../controladores/registros/controladorRegistros');

const registroValidations = [
    body('vehiculoId').isInt().withMessage('ID de vehículo no válido'),
    body('motoristaId').isInt().withMessage('ID de motorista no válido'),
    body('tipo').isIn(['Entrada', 'Salida']).withMessage('Tipo debe ser Entrada o Salida'),
    body('kilometraje').isDecimal().withMessage('Kilometraje debe ser un número'),
];

router.get('/movimientos/listar', registrosController.getRegistros);
router.post('/movimientos/guardar', registroValidations, registrosController.createRegistro);

module.exports = router;