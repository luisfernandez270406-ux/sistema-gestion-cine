import express from 'express';
const router = express.Router();
import usuariosController from "../controllers/usuarios.controller.js";
import { verificarToken } from '../middleware/auth.js';
import { verificarRol } from '../middleware/role.js';


//ruta login de usuario
router.post("/login", usuariosController.login);
router.get('/login', usuariosController.mostrarLogin);

router.get('/registro', usuariosController.mostrarRegistro);
router.post('/registro', usuariosController.crear);

router.get("/logout", usuariosController.logout);

//ruta para listar los usuarios
router.get("/", verificarToken, verificarRol("admin","empleado"),usuariosController.listar);
//ruta para crear un nuevo usuario
router.post("/",usuariosController.crear);
//ruta para obtener un usuario por su ID
router.get("/:id", verificarToken,usuariosController.obtenerPorId);
//ruta para eliminar un usuario
router.delete("/eliminar/:id", verificarToken, verificarRol("admin"),usuariosController.eliminar);





export default router;