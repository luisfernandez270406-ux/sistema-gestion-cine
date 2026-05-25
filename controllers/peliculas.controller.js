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

}

module.exports = new PeliculaController();