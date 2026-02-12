const express = require('express');
const { body, query } = require('express-validator');
const router = express.Router();
const motoristasController = require('../../controladores/motoristas/controladorMotorista');

// Reglas de validación 
const motoristaValidationRules = [
    body('primerNombre').notEmpty().withMessage('El primer nombre es obligatorio'),
    body('primerApellido').notEmpty().withMessage('El primer apellido es obligatorio'),
    body('dni').notEmpty().withMessage('El DNI es obligatorio'),
];

const motoristaIdValidation = [
    query('id').isInt().withMessage('El ID debe ser un número entero')
];

// Rutas
router.get('/listar', motoristasController.getMotoristas);
router.post('/guardar', motoristaValidationRules, motoristasController.createMotorista);
router.put('/editar', [...motoristaIdValidation, ...motoristaValidationRules], motoristasController.updateMotorista);
router.delete('/eliminar', motoristaIdValidation, motoristasController.deleteMotorista);

module.exports = router;