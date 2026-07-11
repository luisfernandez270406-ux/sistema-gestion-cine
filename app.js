import dotenv from 'dotenv/config';
import express from 'express';
const app = express();
import methodOverride from 'method-override';
import './database/db.js';
import peliculasRoutes from './routes/peliculas.js';
import salasRoutes from './routes/salas.js';
import funcionesRoutes from './routes/funciones.js';
import reservacionesRoutes from './routes/reservaciones.js';
import ticketsRoutes from './routes/tickets.js';

//Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

//Middlewares Necesarios para leer datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

// Ruta principal de prueba
app.get('/', (req, res) => {
    res.render('index'); 
});
// Rutas de películas
app.use('/peliculas', peliculasRoutes);

//rutas de salas
app.use('/salas', salasRoutes);

//rutas de funciones
app.use('/funciones', funcionesRoutes);
//rutas de reservaciones
app.use('/reservaciones', reservacionesRoutes);
//rutas de tickets
app.use('/tickets', ticketsRoutes);

//Iniciar el servidor\
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});