const uuid = require('uuid');
const db = require('../database/db');

class ReservacionesModel {
    listar() {
        return db.reservaciones;

    }
    listarDetallado() {
        return db.reservaciones.map(reserva => {
            const funcion = db.funciones.find(f => f.id === reserva.funcionId);
            
            let nombrePelicula = "No encontrada";
            if (funcion) {
                const pelicula = db.peliculas.find(p => p.id === funcion.peliculaId);
                if (pelicula) {
                    nombrePelicula = pelicula.titulo;
                }
            }

            return {
                ...reserva,
                nombrePelicula: nombrePelicula
            };
        });
    }
    crear(datos) {
        return new Promise((resolve, reject) => {
            const funcionExiste = db.funciones.find(f => f.id === datos.funcionId);
            if (!funcionExiste) {
                reject(new Error('La función no existe'));
                return;
            }
            const nuevaReservacion = {
                id: uuid.v4(),
                ...datos
            };
            db.reservaciones.push(nuevaReservacion);
            resolve(nuevaReservacion);
        });
    }
    editar(id, datos) {
        return new Promise((resolve, reject) => {
            const reservacionIndex = db.reservaciones.findIndex(r => r.id === id);
            if (reservacionIndex === -1) {
                reject(new Error('Reservación no encontrada'));
                return;
            }
            const reservacionActualizada = {
                ...db.reservaciones[reservacionIndex],
                ...datos
            };
            db.reservaciones[reservacionIndex] = reservacionActualizada;
            resolve(reservacionActualizada);
        });
    }
    eliminar(id) {
        return new Promise((resolve, reject) => {
            const reservacionIndex = db.reservaciones.findIndex(r => r.id === id);
            if (reservacionIndex === -1) {
                reject(new Error('Reservación no encontrada'));
                return;
            }
            db.reservaciones.splice(reservacionIndex, 1);
            resolve({ message: 'Reservación eliminada correctamente' });
        });
    }
}

module.exports = new ReservacionesModel();