const uuid = require('uuid');
const db = require('../database/db');

class SalasModel {
    listar() {
        return db.salas;
    }

    crear(datos) {
        return new Promise((resolve, reject) => {
            if(!datos.nombre || !datos.capacidad || !datos.tipo) {
                return reject("Faltan datos obligatorios para crear la sala");
            }
            const nuevaSala = {
                id: uuid.v4(),
                nombre: datos.nombre,
                capacidad: datos.capacidad,
                tipo: datos.tipo
            };
            db.salas.push(nuevaSala);
            resolve(nuevaSala);
        });
    }
    editar(id, datos) {
        return new Promise((resolve, reject) => {
            const salaIndex = db.salas.findIndex(s => s.id === id);
            if(salaIndex === -1) {
                return reject("Sala no encontrada");
            }
            const salaActualizada = { ...db.salas[salaIndex], ...datos };
            db.salas[salaIndex] = salaActualizada;
            resolve(salaActualizada);
        });
    }
    eliminar(id) {
        return new Promise((resolve, reject) => {
            const salaIndex = db.salas.findIndex(s => s.id === id);
            if(salaIndex === -1) {
                return reject("Sala no encontrada");
            }
            const eliminada = db.salas.splice(salaIndex, 1);
            resolve(eliminada[0]);
        });
    }
}

module.exports = new SalasModel();