const Sequelize = require("sequelize");

const {
  NOMBRE_DB,
  USUARIO_DB,
  CONTRASENA_DB,
  URL_DB,
  PORT_DB
} = process.env;

if (!NOMBRE_DB || !USUARIO_DB || !CONTRASENA_DB || !URL_DB || !PORT_DB) {
  console.log(process.env);
  throw new Error('Los valores de las variables de entorno son requeridos');
}

const db = new Sequelize(
  NOMBRE_DB,
  USUARIO_DB,
  CONTRASENA_DB,
  {
    host: URL_DB,
    dialect: "mysql",
    logging: false,
    port: PORT_DB,
    operatorAliases: false,
    timezone: "America/Tegucigalpa",
    dialectOptions: {
      timezone: "local",
    },
    define: {
      timestamps: false,
    },
    pool: {
      acquire: 30000,
      idle: 10000,
      min: 0,
      max: 5,
    },
  }
);
db.authenticate()
  .then(() => {
    console.log(
      "============== Se conecto con el servidor de DB =============="
    );
    return db.sync();
  })
  .catch((error) => console.log(error));


module.exports = db;