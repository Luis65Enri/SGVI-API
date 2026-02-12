const Motorista = require('./motoristas/motorista');
const Vehiculo = require('./vehiculos/vehiculo');
const Registro = require('./registros/registro');

exports.CrearModelos = async () => {
    await Motorista.sync().then(() => {
        console.log('Modelo motorista creado correctamente');
    })
        .catch((er) => {
            console.log("Error al crear el modelo motorista");
            console.log(er);
        });
    await Vehiculo.sync().then(() => {
        console.log('Modelo vehiculo creado correctamente');
    })
        .catch((er) => {
            console.log("Error al crear el modelo vehiculo");
            console.log(er);
        });
    await Registro.sync().then(() => {
        console.log('Modelo registro creado correctamente');
    })
        .catch((er) => {
            console.log("Error al crear el modelo registro");
            console.log(er);
        });
}