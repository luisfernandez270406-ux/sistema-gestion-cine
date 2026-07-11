import express from 'express';
const router = express.Router();
import PeliculasController from '../controllers/peliculas.controller.js';


// Ruta para listar todas las películas
router.get('/', PeliculasController.listar);
// Ruta para crear una nueva película
router.post('/', PeliculasController.crear);
// ruta formulario de nueva pelicula
router.get('/nueva', PeliculasController.mostrarFormulario);
// ruta para editar una película
router.put('/editar/:id', PeliculasController.editar);
// FORM EDITAR
router.get('/editar/:id', PeliculasController.obtenerPorId);
// ruta para eliminar una película
router.delete('/eliminar/:id', PeliculasController.eliminar);


export default router;