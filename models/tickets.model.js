const uuid = require('uuid');
const db = require('../database/db');

class TicketsModel {
    listar() {
        return db.tickets
        
    }
    crear(datos) {
        return new Promise((resolve, reject) => {
            const reservacionExiste = db.reservaciones.find(r => r.id === datos.reservacionId);
            if (!reservacionExiste) {
                reject(new Error('La reservación no existe'));
                return;
            }
            const ticket = {
                id: uuid.v4(),
                reservacionId: datos.reservacionId,
                fechaCompra: datos.fechaCompra || new Date().toISOString(),
                metodoPago: datos.metodoPago
            };
            db.tickets.push(ticket);
            resolve(ticket);
        });
    }
    editar(id, datos) {
        return new Promise((resolve, reject) => {
            const ticketIndex = db.tickets.findIndex(t => t.id === id);
            if (ticketIndex === -1) {
                reject(new Error('El ticket no existe'));
                return;
            }
            db.tickets[ticketIndex] = { ...db.tickets[ticketIndex], ...datos };
            resolve(db.tickets[ticketIndex]);
        });
    }
    eliminar(id) {
        return new Promise((resolve, reject) => {
            const ticketIndex = db.tickets.findIndex(t => t.id === id);
            if (ticketIndex === -1) {
                reject(new Error('El ticket no existe'));
                return;
            }
            db.tickets.splice(ticketIndex, 1);
            resolve({ message: 'Ticket eliminado correctamente' });
        });
    }
    obtenerDetalles(id) {
        return new Promise((resolve, reject) => {
            const ticket = db.tickets.find(t => t.id === id);
            if (!ticket) {
                reject(new Error('El ticket no existe'));
                return;
            }
            const reservacion = db.reservaciones.find(r => r.id === ticket.reservacionId);
            if (!reservacion) {
                reject(new Error('La reservación asociada no existe'));
                return;
            }
            const funcion = db.funciones.find(f => f.id === reservacion.funcionId);
            if (!funcion) {
                reject(new Error('La función asociada no existe'));
                return;
            }
            const pelicula = db.peliculas.find(p => p.id === funcion.peliculaId);
            if (!pelicula) {
                reject(new Error('La película asociada no existe'));
                return;
            }
            const sala = db.salas.find(s => s.id === funcion.salaId);
            if (!sala) {
                reject(new Error('La sala asociada no existe'));
                return;
            }

            const datosFuncion = {
                ...ticket,
                cliente: reservacion.nombreCliente,
                pelicula: pelicula.titulo,
                sala: sala.nombre,
                horario: funcion.horario,
                total: funcion.precio * reservacion.cantidad
            };
            resolve(datosFuncion);
        });
    }
    obtenerUltimosElementos(){
        return db.tickets
        .sort((a, b) => new Date(b.fechaCompra) - new Date(a.fechaCompra))
        .slice(0,5);
    }

    filtrarPorFecha(inicio, fin) {
    const fechaInicio = new Date(inicio).getTime();
    const fechaFin = new Date(fin).getTime();

    return db.tickets.filter(ticket => {
        if (!ticket.fechaCompra) return false;

        const fechaCompra = new Date(ticket.fechaCompra).getTime();
        
        return fechaCompra >= fechaInicio && fechaCompra <= fechaFin;
    });
}
}

module.exports = new TicketsModel();