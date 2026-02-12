const { validationResult } = require('express-validator');
const Motorista = require('../../modelos/motoristas/motorista');
const db = require('../../configuraciones/db');

// Obtener todos los motoristas
exports.getMotoristas = async (req, res) => {
    try {
        const motoristas = await Motorista.findAll({
            where: { estado: true }
        });
        res.json(motoristas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los motoristas' });
    }
};

// Crear un nuevo motorista
exports.createMotorista = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    try {
        const motorista = await Motorista.create(req.body);
        res.status(201).json(motorista);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el motorista' });
    }
};

// Actualizar un motorista
exports.updateMotorista = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    try {
        const { id } = req.query;
        const motorista = await Motorista.findByPk(id);

        if (!motorista) {
            return res.status(404).json({ error: 'Motorista no encontrado' });
        }

        await motorista.update(req.body);
        res.json({ message: 'Motorista actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el motorista' });
    }
};

exports.deleteMotorista = async (req, res) => {
    try {
        const { id } = req.query;
        const motorista = await Motorista.findByPk(id);

        if (!motorista) {
            return res.status(404).json({ error: 'Motorista no encontrado' });
        }

        await motorista.destroy();

        res.json({ message: 'Motorista eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el motorista. Verifique que no tenga registros asociados.' });
    }
};