// Importa el módulo 'express' para crear las rutas
const express = require('express');

// Importa el controlador de achs
const beneficioController = require('../controllers/beneficio.controller');

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para los achs
router.get('/GET', beneficioController.getBeneficio);
router.get('/GET/:id',beneficioController.getBeneficioById);
router.post('/CREATE', beneficioController.createBeneficio);
router.put('/UPDATE/:id',beneficioController.updateBeneficio); 
router.delete('/DELETE/:id',beneficioController.deleteBeneficio);



// Exporta el enrutador 
module.exports = router;