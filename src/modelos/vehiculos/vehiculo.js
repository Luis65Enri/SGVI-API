const { DataTypes } = require('sequelize');
const sequelize = require('../../configuraciones/db');

const Vehiculo = sequelize.define('Vehiculo', {
    marca: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    modelo: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    placa: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    anio: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    vehiculoDetalle: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.marca} ${this.modelo} (${this.placa})`;
        },
    },
}, {
    tableName: 'vehiculos',
    timestamps: true,
});

module.exports = Vehiculo;