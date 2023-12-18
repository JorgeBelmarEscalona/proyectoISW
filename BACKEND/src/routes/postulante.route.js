const express = require('express');
const router = express.Router();
const postulante = require('../models/postulante.model');
const { createPostulante, getAllPostulantes, eliminarPostulantes, getPostulantesAprobados } = require("../controllers/postulante.controller");

// Ruta para registrar un nuevo postulante

router.post('/postulante', async (req, res) => {
    try {
      const { 
        nombre,
        rut,
        direccion,
        sexo,
        estadoCivil,
        discapacidad,
        subsidio_E,
        aprobado_B,
        fecha_nacimiento,
      } = req.body;
      
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
        fecha_nacimiento,
      });
      
      // Guardar el postulante en la base de datos
      await createPostulante(nuevoPostulante);
  
      res.status(200).json({ message: ' Postulacion agregada correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al Ingresar Datos', error });
    }
  });

//busca y muestra todos las postulaciones 
router.get('/postulante', async (req, res) => {
  try {
    const postulantes = await getAllPostulantes();
    res.status(200).json(postulantes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Devuelve los postulantes aprobados 
router.get('/GET/aprobado',getPostulantesAprobados);


//busca las postulaciones por la id de la base de datos
router.get('/implementos/:id', async (req, res) => {
    
})

//elimina postulantes por su _id de mongo
router.delete('/postulante/:id', async (req, res) => {
    const { id } = req.params;
    const postulantes = await eliminarPostulantes(id);
    res.json(postulantes);
})

module.exports = router;