// Para leer variables de entorno
require('dotenv').config();

const path = require('path');

const express = require('express');
// CORS => Aceptar peticines de diferentes dominios
const cors = require('cors');
// Importa la config de mongoose
const { dbConnection } = require('./database/config');
// Crea el servidor de express
const app = express();


// Configuración CORS
app.use(cors());

// Lectura y parse del BODY
app.use(express.json());

// MongoDB
dbConnection();
// user: cfibla
// password: alternativa10

//Directorio público
app.use(express.static('public'));


// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/uploads', require('./routes/uploads'));

// Si no encuentra ninguna ruta
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
})

// Arranca el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor escuchando puerto: ' + process.env.PORT);
});