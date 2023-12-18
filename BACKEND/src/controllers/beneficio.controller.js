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

        res.status(302).json(formattedBeneficios);
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

        res.status(302).json(formattedBeneficio);
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
        const idBeneficio = req.body.id_beneficio;
        const nombreBeneficio = req.body.nombre_b;
        const fecha = moment(req.body.fecha_b, 'DD-MM-YYYY');

        // Check if idBeneficio is a negative number
        if (idBeneficio < 0) {
            return res.status(400).json({ message: 'El id_beneficio no puede ser un número negativo' });
        }

        // Verify if the type of beneficio is utilidades, vivienda, or alimentacion
        if (tipoBeneficio === "utilidades" || tipoBeneficio === "vivienda" || tipoBeneficio === "alimentacion") {
            
            // Verify if the entered monto is valid for the provided type of beneficio
            if (tipoBeneficio === "utilidades" && monto >= 1000 && monto <= 5000000) {
                if (fecha.isValid() && fecha.isBetween('2000-01-01', moment().format('YYYY-MM-DD'))) {
                    beneficio.fecha_b = fecha.format('DD-MM-YYYY');
                    beneficio.nombre_b = nombreBeneficio.replace(/[^a-zA-Z0-9]/g, ''); // Remove special characters from nombre_b
                    const newBeneficio = await beneficio.save();
                    res.status(201).json({ message: 'Utilidad encontrada', beneficio: newBeneficio });
                } else {
                    res.status(400).json({ message: 'La fecha ingresada no es válida' });
                }

            } else if (tipoBeneficio === "vivienda" && monto >= 7269430 && monto <= 79903670) {
                if (fecha.isValid() && fecha.isBetween('2000-01-01', moment().format('YYYY-MM-DD'))) {
                    beneficio.fecha_b = fecha.format('DD-MM-YYYY');
                    beneficio.nombre_b = nombreBeneficio.replace(/[^a-zA-Z0-9]/g, ''); // Remove special characters from nombre_b
                    const newBeneficio = await beneficio.save();
                    res.status(201).json({ message: 'Vivienda encontrada', beneficio: newBeneficio });
                } else {
                    res.status(400).json({ message: 'La fecha ingresada no es válida' });
                }

            } else if (tipoBeneficio === "alimentacion" && monto >= 5000 && monto <= 1000000) {
                if (fecha.isValid() && fecha.isBetween('2000-01-01', moment().format('YYYY-MM-DD'))) {
                    beneficio.fecha_b = fecha.format('DD-MM-YYYY');
                    beneficio.nombre_b = nombreBeneficio.replace(/[^a-zA-Z0-9]/g, ''); // Remove special characters from nombre_b
                    const newBeneficio = await beneficio.save();
                    res.status(201).json({ message: 'Alimentacion encontrada', beneficio: newBeneficio });
                } else {
                    res.status(400).json({ message: 'La fecha ingresada no es válida' });
                }
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

        const { monto_b, type_b, fecha_b, ...updatedFields } = req.body;
        const tipoBeneficio = type_b ? type_b.toLowerCase() : beneficio.type_b.toLowerCase();

        if (tipoBeneficio === "utilidades" || tipoBeneficio === "vivienda" || tipoBeneficio === "alimentacion") {
            if (
                (tipoBeneficio === "utilidades" && (!monto_b || (monto_b >= 1000 && monto_b <= 5000000))) ||
                (tipoBeneficio === "vivienda" && (!monto_b || (monto_b >= 7269430 && monto_b <= 79903670))) ||
                (tipoBeneficio === "alimentacion" && (!monto_b || (monto_b >= 5000 && monto_b <= 1000000)))
            ) {
                // Actualizar los campos proporcionados
                Object.assign(beneficio, updatedFields);

                if (type_b) beneficio.type_b = type_b; // Actualizar type_b si se proporciona
                if (monto_b) beneficio.monto_b = monto_b; // Actualizar monto_b si se proporciona
                if (fecha_b) beneficio.fecha_b = moment(fecha_b, 'DD-MM-YYYY').toDate(); // Actualizar fecha_b en el formato deseado

                const updatedBeneficio = await beneficio.save();
                res.status(200).json(updatedBeneficio);
            } else {
                res.status(400).json({ message: 'El monto ingresado no es válido para el tipo de beneficio proporcionado' });
            }
        } else {
            res.status(400).json({ message: 'Tipo de beneficio no válido' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};





