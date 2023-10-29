const postulante = require('../models/postulante.model');

// Controlador para crear un nuevo implemento
const createPostulante = async (req, res) => {
    try {
      const {nombre, rut, direccion, sexo, estadoCivil, discapacidad, subsidio_E, aprobado_B } = req.body;
  
      // Crear un nuevo postulante
      const nuevoPostulante = new postulante({
          nombre,
          rut,
          direccion,
          sexo,
          estadoCivil,
          discapacidad,
          subsidio_E,
          aprobado_B,
          fechaCreacion: new Date()
      });
  
      // Guardar el implemento en la base de datos
      await nuevoPostulante.save();
  
      res.status(200).json({ message: 'Postulacion registrada correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al registrar su Postulacion' });
    }
  };

// Controlador para obtener todos los postulantes
const getAllPostulantes = async () => {
    const postulantes = await postulante.find();
    return postulantes;
};


const getAllPostulantesBysubsidio_E = async (subsidio_E) => {
  const postulantes = await postulante.find({ subsidio_E });
  return postulantes;
};

const eliminarPostulantes = async (rut) => {
  const postulantes = await postulante.deleteOne({ rut });
  return postulantes;
};

module.exports = {
  getAllPostulantes,
  getAllPostulantesBysubsidio_E,
  eliminarPostulantes
}