const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;


    // Validar tipos
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.json({
            ok: false,
            msg: "Tipo no válido"
        });
    }

    // Validar que existe archivo para subir
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: "No hay ningún archivo"
        });
    }

    // Extraer la imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.'); // imagen1.01.3.s.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length - 1]; // Me quedo con la última parte de array (la extensión)

    // Validar la extensión
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: "No es una extensión válida"
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Mover la imagen
    // Use the mv() method to place the file somewhere on your server
    file.mv(path, function(err) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: "Error al subir la imagen"
            });
        }

        // Actualizar imagen
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });

};

const retornaImagen = (req, res = response) => {
    // console.log('HOLA');
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    console.log(pathImg);

    // Comprueba si existe la img
    if (fs.existsSync(pathImg)) {
        // Envía el archivo como respuesta (no un Json)
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.png`);
        // Envía imagen por defecto
        res.sendFile(pathImg);
    }

};

module.exports = {
    fileUpload,
    retornaImagen
};