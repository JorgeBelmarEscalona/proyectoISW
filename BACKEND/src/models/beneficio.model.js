// Importa el módulo 'mongoose' para crear la conexión a la base de datos
const mongoose = require('mongoose');

// Crea el esquema de la colección 'beneficio'
const beneficioSchema = new mongoose.Schema({
    id_beneficio: {
      type: Number,
      required: true,
      notnull: true,
      unique: true,
    },
    nombre_b: {
      type: String,
      required: true,
      notnull: true,
    },
    type_b: {
      type: String,
      required: true,
      notnull: true,
    },
    monto_b: {
      type: Number,
      required: true,
      notnull: true,
    },
    fecha_b: {
      type: Date,
      required: true,
      notnull: true,
    },
  
  });

  // Crea el modelo de datos 'beneficio' a partir del esquema 'beneficioSchema'
const beneficio = mongoose.model('beneficio', beneficioSchema);

// Exporta el modelo de datos 'beneficio' para poder utilizarlo en otras partes de la aplicación
module.exports = beneficio;