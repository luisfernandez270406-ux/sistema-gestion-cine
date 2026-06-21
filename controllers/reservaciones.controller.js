const ReservacionesModel = require('../models/reservaciones.model');

class ReservacionesController {
    async listar(req,res) {
        try {
            // await = perate un momentico
            const reservaciones = await ReservacionesModel.listarDetallado();
            if(req.accepts('json') && !req.accepts('html')) {
                return res.json(reservaciones);
            } 
            res.render('reservaciones', { reservaciones });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async crear(req,res) {
        try {
            const nuevaReservacion = await ReservacionesModel.crear(req.body);
            if(req.accepts('json') && !req.accepts('html')) {
                return res.status(201).json(nuevaReservacion);
            } 
            res.redirect('/reservaciones');
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
}

module.exports = new ReservacionesController();