const moment = require('moment');
const postulante = require('../models/postulante.model');
const { validate } = require('rut.js');


const handleResponse = (res, error, message, successMessage) => {
  if (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al procesar la solicitud' });
  } else if (message) {
    res.status(400).json({ message });
  } else if (successMessage) {
    res.status(200).json({ message: successMessage });
  }
};



// Controlador para crear un nuevo implemento
const createPostulante = async (nuevoPostulante) => {

  if (!validate(nuevoPostulante.rut)) {
    throw new Error('RUT inválido');
  }
    //Guardar el implemento en la base de datos
  await nuevoPostulante.save();
};

// Controlador para obtener todos los postulantes
const getAllPostulantes = async () => {
  try {
    const postulantes = await postulante.find();
    return postulantes;
  } catch (error) {
    throw new Error('Error al obtener los postulantes');
  }
};

// Controlador para obtener postulantes por subsidio_E

const getPostulantesAprobados = async (req, res) => {
  try {
    //Primero se obtienen todos los postulantes
    const postulantes = await postulante.find({ aprobado_B: false });
    //Se genera un arreglo para guardar los postulantes aprobados
    const aprobados = [];
    //Se recorre el arreglo de postulantes
    for (let i = 0; i < postulantes.length; i++) {
      const postulante = postulantes[i];
      //Se obtiene la fecha de nacimiento del postulante para calcular su edad
      const birthdate = new Date(postulante.fecha_nacimiento);
      const edad = Math.floor((new Date() - birthdate) / (365.25 * 24 * 60 * 60 * 1000));
      //Si el postulante es menor de edad, se rechaza y se pasa al siguiente.
      if (edad < 18) {
        continue; // Saltar al siguiente postulante
      }   
      //En caso de que el postulante elija el subsidio de alimentación, se verifica que se encuentre en el periodo de postulación
      if (postulante.subsidio_E == "alimentacion") {
        const fechaPostulacion = postulante.fechaPostulacion;
        const inicioPeriodo = new Date('2023-01-01');
        const finPeriodo = new Date('2023-04-01');
       
        //En caso de que los postulantes estén dentro del periodo de postulación, se agregan al arreglo de aprobados
        if (fechaPostulacion >= inicioPeriodo && fechaPostulacion <= finPeriodo) {
          aprobados.push(postulante);
        } else {
          continue;
        }
      } else if (postulante.subsidio_E == "utilidades" ) {//Si el postulante elije el subsidio de utilidades, se verifica que no existan otros postulantes con la misma dirección
        const direccion = postulante.direccion.toLowerCase();
        const postulantesConMismaDireccion = postulantes
          .filter((p) => p.subsidio_E === "utilidades") // Filtrar solo los postulantes con subsidio_E igual a "utilidades"
          .filter((p) => p.direccion.toLowerCase() === direccion);

        if (postulantesConMismaDireccion.length == 1) {
          aprobados.push(postulante);
        } else {
          continue;
        }
      } else if( postulante.subsidio_E == "vivienda"  ){//Si el postulante elije el subsidio de vivienda, se verifica que no existan otros postulantes con la misma dirección
        const direccion = postulante.direccion.toLowerCase();
        const postulantesConMismaDireccion = postulantes
          .filter((p) => p.subsidio_E === "vivienda") // Filtrar solo los postulantes con subsidio_E igual a "vivienda"
          .filter((p) => p.direccion.toLowerCase() === direccion);

        if (postulantesConMismaDireccion.length == 1) {
          aprobados.push(postulante);
        } else {
          continue;
        }

      }else{ 
        continue;
      }
    }
    
    
    // Actualizar el aprobado_B de los aprobados
    await Promise.all(aprobados.map((p) => {
      p.aprobado_B = true;
      return p.save();
    }));
    
    const postulantesAprobados = await postulante.find({ aprobado_B: true });

    // Formatear la fecha de postulación de cada postulante aprobado
    const postulantesAprobadosConFechaFormateada = postulantesAprobados.map((p) => {
      return {
        ...p._doc,
        fechaPostulacion: moment(p.fechaPostulacion).format('DD-MM-YYYY'),
      };
    });

// Enviar la lista de postulantes aprobados como respuesta
res.status(200).json(postulantesAprobadosConFechaFormateada);

  } catch (error) {
    handleResponse(res, error, null, 'Error al obtener los postulantes');
  }
};


//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA




// Controlador para eliminar postulantes por rut
const eliminarPostulantes = async (req, res) => {
const { rut } = req.params;
try {
  const result = await postulante.deleteOne({ rut });
  handleResponse(res, result, 'Postulante eliminado correctamente', 'Error al eliminar el postulante');
} catch (error) {
  handleResponse(res, error, null, 'Error al eliminar el postulante');
}
};

module.exports = {
createPostulante,
getAllPostulantes,
getPostulantesAprobados,
eliminarPostulantes,
};