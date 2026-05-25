const express = require('express');
const app = express();

//Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', './views');

//Middlewares Necesarios para leer datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta principal de prueba
app.get('/', (req, res) => {
    res.send('Servidor de CINE activo - Lucho Facha');
});
// Rutas de películas
app.use('/peliculas', require('./routes/peliculas'));

//rutas de salas
app.use('/salas', require('./routes/salas'));

//Iniciar el servidor\
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});