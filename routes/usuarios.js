import express from 'express';
const router = express.Router();
import usuariosController from "../controllers/usuarios.controller.js";


//ruta para listar los usuarios
router.get("/", usuariosController.listar);
//ruta para crear un nuevo usuario
router.post("/", usuariosController.crear);
//ruta para obtener un usuario por su ID
router.get("/:id", usuariosController.obtenerPorId);
//ruta para eliminar un usuario
router.delete("/eliminar/:id", usuariosController.eliminar);
//ruta login de usuario
router.post("/login", usuariosController.login);

export default router;