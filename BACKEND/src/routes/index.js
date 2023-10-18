// Importa el módulo 'express' para crear las rutas
const express = require('express');


// Importa el enrutador de usuarios
const postulanteRoutes = require('./postulante.route');


// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para los usuarios /api/usuarios
router.use('/postulante', postulanteRoutes);

// Exporta el enrutador
module.exports = router;