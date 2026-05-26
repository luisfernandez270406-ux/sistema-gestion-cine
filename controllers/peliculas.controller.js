const PeliculasModel = require('../models/peliculas.model');

class PeliculaController {
    listar(req,res) {
        //obtenemos datos del modelo
        const peliculas = PeliculasModel.listar();
        
        // si el cliente pide JSON, se lo damos si no, renderizamos la web
        if(req.accepts('json') && !req.accepts('html')) {
            return res.json(peliculas);
        }
        res.render('peliculas', { peliculas });
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

}

module.exports = new PeliculaController();