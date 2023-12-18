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
    enum: ['Masculino', 'Femenino'],
  },
  estadoCivil: {
    type: String,
    required: true,
    enum: ['viudo', 'soltero', 'casado', 'separado', 'divorciado'],
  },
  discapacidad: {
    type: String,
    required: true,
    enum: ['si', 'no'],
  },
  subsidio_E: {
    type: String,
    required: false,
    enum: ['Vivienda', 'Alimentacion', 'Utilidades']  ,
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
    required: true,
  },

});

const postulante = mongoose.model('postulante', postulanteSchema);
module.exports = postulante;