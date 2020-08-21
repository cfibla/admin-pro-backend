// Para leer variables de entorno
require('dotenv').config();

const express = require('express');
// CORS => Aceptar peticines de diferentes dominios
const cors = require('cors');
// Importa la config de mongoose
const { dbConnection } = require('./database/config');
// Crea el servidor de express
const app = express();

// MongoDB
dbConnection();
// user: cfibla
// password: alternativa10

// Configuración CORS
app.use(cors());

// Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });
});


// Arranca el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor escuchando puerto: ' + process.env.PORT);
});