import express from 'express';
const router = express.Router();
import TicketsController from '../../controllers/tickets.controller.js';
import { verificarToken } from '../../middleware/auth.js';
import { verificarRol } from '../../middleware/role.js';

//ruta para listar los tickets
router.get('/', verificarToken,TicketsController.listarApi);
//ruta para crear un nuevo ticket
router.post('/', verificarToken, verificarRol("admin","empleado"),TicketsController.crearApi);
//ruta para editar un ticket
router.put('/editar/:id', verificarToken, verificarRol("admin","empleado"),TicketsController.editarApi);
//ruta para eliminar un ticket
router.delete('/eliminar/:id', verificarToken, verificarRol("admin"), TicketsController.eliminarApi);
//ruta para filtrar tickets por fecha
router.get('/filtrar', verificarToken, verificarRol("admin","empleado"),TicketsController.filtrarPorFechaApi);
//ruta para filtrar tickets por ultimos 5 
router.get('/ultimos', verificarToken, verificarRol("admin","empleado"), TicketsController.obtenerUltimosElementos);
//ruta para obtener detalles de un ticket
router.get('/detalles/:id', verificarToken, verificarRol("admin","empleado"),TicketsController.obtenerDetallesApi);



export default router;