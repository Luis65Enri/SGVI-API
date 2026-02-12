const cors = {
    origin: "*", // Permite solo solicitudes desde este dominio
    methods: 'GET,PUT,POST,DELETE', // Permite solo estos métodos HTTP
    allowedHeaders: ['Content-Type', 'Authorization'], // Permite solo estos encabezados
    credentials: true, // Permite enviar credenciales (cookies, tokens de autorización)
    optionsSuccessStatus: 200,
};
module.exports = cors;