import express from 'express';
const router = express.Router();
import PeliculasController from '../controllers/peliculas.controller.js';


// Ruta para listar todas las películas
router.get('/', PeliculasController.listar);
// Ruta para crear una nueva película
router.get('/nueva', PeliculasController.mostrarFormulario);
// ruta para editar una película
router.get('/editar/:id', PeliculasController.obtenerPorId);



export default router;