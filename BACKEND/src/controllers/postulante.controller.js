const postulante = require('../models/postulante.model');
const Rut = require('rutjs');


// Controlador para crear un nuevo implemento
const createPostulante = async (nuevoPostulante) => {
    try {
      if (!Rut.isValid(nuevoPostulante.rut)) {
        throw new Error('RUT inválido');
      }

      // Guardar el implemento en la base de datos
      await nuevoPostulante.save();
  
      res.status(200).json({ message: 'Postulacion registrada correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al registrar su Postulacion', error});
    }
  };

// Controlador para obtener todos los postulantes
const getAllPostulantes = async (req, res) => {
try {
  const postulantes = await postulante.find();
  res.status(200).json(postulantes);
} catch (error) {
  handleResponse(res, error, null, 'Error al obtener los postulantes');
}
};

// Controlador para obtener postulantes por subsidio_E
const getAllPostulantesBysubsidio_E = async (req, res) => {
const { subsidio_E } = req.params;
try {
  const postulantes = await postulante.find({ subsidio_E });
  res.status(200).json(postulantes);
} catch (error) {
  handleResponse(res, error, null, 'Error al obtener los postulantes por subsidio_E');
}
};

// Controlador para eliminar postulantes por rut
const eliminarPostulantes = async (req, res) => {
const { rut } = req.params;
try {
  const result = await postulante.deleteOne({ rut });
  handleResponse(res, result, 'Postulante eliminado correctamente', 'Error al eliminar el postulante');
} catch (error) {
  handleResponse(res, error, null, 'Error al eliminar el postulante');
}
};

module.exports = {
createPostulante,
getAllPostulantes,
getAllPostulantesBysubsidio_E,
eliminarPostulantes,
};