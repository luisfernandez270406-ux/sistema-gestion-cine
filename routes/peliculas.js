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
router.put('/:id', PeliculasController.editar);
// ruta para eliminar una película
router.delete('/:id', PeliculasController.eliminar);

module.exports = router;