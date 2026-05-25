const uuid = require('uuid');
const db = require('../database/db');

class FuncionesModel {
    listar() {
        return db.funciones.map(funcion => {
            const pelicula = db.peliculas.find(p => p.id === funcion.peliculaId);
            const sala = db.salas.find(s => s.id === funcion.salaId);
            let datosFuncion = {
                ...funcion,
                pelicula: '',
                sala: ''
            };
            if (pelicula) {
                datosFuncion.pelicula = pelicula.titulo;
            } else {
                datosFuncion.pelicula = 'Pelicula no encontrada';
            }

            if (sala) {
                datosFuncion.sala = sala.nombre;
            } else {
                datosFuncion.sala = 'Sala no encontrada';
            }

            return datosFuncion;
        });
    }
    crear(datos) {
        return new Promise((resolve, reject) => {
            const peliculaExiste = db.peliculas.find(p => p.id === datos.peliculaId);
            const salaExiste = db.salas.find(s => s.id === datos.salaId);

            if (!peliculaExiste) {
                reject(new Error('La película no existe'));
                return;
            }

            if (!salaExiste) {
                reject(new Error('La sala no existe'));
                return;
            }

            const nuevaFuncion = {
                id: uuid.v4(),
                ...datos
            };

            db.funciones.push(nuevaFuncion);
            resolve(nuevaFuncion);
        });
    }
    editar(id, datos) {
        return new Promise((resolve, reject) => {
            const funcionIndex = db.funciones.findIndex(f => f.id === id);
            if (funcionIndex === -1) {
                reject(new Error('Función no encontrada'));
                return;
            }
            const funcionActualizada = {
                ...db.funciones[funcionIndex],
                ...datos
            };
            db.funciones[funcionIndex] = funcionActualizada;
            resolve(funcionActualizada);
        });   
    }
    eliminar(id) {
        return new Promise((resolve, reject) => {
            const funcionIndex = db.funciones.findIndex(f => f.id === id);
            if (funcionIndex === -1) {
                reject(new Error('Función no encontrada'));
                return;
            }
            db.funciones.splice(funcionIndex, 1);
            resolve({ message: 'Función eliminada correctamente' });
        });
    }
}

module.exports = new FuncionesModel();