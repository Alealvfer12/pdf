const express = require('express');
const { BovinosController } = require('../controllers/bovinos');
const {success, errorResponse} = require('../../utils/responses');

const router = express.Router();
const _bovinosController = new BovinosController;

/**
 * Petición: Traer todos los bovinos
 * Parámetros: Vacío
 * Cuerpo: Vacío
 * Respuesta: Bovinos consultados o mensaje de error
 */
 router.get('/bovinos', async (req, res) => {
    try {
       let resp = await _bovinosController.consultarBovinos();
        success(req, res, 'Bovinos', resp, 200);
    } catch (error) {
        errorResponse(req, res, 'ERROR', error);
    }
});

/**
 * Petición: Traer todos los bovinos cada uno con su QR
 * Parámetros: Vacío
 * Cuerpo: Vacío
 * Respuesta: Bovinos consultados o mensaje de error
 */
 router.get('/bovinos/qr', async (req, res) => {
  try {
     let resp = await _bovinosController.consultarBovinosQR();
      success(req, res, 'Bovinos', resp, 200);
  } catch (error) {
      errorResponse(req, res, 'ERROR', error);
  }
});

router.get('/bovinos/:chapeta', async (req, res) => {
  let chapeta = req.params.chapeta;
  try {
     let resp = await _bovinosController.consultarBovinosch(chapeta);
      success(req, res, 'Bovinos', resp, 200);
  } catch (error) {
      errorResponse(req, res, 'ERROR', error);
  }
});

router.get('/bovinos/novillonaLactante', async (req, res) => {
    try {
       let resp = await _bovinosController.consultarNovillonasyLactantes();
        success(req, res, 'Bovinos', resp, 200);
    } catch (error) {
        errorResponse(req, res, 'ERROR', error);
    }
});
 
/**
 * Petición: Traer un bovino específico
 * Parámetros: Chapeta, tipo de bovino
 * Cuerpo: Vacío
 * Respuesta: Bovino consultado o mensaje de error
 */
 router.get('/bovinos/chapeta_tipo/:id_tipo/:chapeta', async (req, res) => {
    let id_tipo = req.params.id_tipo;
    let chapeta = req.params.chapeta;
   
    try {
       let resp = await _bovinosController.consultarBovino(id_tipo,chapeta);
        success(req, res, 'Bovinos', resp, 200);
    } catch (error) {
        errorResponse(req, res, 'ERROR', error);
    }
});

router.get('/bovinos/:consulta', async (req, res) => {
    try{
        let id_tipo = req.query.id_tipo;
        let consulta = req.params.consulta;
        let resp= await _bovinosController.orquestarConsulta(id_tipo,consulta);
        success(req, res, 'Bovinos', resp, 200);
    } catch (error) {
        errorResponse(req, res, 'ERROR', error);
    }
  });



router.post('/bovinos', async (req, res) => {
    try {
      let bovinos = req.body;
  
      await _bovinosController.guardarBovino(bovinos);
      success(req, res, 'Bovino creado', null, 200);
    } catch (error) {
      errorResponse(req, res, 'ERROR', error);
    }
  });

  router.delete('/bovinos/:chapeta', async (req, res) => {
    let chapeta = req.params.chapeta;
  
    try {
      await _bovinosController.eliminarBovino(chapeta);
      success(req, res, 'Bovino eliminado', null, 200);
    } catch (error) {
      errorResponse(req, res, 'ERROR', error);
    }
  
  });
  router.put("/bovinos/:chapeta", async (req, res) => {
    try {
      let chapeta = req.params.chapeta;
      let bovinos = req.body;
  
      await _bovinosController.editarBovino(bovinos, chapeta);
      success(req, res, 'Bovino modificado', null, 200);
    } catch (error) {
        errorResponse(req, res, 'ERROR', error);
    }
  });

  module.exports = router;
