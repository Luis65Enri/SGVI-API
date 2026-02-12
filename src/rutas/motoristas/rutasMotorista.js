const express = require('express');
const { body, query } = require('express-validator');
const router = express.Router();
const motoristasController = require('../../controladores/motoristas/controladorMotorista');

// Reglas de validación 
const motoristaValidationRules = [
    body('primerNombre')
        .trim()
        .notEmpty().withMessage('El primer nombre es obligatorio')
        .isLength({ max: 50 }).withMessage('Máximo 50 caracteres'),
    body('segundoNombre')
        .optional({ checkFalsy: true })
        .trim(),
    body('primerApellido')
        .trim()
        .notEmpty().withMessage('El primer apellido es obligatorio')
        .isLength({ max: 50 }).withMessage('Máximo 50 caracteres'),
    body('segundoApellido')
        .optional({ checkFalsy: true })
        .trim(),
    body('dni')
        .trim()
        .notEmpty().withMessage('El DNI es obligatorio')
        .isLength({ max: 20 }).withMessage('El DNI no puede exceder los 20 caracteres'),
    body('licencia')
        .optional({ checkFalsy: true })
        .trim(),
    body('telefono')
        .optional({ checkFalsy: true })
        .trim(),
    body('estado')
        .notEmpty().withMessage('El estado es obligatorio')
        .isIn(['Activo', 'Inactivo']).withMessage('Estado no válido')
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