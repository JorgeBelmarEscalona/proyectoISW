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
        const monto = req.body.monto_b;
        const tipoBeneficio = req.body.type_b.toLowerCase();

        //Se verifica si es que el tipo de beneficio es utilidades, vivienda o alimentacion
        if (tipoBeneficio === "utilidades" || tipoBeneficio === "vivienda" || tipoBeneficio === "alimentacion") {
            
            //Se verifica si el monto ingresado es válido para el tipo de beneficio proporcionado
            if (tipoBeneficio === "utilidades" && monto >= 1000 && monto <= 5000000) {
                beneficio.fecha_b = moment(beneficio.fecha_b).format('DD-MM-YYYY');
                const newBeneficio = await beneficio.save();
                res.status(201).json({ message: 'Utilidad encontrada', beneficio: newBeneficio });

            //Se verifica si el monto ingresado es válido para el tipo de beneficio proporcionado
            } else if (tipoBeneficio === "vivienda" && monto >= 7269430 && monto <= 79903670) {
                beneficio.fecha_b = moment(beneficio.fecha_b).format('DD-MM-YYYY');
                const newBeneficio = await beneficio.save();
                res.status(201).json({ message: 'Vivienda encontrada', beneficio: newBeneficio });

            //Se verifica si el monto ingresado es válido para el tipo de beneficio proporcionado
            } else if (tipoBeneficio === "alimentacion" && monto >= 5000 && monto <= 1000000) {
                beneficio.fecha_b = moment(beneficio.fecha_b).format('DD-MM-YYYY');
                const newBeneficio = await beneficio.save();
                res.status(201).json({ message: 'Alimentacion encontrada', beneficio: newBeneficio });
            } else {
                res.status(400).json({ message: 'El monto ingresado no es válido para el tipo de beneficio proporcionado' });
            }
        } else {
            res.status(400).json({ message: 'Tipo de beneficio no válido' });
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
