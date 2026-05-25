// database/db.js
module.exports = {
    peliculas: [
        {
            id: '1',// prueba de id fijo, luego se generará automáticamente
            titulo: 'Inception',
            director: 'Christopher Nolan',
            anio: 2025,
            genero: 'Ciencia Ficción',
            duracion: 120,
            sinopsis: 'Un ladrón que roba secretos corporativos...'

        },
        {
            id: '2',
            titulo: 'The Matrix',
            director: 'The Wachowskis',
            anio: 1999,
            genero: 'Ciencia Ficción',
            duracion: 136,
            sinopsis: 'Un programador descubre que la realidad es una simulación...'
        },
    ],
    salas: [
        {
            id: '1',
            nombre: 'Sala 1',
            capacidad: 100,
            tipo: '2D'
        },
    ],
    funciones: [
        {
            id: '1',
            peliculaId: '1',
            salaId: '1',
            horario: '2026-12-01T20:00:00',
            precio: 10.00
        },
    ],
    tickets: [
        {
            id: '1',
            reservacionId: '1',
            fechaCompra: '2026-11-01T15:00:00',
            metodoPago: 'Tarjeta de Crédito'

        }
    ],
    reservaciones: [
        {
            id: '1',
            funcionId: '1',
            nombreCliente: 'Juan Pérez',
            cantidad: 2
        }
    ]
};