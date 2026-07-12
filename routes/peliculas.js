import express from 'express';
const router = express.Router();
import PeliculasController from '../controllers/peliculas.controller.js';
import { verificarToken } from '../middleware/auth.js';
import { verificarRol } from '../middleware/role.js';


// Ruta para listar todas las películas
router.get('/', PeliculasController.listar);
// Ruta para crear una nueva película
router.post('/',verificarToken, verificarRol("admin"),PeliculasController.crear);
// ruta formulario de nueva pelicula
router.get('/nueva', verificarToken, verificarRol("admin"),PeliculasController.mostrarFormulario);
// ruta para editar una película
router.put('/editar/:id', verificarToken, verificarRol("admin","empleado"),PeliculasController.editar);
// FORM EDITAR
router.get('/editar/:id', verificarToken, verificarRol("admin","empleado"),PeliculasController.obtenerPorId);
// ruta para eliminar una película
router.delete('/eliminar/:id', verificarToken, verificarRol("admin"),PeliculasController.eliminar);



export default router;