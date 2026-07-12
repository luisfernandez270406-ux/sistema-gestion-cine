import express from 'express';
const router = express.Router();
import TicketsController from '../controllers/tickets.controller.js';
import { verificarToken } from '../middleware/auth.js';
import { verificarRol } from '../middleware/role.js';

//ruta para listar los tickets
router.get('/', verificarToken,TicketsController.listar);
//ruta para crear un nuevo ticket
router.post('/', verificarToken, verificarRol("admin","empleado"),TicketsController.crear);
//ruta para editar un ticket
router.put('/editar/:id', verificarToken, verificarRol("admin","empleado"),TicketsController.editar);
//ruta para eliminar un ticket
router.delete('/eliminar/:id', verificarToken, verificarRol("admin","empleado"),TicketsController.eliminar);
//ruta para filtrar tickets por fecha
router.get('/filtrar', verificarToken, verificarRol("admin","empleado"),TicketsController.filtrarPorFecha);
//ruta para filtrar tickets por ultimos 5 
router.get('/ultimos', verificarToken, verificarRol("admin","empleado"),TicketsController.obtenerUltimosElementos);
//ruta para obtener detalles de un ticket
router.get('/detalles/:id', verificarToken, verificarRol("admin","empleado"),TicketsController.obtenerDetalles);



export default router;