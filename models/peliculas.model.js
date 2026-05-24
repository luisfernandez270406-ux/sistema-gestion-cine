const uuid = require('uuid');
const db = require('../database/db');

class PeliculasModel {
    listar() {
        return db.peliculas;
    }
    crear(datos) {
        return new Promise((resolve, reject) => {
            //validacion
            if(!datos.titulo || !datos.director || !datos.genero || !datos.duracion ){
                return reject("Faltan datos obligatorios para crear la pelicula")
            }

            const nuevaPelicula = {
                id: uuid.v4(),
                titulo: datos.titulo,
                director: datos.director,
                anio: datos.anio,
                genero: datos.genero,
                duracion: datos.duracion,
                sinopsis: datos.sinopsis
            };
            db.peliculas.push(nuevaPelicula);
        resolve(nuevaPelicula);


        });
    }
}  

module.exports = new PeliculasModel();