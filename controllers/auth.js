const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);

        let usuario;
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            // Si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // Si el usuario existe
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guarda usuario en DB
        await usuario.save();

        // ... y generar TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {

        res.json({
            ok: false,
            msg: 'Google SignIn - ERROR'
        });

    }

};


module.exports = {
    login,
    googleSignIn
};