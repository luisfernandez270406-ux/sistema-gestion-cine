import PeliculasModel from '../models/peliculas.model.js';

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
    const id = req.params.id;

    PeliculasModel.tieneFunciones(id)
        .then(tiene => {
            if (tiene) {
                return res.send(`
                    <script>
                        alert("No se puede eliminar: esta película tiene funciones asignadas");
                        window.location.href = "/peliculas";
                    </script>
                `);
            }

            return PeliculasModel.eliminar(id)
                .then(() => {
                    res.redirect('/peliculas');
                });
        })
        .catch(error => {
            res.status(400).json({ error });
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

export default new PeliculaController();