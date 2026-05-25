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
    editar(id, datos) {
        return new Promise((resolve, reject) => {
            const peliculaIndex = db.peliculas.findIndex(p => p.id === id);
            if(peliculaIndex === -1) {
                return reject("Pelicula no encontrada");
            }
            const peliculaActualizada = { ...db.peliculas[peliculaIndex], ...datos };
            db.peliculas[peliculaIndex] = peliculaActualizada;
            resolve(peliculaActualizada);
        });
}       
    eliminar(id) {
        return new Promise((resolve, reject) => {
            const peliculaIndex = db.peliculas.findIndex(p => p.id === id);
            if(peliculaIndex === -1) {
                return reject("Pelicula no encontrada");
            }
            const eliminada = db.peliculas.splice(peliculaIndex, 1);
            resolve(eliminada[0]);
        });
    }
}

module.exports = new PeliculasModel();