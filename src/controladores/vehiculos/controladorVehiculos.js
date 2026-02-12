const { validationResult } = require('express-validator');
const Vehiculo = require('../../modelos/vehiculos/vehiculo');
const db = require('../../configuraciones/db');

exports.getVehiculos = async (req, res) => {
    try {
        const vehiculos = await Vehiculo.findAll();
        res.json(vehiculos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los vehículos' });
    }
};

exports.createVehiculo = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());

    try {
        const vehiculo = await Vehiculo.create(req.body);
        res.status(201).json(vehiculo);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el vehículo' });
    }
};

exports.updateVehiculo = async (req, res) => {
    const { id } = req.query;
    try {
        const vehiculo = await Vehiculo.findByPk(id);
        if (!vehiculo) return res.status(404).json({ error: 'Vehículo no encontrado' });

        await vehiculo.update(req.body);
        res.json({ message: 'Vehículo actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el vehículo' });
    }
};

exports.deleteVehiculo = async (req, res) => {
    try {
        const { id } = req.query;
        await Vehiculo.destroy({ where: { id } });
        res.json({ message: 'Vehículo eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar. Asegúrese que no tenga registros asociados.' });
    }
};