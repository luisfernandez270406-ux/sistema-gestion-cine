const PeliculasModel = require('../models/peliculas.model');

class PeliculaController {
    listar(req, res) {
    // Usamos .then() para esperar a que el modelo resuelva la promesa
    PeliculasModel.listar()
        .then(peliculas => {
            // Una vez que llegan los datos, procedemos con la lógica
            if(req.accepts('json') && !req.accepts('html')) {
                return res.json(peliculas);
            }
            res.render('peliculas', { peliculas });
        })
        .catch(error => {
            // Si algo falla, capturamos el error
            console.error('Error al listar películas:', error);
            res.status(500).send('Error interno al obtener las películas');
        });
}

    mostrarFormulario(req,res) {
        res.render('nueva-pelicula');
    }

    crear(req,res) {
        PeliculasModel.crear(req.body)
        .then(nuevaPelicula => {
            if(req.accepts('json') && !req.accepts('html')) {
                return res.status(201).json(nuevaPelicula);
            }
            res.redirect('/peliculas');// redirigir a la lista de películas después de crear una nueva
        })
        .catch(error => {
            res.status(400).send({ error });// mostrar error
        });
    }
    editar(req,res) {
        PeliculasModel.editar(req.params.id, req.body)
        .then(peliculaActualizada => {
            if(req.accepts('json') && !req.accepts('html')) {
                return res.json(peliculaActualizada);
            }
            res.redirect('/peliculas');
        })
        .catch(error => {
            if(req.accepts('json') && !req.accepts('html')) {
                return res.status(404).json({ error });
            }
            res.status(404).send({ error });
        });
    }
    eliminar(req, res) {
    PeliculasModel.eliminar(req.params.id)
        .then(() => {
            // Si la petición viene de Thunder Client (o pide JSON)
            if (req.xhr || req.headers.accept?.includes('json') || req.accepts('json')) {
                return res.status(200).json({ 
                    error: false, 
                    message: 'Película eliminada correctamente' 
                });
            }
            // Si viene del navegador/formulario normal, redirecciona
            res.redirect('/peliculas');
        })
        .catch(error => {
            // Si ocurre un error, responde un JSON formateado con código 400 (Bad Request)
            return res.status(400).json({ 
                error: true, 
                message: error 
            });
        });
}
obtenerPorId(req, res) {
    PeliculasModel.obtenerPorId(req.params.id)
        .then(pelicula => {
            if(req.accepts('json') && !req.accepts('html')) {
                return res.json(pelicula);
            }
            res.render('editar-pelicula', { pelicula });
        })
        .catch(error => {
            res.status(404).send('Película no encontrada');
        });
}

}

module.exports = new PeliculaController();