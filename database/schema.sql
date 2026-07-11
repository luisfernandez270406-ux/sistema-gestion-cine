-- Primero borramos la base de datos si existe y la creamos de nuevo
DROP DATABASE IF EXISTS sistema_cine;
CREATE DATABASE sistema_cine;
USE sistema_cine;

-- 1. Tablas independientes (sin llaves foráneas todavía)
CREATE TABLE peliculas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    genero VARCHAR(100),
    duracion INT,
    director VARCHAR(100),
    anio INT,
    sinopsis TEXT
);

CREATE TABLE salas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    capacidad INT,
    tipo VARCHAR(50)
);

-- 2. Tablas con llaves foráneas
CREATE TABLE funciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pelicula INT,
    id_sala INT,
    horario DATETIME,
    precio DECIMAL(10,2),
    FOREIGN KEY (id_pelicula) REFERENCES peliculas(id),
    FOREIGN KEY (id_sala) REFERENCES salas(id)
);

CREATE TABLE reservaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_funcion INT,
    nombre_cliente VARCHAR(150),
    cantidad_asientos INT,
    FOREIGN KEY (id_funcion) REFERENCES funciones(id)
);

CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_reservacion INT,
    fecha_emision TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metodo_pago VARCHAR(50),
    FOREIGN KEY (id_reservacion) REFERENCES reservaciones(id)
);