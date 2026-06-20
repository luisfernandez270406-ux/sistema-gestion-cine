const express = require('express');
const router = express.Router();
const PeliculasController = require('../controllers/peliculas.controller');

// Ruta para listar todas las películas
router.get('/', PeliculasController.listar);
// Ruta para crear una nueva película
router.post('/', PeliculasController.crear);
// ruta formulario de nueva pelicula
router.get('/nueva', PeliculasController.mostrarFormulario);
// ruta para editar una película
router.put('/editar/:id', PeliculasController.editar);
// ruta para eliminar una película
router.delete('/eliminar/:id', PeliculasController.eliminar);
// ruta para obtener una película por su ID
router.get('/editar/:id', (req, res) => {
    PeliculasController.obtenerPorId(req, res);
});
// ruta para eliminar una película (usando GET para simplificar la prueba en el navegador)
router.get('/eliminar/:id', PeliculasController.eliminar);


module.exports = router;