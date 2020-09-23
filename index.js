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

// Lectura y parse del BODY
app.use(express.json());

// Configuración CORS
app.use(cors());

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/uploads', require('./routes/uploads'));

// Arranca el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor escuchando puerto: ' + process.env.PORT);
});