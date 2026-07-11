import UsuariosModel from "../models/usuarios.model.js";

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
    
}

export default new UsuariosController();