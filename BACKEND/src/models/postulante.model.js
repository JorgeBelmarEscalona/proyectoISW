const mongoose = require('mongoose');

const postulanteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  rut: {
    type: String,
    required: true,
    unique: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  sexo: {
    type: Boolean,
    required: true,
  },
  estadoCivil: {
    type: String,
    required: true,
  },
  discapacidad: {
    type: Boolean,
    required: true,
  },
  subsidio_E: {
    type: String,
    required: false,
  },    
  aprobado_B: {
    type: Boolean,
    required: false,
  },
  
  fechaPostulacion: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const postulante = mongoose.model('postulante', postulanteSchema);

module.exports = postulante;