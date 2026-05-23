const db = require('../database/db');

class PeliculaController {
    listar(req,res) {
        res.render('peliculas', { peliculas: db.peliculas });
    }

    crear(req,res) {
        const nuevaPelicula = req.body;
        db.peliculas.push(nuevaPelicula);
        res.redirect('/peliculas');
    }

}

module.exports = new PeliculaController();