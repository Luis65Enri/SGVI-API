const express = require('express');
const { body, query } = require('express-validator');
const router = express.Router();
const registrosController = require('../../controladores/registros/controladorRegistros');
const Vehiculo = require('../../modelos/vehiculos/vehiculo');
const Motorista = require('../../modelos/motoristas/motorista');
const Registro = require('../../modelos/registros/registro');

const registroValidations = [
    body('vehiculoId')
        .isInt().withMessage('El ID de vehículo debe ser un número entero')
        .notEmpty().withMessage('El vehículo es obligatorio')
        .custom(async (value, { req }) => {
            const buscarVehiculo = await Vehiculo.findOne({ where: { id: value } });
            if (!buscarVehiculo) {
                throw new Error('El vehículo no existe');
            }
            const conteoTotal = await Registro.count({ where: { vehiculoId: value } });
            if (conteoTotal >= 2) {
                throw new Error('Este vehículo ya completó su ciclo de Entrada y Salida (máximo 2 registros).');
            }
            const yaExisteTipo = await Registro.findOne({
                where: {
                    vehiculoId: value,
                    tipo: req.body.tipo
                }
            });
            if (yaExisteTipo) {
                throw new Error(`El vehículo ya tiene un registro de ${req.body.tipo}. Debe registrar una ${req.body.tipo === 'Entrada' ? 'Salida' : 'Entrada'}.`);
            }
            return true;
        }),
    body('motoristaId')
        .isInt().withMessage('El ID de motorista debe ser un número entero')
        .notEmpty().withMessage('El motorista es obligatorio')
        .custom(async (value) => {
            const buscarMotorista = await Motorista.findOne({ where: { id: value } });
            if (!buscarMotorista) {
                throw new Error('El motorista no existe');
            }
        }),
    body('tipo')
        .isIn(['Entrada', 'Salida']).withMessage('El tipo debe ser "Entrada" o "Salida"'),
    body('kilometraje')
        .isDecimal().withMessage('El kilometraje debe ser un número decimal')
        .custom((value) => value >= 0).withMessage('El kilometraje no puede ser negativo'),
    body('fecha')
        .notEmpty().withMessage('La fecha es obligatoria')
        .isDate().withMessage('Formato de fecha no válido (YYYY-MM-DD)'),
    body('observaciones')
        .optional({ checkFalsy: true })
        .isLength({ max: 255 }).withMessage('Las observaciones no pueden exceder los 255 caracteres'),
];

router.get('/listar', registrosController.getRegistros);
router.post('/guardar', registroValidations, registrosController.createRegistro);

module.exports = router;