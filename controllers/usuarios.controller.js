import UsuariosModel from "../models/usuarios.model.js";
import bcrypt from "bcrypt";

class UsuariosController {
    async listar(req,res) {
        try {
            const usuarios = await UsuariosModel.listar();
            if(req.accepts('json') && !req.accepts('html')) {
                return res.json(usuarios);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }
    async listarApi(req, res) {
        try {
            const usuarios = await UsuariosModel.listar();
            return res.json(usuarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async crear(req,res) {
        try {
            const usuarioExistente = await UsuariosModel.obtenerPorUsuario(req.body.usuario);
            if (usuarioExistente) {
                return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
            }
            const nuevoUsuario = await UsuariosModel.crear(req.body);
            if(req.accepts('json') && !req.accepts('html')) {
                return res.status(201).json(nuevoUsuario);
            }
            res.redirect('/usuarios');
        } catch (error) {
            res.status(400).json({ error: error.message });
        }  
    } 
    async crearApi(req, res) {
        try {
            const usuarioExistente = await UsuariosModel.obtenerPorUsuario(req.body.usuario);
            if (usuarioExistente) {
                return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
            }
            const nuevoUsuario = await UsuariosModel.crear(req.body);
            return res.status(201).json(nuevoUsuario);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async obtenerPorId(req,res) {
        try {
            const usuario = await UsuariosModel.obtenerPorId(req.params.id);
            if(req.accepts('json') && !req.accepts('html')) {
                return res.json(usuario);
            }
            res.render('editar-usuario', { usuario });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async obtenerPorIdApi(req, res) {
        try {
            const usuario = await UsuariosModel.obtenerPorId(req.params.id);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            return res.json(usuario);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async eliminar(req,res) {
        try {
            const resultado = await UsuariosModel.eliminar(req.params.id);
            if(req.accepts('json') && !req.accepts('html')) {
                return res.json(resultado);
            }
            res.redirect('/usuarios');
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } 
    async eliminarApi(req, res) {
        try {
            const resultado = await UsuariosModel.eliminar(req.params.id);
            return res.json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async login(req,res) {
        try {
            const { usuario, password } = req.body;
            const usuarioExistente = await UsuariosModel.obtenerPorUsuario(usuario);
            if (!usuarioExistente) {
                return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
            }
            const coincide = await bcrypt.compare(password, usuarioExistente.password);
            if (!coincide) {
                return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
            }
            const token = generarToken(usuarioExistente);
            res.json({ message: 'Login exitoso', token, usuario: { id: usuarioExistente.id, usuario: usuarioExistente.usuario, rol: usuarioExistente.rol } });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new UsuariosController();