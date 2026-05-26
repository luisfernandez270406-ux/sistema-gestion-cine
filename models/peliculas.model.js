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
        // 1. Validación segura de relaciones usando encadenamiento opcional (?.)
        const existeReservacion = db.reservaciones.some(r => {
            const funcion = db.funciones.find(f => f.id == r.funcionId);
            return funcion?.peliculaId == id; 
        });

        if (existeReservacion) {
            // Mandamos el mensaje al .catch() del controlador
            return reject('No se puede eliminar la película porque tiene reservaciones asociadas');
        }

        // 2. Búsqueda segura del índice
        const index = db.peliculas.findIndex(p => p.id == id);
        
        if (index === -1) {
            return reject('Película no encontrada');
        }

        // 3. Eliminación del arreglo
        db.peliculas.splice(index, 1);
        resolve(); // Todo salió bien, va al .then() del controlador
    });
}
}

module.exports = new PeliculasModel();