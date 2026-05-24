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
    salas: [],
    funciones: [],
    tickets: [],
    reservaciones: []
};