import UsuariosModel from "../models/usuarios.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generarToken } from "../utils/token.js";
 
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
                return res.redirect('/usuarios/registro?error=1');
            }
            const datosUsuario = {
                nombre: req.body.nombre,
                usuario: req.body.usuario,
                password: req.body.password,
                correo: req.body.correo,
                rol: 'cliente'
            };
            await UsuariosModel.crear(datosUsuario);
            res.redirect('/usuarios/login');
        } catch (error) {
            res.redirect('/usuarios/registro?error=1');
        }  
    } 
    async crearApi(req, res) {
        try {
            const usuarioExistente = await UsuariosModel.obtenerPorUsuario(req.body.usuario);
            if (usuarioExistente) {
                return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
            }
            const datosUsuario = {
                nombre: req.body.nombre,
                usuario: req.body.usuario,
                password: req.body.password,
                correo: req.body.correo,
                rol: 'cliente'
            };
            const nuevoUsuario = await UsuariosModel.crear(datosUsuario);
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
    mostrarLogin(req, res) {
        if (req.cookies && req.cookies.token) {
            try {
                jwt.verify(req.cookies.token, process.env.JWT_SECRET);
                return res.redirect('/peliculas'); // el token es válido, ya está logueado
            } catch (error) {
                res.clearCookie('token'); // token viejo/corrupto: lo botamos y dejamos ver el login
            }
        }
        res.render('login', { error: req.query.error });
    }
 
    mostrarRegistro(req, res) {
        if (req.cookies && req.cookies.token) {
            try {
                jwt.verify(req.cookies.token, process.env.JWT_SECRET);
                return res.redirect('/peliculas');
            } catch (error) {
                res.clearCookie('token');
            }
        }
        res.render('registro', { error: req.query.error });
    }
 
    logout(req, res) {
        res.clearCookie('token');
        res.redirect('/usuarios/login');
    }
 
    async login(req, res) {
        try {
            const { usuario, password } = req.body;
            const usuarioExistente = await UsuariosModel.obtenerPorUsuario(usuario);
            if (!usuarioExistente) {
                return res.redirect('/usuarios/login?error=1');
            }
            const coincide = await bcrypt.compare(password, usuarioExistente.password);
            if (!coincide) {
                return res.redirect('/usuarios/login?error=1');
            }
            const token = generarToken(usuarioExistente);
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 2,
                sameSite: "lax"
            });
            res.redirect("/peliculas");
        } catch (error) {
            res.redirect('/usuarios/login?error=1');
        }
    }
    async loginApi(req, res) {
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
            res.json({
                message: 'Login exitoso',
                token,
                usuario: { id: usuarioExistente.id, usuario: usuarioExistente.usuario, rol: usuarioExistente.rol }
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
 
export default new UsuariosController();