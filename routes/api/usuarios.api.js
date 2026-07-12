import express from 'express';
const router = express.Router();
import usuariosController from "../../controllers/usuarios.controller.js";
import { verificarToken } from '../../middleware/auth.js';
import { verificarRol } from '../../middleware/role.js';


//ruta para listar los usuarios
router.get("/", verificarToken, verificarRol("admin","empleado"),usuariosController.listarApi);
//ruta para crear un nuevo usuario
router.post("/", usuariosController.crearApi);
//ruta para obtener un usuario por su ID
router.get("/:id", usuariosController.obtenerPorIdApi);
//ruta para eliminar un usuario
router.delete("/eliminar/:id", verificarToken, verificarRol("admin"),usuariosController.eliminarApi);
//ruta login de usuario
router.post("/login", usuariosController.login);

export default router;