const { DataTypes } = require('sequelize');
const sequelize = require('../../configuraciones/db');

const Motorista = sequelize.define('Motorista', {
    primerNombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    segundoNombre: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    primerApellido: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    segundoApellido: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    dni: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    licencia: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    telefono: {
        type: DataTypes.STRING(15),
        allowNull: true,
    },
    nombreCompleto: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.primerNombre} ${this.segundoNombre ? this.segundoNombre : ''} ${this.primerApellido} ${this.segundoApellido ? this.segundoApellido : ''}`.replace(/\s+/g, ' ').trim();
        },
        set(value) {
            throw new Error('No se puede asignar el nombre completo directamente');
        },
    },
    estado: {
        type: DataTypes.ENUM('Activo', 'Inactivo'),
        allowNull: false,
    },
}, {
    tableName: 'motoristas',
    timestamps: true,
});

module.exports = Motorista;