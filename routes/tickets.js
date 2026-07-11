import express from 'express';
const router = express.Router();
import TicketsController from '../controllers/tickets.controller.js';

//ruta para listar los tickets
router.get('/', TicketsController.listar);
//ruta para crear un nuevo ticket
router.post('/', TicketsController.crear);
//ruta para editar un ticket
router.put('/editar/:id', TicketsController.editar);
//ruta para eliminar un ticket
router.delete('/eliminar/:id', TicketsController.eliminar);
//ruta para filtrar tickets por fecha
router.get('/filtrar', TicketsController.filtrarPorFecha);
//ruta para filtrar tickets por ultimos 5 
router.get('/ultimos', TicketsController.obtenerUltimosElementos);
//ruta para obtener detalles de un ticket
router.get('/detalles/:id', TicketsController.obtenerDetalles);



export default router;