// Import the beneficio model
const Beneficio = require('../models/beneficio.model');

// GET /beneficios - Get all beneficios
exports.getBeneficio = async (req, res) => {
    try {
        const beneficios = await Beneficio.find();
        res.status(200).json(beneficios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /beneficios/:id - Get a single beneficio by id
exports.getBeneficioById = async (req, res) => {
    try {
        const beneficio = await Beneficio.findById(req.params.id);
        if (!beneficio) {
            return res.status(404).json({ message: 'Beneficio no encontrado' });
        }
        res.status(200).json(beneficio);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /beneficios - Create a new beneficio
exports.createBeneficio = async (req, res) => {
    const beneficio = new Beneficio(req.body);
    try {
        const newBeneficio = await beneficio.save();
        res.status(201).json(newBeneficio);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE /beneficios/:id - Delete a beneficio by id
exports.deleteBeneficio = async (req, res) => {
    try {
        const beneficio = await Beneficio.findById(req.params.id);
        if (!beneficio) {
            return res.status(404).json({ message: 'Beneficio no encontrado' });
        }
        await beneficio.findByIdandDelete();
        res.status(200).json({ message: 'Eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PUT /beneficios/:id - Update a beneficio by id
exports.updateBeneficio = async (req, res) => {
    try {
        const beneficio = await Beneficio.findById(req.params.id);
        if (!beneficio) {
            return res.status(404).json({ message: 'Beneficio no encontrado' });
        }
        Object.assign(beneficio, req.body);
        const updatedBeneficio = await beneficio.save();
        res.status(200).json(updatedBeneficio);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
