const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // Validar email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Datos incorrectos'
            });
        }

        // Validar contraseña
        const validPassord = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassord) {
            return res.status(400).json({
                ok: false,
                msg: 'Datos incorrectos'
            });
        }
        // Generar TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            msg: 'Login correcto',
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
};


module.exports = {
    login
};