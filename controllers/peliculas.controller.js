const PeliculasModel = require('../models/peliculas.model');

class PeliculaController {
    listar(req,res) {
        //obtenemos datos del modelo
        const peliculas = PeliculasModel.listar();
        //enviamos a la vista
        res.render('peliculas', { peliculas });
    }

    crear(req,res) {
        PeliculasModel.crear(req.body)
        .then(nuevaPelicula => {
            res.redirect('/peliculas');// redirigir a la lista de películas después de crear una nueva
        })
        .catch(error => {
            res.status(400).send({ error });// mostrar error
        });
    }

}

module.exports = new PeliculaController();