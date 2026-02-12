const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
// Carga las variables de entorno
require('dotenv').config();
// Rutas
const rutas = require('./rutas/index');
// Tablas
const db = require('./configuraciones/db');
const { CrearModelos } = require('./modelos');

/*
db.authenticate()
  .then(() => {
    console.log(
      "============== Se conecto con el servidor de DB =============="
    );
    CrearModelos();
  })
  .catch((error) => console.log(error));
*/

//Funciones
const limitador = rateLimit({
  windowMs: 1000 * 60 * 10, // 10 minutos
  max: 10000, // Maximo de peticiones
});

const app = express();
// Middlewares
app.use(morgan('dev'));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "http://localhost:3001", "data:"], // Permite imágenes desde tu backend
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
  crossOriginResourcePolicy: false, // Permite recursos desde otros orígenes
}));
app.use(limitador);
app.use(cors(require('./configuraciones/cors')));
app.use(express.json());
app.use((req, res, next) => { 
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); 
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, api_key, Authorization'); 
  next(); 
});
app.use('/api', rutas);

module.exports = app;