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
    res.render('index'); 
});
// Rutas de películas
app.use('/peliculas', require('./routes/peliculas'));

//rutas de salas
app.use('/salas', require('./routes/salas'));

//rutas de funciones
app.use('/funciones', require('./routes/funciones'));
//rutas de reservaciones
app.use('/reservaciones', require('./routes/reservaciones'));
//rutas de tickets
app.use('/tickets', require('./routes/tickets'));

//Iniciar el servidor\
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});