// Import the beneficio model
const Beneficio = require('../models/beneficio.model');
const moment = require('moment');

// GET /beneficios - Get all beneficios
exports.getBeneficio = async (req, res) => {
    try {
        const beneficios = await Beneficio.find();
        
        // Formatear la fecha_b de cada beneficio utilizando moment
        const formattedBeneficios = beneficios.map(beneficio => {
            return {
                ...beneficio.toObject(),
                fecha_b: moment(beneficio.fecha_b).format('DD-MM-YYYY')
            };
        });

        res.status(200).json(formattedBeneficios);
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

        // Formatear la fecha_b utilizando moment
        const formattedBeneficio = {
            ...beneficio.toObject(),
            fecha_b: moment(beneficio.fecha_b).format('DD-MM-YYYY')
        };

        res.status(200).json(formattedBeneficio);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /beneficios - Create a new beneficio
exports.createBeneficio = async (req, res) => {
    const beneficio = new Beneficio(req.body);
    
    
    try {


        if (req.body.type_b.toLowerCase() === "utilidades") {


            const newBeneficio = await beneficio.save();
            res.status(201).json({ message: 'Agua encontrada', beneficio: newBeneficio });
        } else {
            const newBeneficio = await beneficio.save();
            res.status(201).json(newBeneficio);
        }




    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE /beneficios/:id - Delete a beneficio by id
exports.deleteBeneficio = async (req, res) => {
    try {
      const beneficioId = req.params.id;
  
      const deletedBeneficio = await Beneficio.findByIdAndRemove( beneficioId);
      if (!deletedBeneficio) {
        res.status(404).json({ message: 'Registro de Beneficio no encontrado' });
      } else {
        res.status(200).json({ message: 'Registro de Beneficio eliminado correctamente' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
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
