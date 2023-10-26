// Importa el módulo 'express' para crear las rutas
const express = require('express');


// Importa el enrutador de usuarios
const beneficioRoutes = require('./beneficio.route');


// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para los usuarios /api/usuarios
router.use('/beneficio', beneficioRoutes);

// Exporta el enrutador
module.exports = router;