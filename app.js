const express = require('express');
const app = express();

// 1. Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// 2. Middlewares (Necesarios para leer datos de formularios)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 3. Ruta principal de prueba
app.get('/', (req, res) => {
    res.send('Servidor de CINE activo - Lucho Facha');
});

// 4. Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});