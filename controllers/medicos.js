const { response } = require('express');
const Medico = require('../models/medico');


const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre email img')
        .populate('hospital', 'nombre');
    res.json({
        ok: true,
        medicos
    });
};

const getMedicoById = async(req, res = response) => {

    const id = req.params.id;

    try {

        const medico = await Medico.findById(id)
            .populate('usuario', 'nombre email img')
            .populate('hospital', 'nombre');
        res.json({
            ok: true,
            medico
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'No se puede cargar el médico por ID'
        });
    }

};

const crearMedico = async(req, res = response) => {

    console.log(req.body);
    console.log(req.uid);

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        console.log(error);
        res.status().json({
            ok: false,
            msg: 'No se ha creado el medico'
        });
    }
};

const actualizarMedico = async(req, res = response) => {

    const id = req.params.id;

    const uid = req.uid;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: "Médico no encontrado"
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        };

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.json({
            ok: true,
            medico: medicoActualizado
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se encuentra el servidor'
        });
    }
};

const borrarMedico = async(req, res = response) => {

    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: "Hospital no encontrado"
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Médico eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se encuentra el servidor'
        });
    }
};

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
};