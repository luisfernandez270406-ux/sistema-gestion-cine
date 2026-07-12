import ReservacionesModel from '../models/reservaciones.model.js';

class ReservacionesController {
    async listar(req,res) {
        try {
            // await = perate un momentico
            let idUsuario = null
            if (req.usuario.rol === "cliente") {
                idUsuario = req.usuario.id
            }
            const reservaciones = await ReservacionesModel.listarDetallado(idUsuario);
            if(req.accepts('json') && !req.accepts('html')) {
                return res.json(reservaciones);
            } 
            res.render('reservaciones', { reservaciones });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async listarApi(req, res) {
        try {
            let idUsuario = null
            if (req.usuario.rol === "cliente"){
                idUsuario = req.usuario.id
            }
            const reservaciones = await ReservacionesModel.listarDetallado(idUsuario);
            return res.json(reservaciones);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async crear(req,res) {
        try {

            if(req.usuario.rol === "cliente") {
                req.body.id_usuario = req.usuario.id;
                req.body.nombre_cliente = req.usuario.usuario;
            }
            const nuevaReservacion = await ReservacionesModel.crear(req.body);
            if(req.accepts('json') && !req.accepts('html')) {
                return res.status(201).json(nuevaReservacion);
            } 
            res.redirect('/reservaciones');
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async crearApi(req, res) {
        try {
            if(req.usuario.rol === "cliente") {
                req.body.id_usuario = req.usuario.id;
                req.body.nombre_cliente = req.usuario.usuario;
            }
            const nuevaReservacion = await ReservacionesModel.crear(req.body);
            return res.status(201).json(nuevaReservacion);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async editar(req,res) {
        try {
            const reservacionActualizada = await ReservacionesModel.editar(req.params.id, req.body);
            if(req.accepts('json') && !req.accepts('html')) {
                return res.json(reservacionActualizada);
            }
            res.redirect('/reservaciones');
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async editarApi(req, res) {
        try {
            const reservacionActualizada = await ReservacionesModel.editar(req.params.id, req.body);
            return res.json(reservacionActualizada);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    eliminar(req, res) {
    const id = req.params.id;

    ReservacionesModel.tieneTickets(id)
        .then(tiene => {

            if (tiene) {
                return res.send(`
                    <script>
                        alert("No se puede eliminar: esta reservación tiene tickets asociados");
                        window.location.href="/reservaciones";
                    </script>
                `);
            }

            return ReservacionesModel.eliminar(id)
                .then(() => res.redirect('/reservaciones'));
        })
        .catch(err => {
            res.status(400).json({ error: err });
        });
}
eliminarApi(req, res) {
        const id = req.params.id;
 
        ReservacionesModel.tieneTickets(id)
            .then(tiene => {
                if (tiene) {
                    return res.status(400).json({ error: 'No se puede eliminar: esta reservación tiene tickets asociados' });
                }
 
                return ReservacionesModel.eliminar(id)
                    .then(() => res.json({ message: 'Reservación eliminada correctamente' }));
            })
            .catch(err => {
                res.status(400).json({ error: err });
            });
    }
    
    mostrarFormulario(req,res) {
        res.render('nueva-reservacion');
    }
    obtenerPorId(req, res) {
    ReservacionesModel.obtenerPorId(req.params.id)
        .then(reserva => {

            if (!reserva) {
                return res.status(404).send('Reservación no encontrada');
            }

            if (req.accepts('json') && !req.accepts('html')) {
                return res.json(reserva);
            }

            res.render('editar-reserva', { reserva });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error interno');
        });
}   
    obtenerPorIdApi(req, res) {
        ReservacionesModel.obtenerPorId(req.params.id)
            .then(reserva => {
                if (!reserva) {
                    return res.status(404).json({ error: 'Reservación no encontrada' });
                }
                return res.json(reserva);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            });
    }


}

export default new ReservacionesController();