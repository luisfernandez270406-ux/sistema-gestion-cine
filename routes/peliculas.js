const express = require('express');
const router = express.Router();
const PeliculasController = require('../controllers/peliculas.controller');

// Ruta para listar todas las películas
router.get('/', PeliculasController.listar);
// Ruta para crear una nueva película
router.post('/', PeliculasController.crear);

// Agrega esto temporalmente en tus rutas
router.get('/test-crear', (req, res) => {
    // Simulamos un formulario enviado
    req.body = { titulo: "Prueba", director: "Director Test", anio: 2026 };
    // Llamamos al controlador directamente
    require('../controllers/peliculas.controller').crear(req, res);
});

module.exports = router;