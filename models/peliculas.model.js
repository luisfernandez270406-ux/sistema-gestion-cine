const { v4: uuidv4 } = require('uuid');
const pool = require('../database/db');


class PeliculasModel {
    
    static async listar() {
        try {
            const [filas] = await pool.query('SELECT * FROM peliculas');
            return filas; 
        } catch (error) {
            console.error('Error al obtener películas:', error);
            throw error;
        }
    }

    static async crear(datosPelicula) {
    try {
        const id = uuidv4(); 
        const { titulo, genero, duracion, director, anio, sinopsis } = datosPelicula;
        const [resultado] = await pool.query(
            'INSERT INTO peliculas (id, titulo, genero, duracion, director, anio, sinopsis) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [id, titulo, genero, duracion, director, anio, sinopsis]
        );
        return resultado;
    } catch (error) {
        console.error('Error al crear película:', error);
        throw error;
    }
}

    static async editar(id, datosPelicula) {
        try {
            const { titulo, genero, duracion, director, anio, sinopsis } = datosPelicula;
            const [resultado] = await pool.query(
                'UPDATE peliculas SET titulo = ?, genero = ?, duracion = ?, director = ?, anio = ?, sinopsis = ? WHERE id = ?',
                [titulo, genero, duracion, director, anio, sinopsis, id]
            );
            return resultado;
        } catch (error) {
            console.error('Error al editar película:', error);
            throw error;
        }
    }

    static async eliminar(id) {
        try {
            const [resultado] = await pool.query(
                'DELETE FROM peliculas WHERE id = ?',
                [id]
            );
            return resultado;
        } catch (error) {
            console.error('Error al eliminar película:', error);
            throw error;
        }
    }
     static async obtenerPorId(id) {
    try {
        const [filas] = await pool.query(
            'SELECT * FROM peliculas WHERE id = ?',
            [id]
        );
        return filas[0];
    } catch (error) {
        console.error('Error al obtener película:', error);
        throw error;
    }
}
}

module.exports = PeliculasModel;