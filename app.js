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
import usuariosRoutes from './routes/usuarios.js';
import peliculasApiRoutes from './routes/api/peliculas.api.js';
import salasApiRoutes from './routes/api/salas.api.js';
import funcionesApiRoutes from './routes/api/funciones.api.js';
import reservacionesApiRoutes from './routes/api/reservaciones.api.js';
import ticketsApiRoutes from './routes/api/tickets.api.js';
import usuariosApiRoutes from './routes/api/usuarios.api.js';
import productosRoutes from './routes/productos.js';
import productosApiRoutes from './routes/api/productos.api.js';
import cookieParser from "cookie-parser";
import ventasRoutes from './routes/ventas.js';
import ventasApiRoutes from './routes/api/ventas.api.js';
import jwt from "jsonwebtoken";


//Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

//Middlewares Necesarios para leer datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());


app.use((req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        res.locals.usuario = null;
        return next();
    }

    try {

        const datos = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = datos;

        res.locals.usuario = datos;

    } catch (error) {

        res.locals.usuario = null;

    }

    next();

});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

// Ruta principal de prueba
app.get('/', (req, res) => {
    res.render('index'); 
});
// Rutas de películas
app.use('/peliculas', peliculasRoutes);

app.use('/api/peliculas', peliculasApiRoutes);

//rutas de salas
app.use('/salas', salasRoutes);

app.use('/api/salas', salasApiRoutes);

//rutas de funciones
app.use('/funciones', funcionesRoutes);

app.use('/api/funciones', funcionesApiRoutes);
//rutas de reservaciones
app.use('/reservaciones', reservacionesRoutes);

app.use('/api/reservaciones', reservacionesApiRoutes);
//rutas de tickets
app.use('/tickets', ticketsRoutes);

app.use('/api/tickets', ticketsApiRoutes);
//rutas de usuarios
app.use('/usuarios', usuariosRoutes);
app.use('/api/usuarios', usuariosApiRoutes);
//rutas de productos 
app.use('/productos', productosRoutes);
app.use('/api/productos', productosApiRoutes);
//rutas de ventas
app.use('/ventas', ventasRoutes);
app.use('/api/ventas', ventasApiRoutes);

//Iniciar el servidor\
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});