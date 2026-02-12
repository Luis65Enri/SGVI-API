const { DataTypes } = require('sequelize');
const sequelize = require('../../configuraciones/db');
const Vehiculo = require('../vehiculos/vehiculo');
const Motorista = require('../motoristas/motorista');

const Registro = sequelize.define('Registro', {
    tipo: {
        type: DataTypes.ENUM('Entrada', 'Salida'),
        allowNull: false,
    },
    motorista: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    kilometraje: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    tableName: 'registros',
    timestamps: true,
});

// Relaciones
Vehiculo.hasMany(Registro, { foreignKey: 'vehiculoId' });
Registro.belongsTo(Vehiculo, { foreignKey: 'vehiculoId' });
Motorista.hasMany(Registro, { foreignKey: 'motoristaId' });
Registro.belongsTo(Motorista, { foreignKey: 'motoristaId' });

module.exports = Registro;