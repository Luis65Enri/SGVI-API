const { validationResult } = require('express-validator');
const Registro = require('../../modelos/registros/registro');
const Vehiculo = require('../../modelos/vehiculos/vehiculo');
const Motorista = require('../../modelos/motoristas/motorista');
const { Op } = require('sequelize');

exports.getRegistros = async (req, res) => {
    try {
        const { fecha, vehiculoId, motoristaId } = req.query;
        let donde = {};

        if (fecha) donde.fecha = fecha;
        if (vehiculoId) donde.vehiculoId = vehiculoId;
        if (motoristaId) donde.motoristaId = motoristaId;

        const registros = await Registro.findAll({
            where: donde,
            include: [
                { model: Vehiculo, as: 'vehiculo', attributes: ['marca', 'modelo', 'placa'] },
                { model: Motorista, as: 'conductor', attributes: ['primerNombre', 'primerApellido'] }
            ],
            order: [['fecha', 'DESC'], ['hora', 'DESC']]
        });
        res.json(registros);
    } catch (error) {
        res.status(500).json({ error: 'Error al filtrar registros' });
    }
};

exports.createRegistro = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());

    try {
        const registro = await Registro.create(req.body);
        res.status(201).json(registro);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el registro de entrada/salida' });
    }
};