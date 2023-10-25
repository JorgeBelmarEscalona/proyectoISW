const express = require('express');
const router = express.Router();
const postulante = require('../models/postulante.model');
const { getAllPostulantes, getAllPostulantesBysubsidio_E, eliminarPostulantes } = require("../controllers/postulante.controller");
const { getAllPostulantes, eliminarPostulantes } = require('../controllers/postulante.controller');

// Ruta para registrar un nuevo implemento

router.post('/postulante', async (req, res) => {
    try {
      const { } = req.body;
  
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
      });
  
      // Guardar el postulante en la base de datos
      await nuevoPostulante.save();
  
      res.status(200).json({ message: ' Postulancion agregada correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al Ingresar Datos', error });
    }
  });

//busca y muestra todos las postulaciones 
router.get('/postulante', async (req, res) => {
    const postulante = await getAllPostulantes();
    res.json(postulante)

})

//modificable para cualquier parametro

// busca un postulantes (por el parametro aprobado) 
router.get('/postulante/buscar', async (req, res) => {
    const { aprobado_B } = req.query;
    const postulante = await getAllPostulantesBysubsidio_E(aprobado_B);
    res.json(postulante)
})

//busca las postulaciones por la id de la base de datos
router.get('/implementos/:id', async (req, res) => {
    
})

//elimina postulantes por su _id de mongo
router.delete('/postulante/:id', async (req, res) => {
    const { id } = req.params;
    const postulante = await eliminarPostulantes(id);
    res.json(postulante);
})

module.exports = router;