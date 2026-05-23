const express = require('express');
const router = express.Router();
const PeliculasController = require('../controllers/peliculas.controller');

// Ruta para listar todas las películas
router.get('/', PeliculasController.listar);
// Ruta para crear una nueva película
router.post('/', PeliculasController.crear);

module.exports = router;