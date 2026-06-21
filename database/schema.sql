-- Primero borramos la base de datos si existe y la creamos de nuevo
DROP DATABASE IF EXISTS sistema_cine;
CREATE DATABASE sistema_cine;
USE sistema_cine;

-- 1. Tablas independientes (sin llaves foráneas todavía)
CREATE TABLE peliculas (
    id VARCHAR(36) PRIMARY KEY,
    titulo VARCHAR(255),
    genero VARCHAR(100),
    duracion INT,
    director VARCHAR(100),
    anio INT,
    sinopsis TEXT
);

CREATE TABLE salas (
    id VARCHAR(36) PRIMARY KEY,
    nombre VARCHAR(100),
    capacidad INT,
    tipo VARCHAR(50)
);

-- 2. Tablas con llaves foráneas
CREATE TABLE funciones (
    id VARCHAR(36) PRIMARY KEY,
    id_pelicula VARCHAR(36),
    id_sala VARCHAR(36),
    horario DATETIME,
    precio DECIMAL(10,2),
    FOREIGN KEY (id_pelicula) REFERENCES peliculas(id),
    FOREIGN KEY (id_sala) REFERENCES salas(id)
);

CREATE TABLE reservaciones (
    id VARCHAR(36) PRIMARY KEY,
    id_funcion VARCHAR(36),
    nombre_cliente VARCHAR(150),
    cantidad_asientos INT,
    FOREIGN KEY (id_funcion) REFERENCES funciones(id)
);

CREATE TABLE tickets (
    id VARCHAR(36) PRIMARY KEY,
    id_reservacion VARCHAR(36),
    codigo_ticket VARCHAR(50),
    fecha_emision TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metodo_pago VARCHAR(50),
    FOREIGN KEY (id_reservacion) REFERENCES reservaciones(id)
);