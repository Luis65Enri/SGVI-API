const https = require('https');
const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3120;
const port2 = process.env.PORT2 || 3121;

app.listen(port, () => {
    //console.log(`Servidor escuchando en http://localhost:${port}`);
    console.log(`Ingresa a la documentación en http://localhost:${port}`);
});
