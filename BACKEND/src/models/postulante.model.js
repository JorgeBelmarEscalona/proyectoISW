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
    type: String,
    required: true,
  },
  estadoCivil: {
    type: String,
    required: true,
    
  },
  discapacidad: {
    type: String,
    required: true,
  },
  fecha_nacimiento: {
    type: Date,
    required: false,
  },
  subsidio_E: {
    type: String,
    required: false,
  },    
  aprobado_B: {
    type: Boolean,
    required: false,
    default: false,
  },
  
  fechaPostulacion: {
    type: Date,
    default:  new Date(),
    required: true,
  },
  fecha_nacimiento: {
    type: Date,
    default:  new Date(),
    required: true,
  },

});

const postulante = mongoose.model('postulante', postulanteSchema);
module.exports = postulante;