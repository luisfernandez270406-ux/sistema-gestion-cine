# Proyecto de Gestión de Cine
Manual de Usuario: Sistema de Gestión de Cine
## 1. Introducción
Este sistema permite la administración integral de un cine, facilitando el control de películas, reservaciones, salas, tickets y funciones de manera organizada y eficiente.
## 2. Requisitos Previos
Para ejecutar el sistema en tu equipo, asegúrate de tener instalado:
•	Node.js: (Versión 18 o superior recomendada).
## 3. Instalación y Puesta en Marcha
Una vez descargado el proyecto, sigue estos pasos desde la terminal:
1.	Instalar dependencias: Entra a la carpeta del proyecto y escribe: npm install
2.	Iniciar el servidor: Ejecuta el siguiente comando: npm start
3.	Acceso al sistema: Abre tu navegador y entra en: http://localhost:3000
## 4. Guía de Operaciones (CRUD)
El sistema permite gestionar de forma completa el ciclo de vida de los datos para todas las entidades mediante formularios web (EJS) y peticiones HTTP. A continuación, se detalla el funcionamiento de cada una:
## 4.1. Gestión de Películas
•	Listar (GET /peliculas): Muestra una tabla en la interfaz web con el catálogo de todas las películas registradas en el sistema.


•	Agregar (POST /peliculas): Envía los datos desde el formulario de la vista para registrar una nueva película (Título, género, duración).


•	Editar (PUT/POST /peliculas/editar/:id): Permite modificar los datos de una película existente mediante su ID único.


•	Eliminar (DELETE /peliculas/eliminar/:id): * Control de Integridad: El sistema verifica en el modelo si la película está asignada a alguna función o reserva activa. Si tiene dependencias, la operación se cancela y se retorna un mensaje de error controlado en formato JSON ("No se puede eliminar porque tiene reservaciones"). Si está libre, se procede con el borrado.


## 4.2. Gestión de Salas
•	Listar (GET /salas): Muestra la lista de salas disponibles en el cine, detallando su número, tipo de sala (2D/3D) y capacidad máxima de asientos.


•	Agregar (POST/salas): Registra una nueva sala en las variables de memoria del sistema.


•	Editar (PUT/salas/editar/:id): Modifica la capacidad o configuración de una sala específica.


•	Eliminar (DELETE/salas/eliminar/:id): permite eliminar una Sala.


## 4.3. Gestión de Funciones 
•	Listar (GET/funciones): Muestra la cartelera o cronograma del cine.


•	Agregar (POST/funciones/agregar): Permite programar una función vinculando una Película específica con una Sala en un horario determinado.


•	Editar(PUT/funciones/editar/:id): Modifica los datos de una funcion


•	Eliminar(DELETE/funciones/eliminar/:id): Permite cancelar funciones directamente desde la administración.


## 4.4. Gestión de Reservaciones


•	Listar (GET/reservaciones): Muestra el registro de todos los bloqueos de asientos realizados.


•	Agregar (POST/reservaciones): El cliente selecciona una Función y se registran los asientos reservados, restando la disponibilidad de la capacidad de la sala.


•	Editar(PUT/reservaciones/editar/:id):Modifica los datos de una reservacion


•	Eliminar (DELETE /reservas/eliminar/:id): Cancela la reserva y libera los asientos asociados.


## 4.5. Gestión y Reportes de Tickets


•	Listar (GET /tickets): Muestra el historial de emisiones de tickets de entrada.


•	Agregar (POST /tickets): Procesa el pago y emite el ticket final basado en una reservación confirmada.


•	ObtenerDetalles(GET/tickets/detalles/:id): Muestra detalles sobre un ticket como su película y precio total


•	Editar(PUT/tickets/editar/:id): Modifca el contenido de un ticket


•	Eliminar(DELTE/tickets/editar/:id): Elimina el ticket


### Consultas Avanzadas (Filtros requeridos):


o	Filtrar últimos 5 elementos(GET /tickets/ultimos): Filtra y renderiza una vista con los 5 elementos más relevantes o vendidos del sistema.


o	Rango de Fechas (POST /tickets/filtrar): Permite realizar búsquedas avanzadas enviando un objeto estructurado en formato JSON a través del cuerpo de la petición con los campos correspondientes a la fecha de inicio y fin. El sistema procesa los datos en memoria y retorna únicamente los tickets emitidos en ese período de tiempo.


## 5. Especificaciones Técnicas
•	Tecnología: Desarrollado en Node.js utilizando el framework Express.


•	Arquitectura: Se utilizó el patrón MVC (Modelo-Vista-Controlador) para separar la lógica de negocio de la interfaz de usuario.


•	Datos: La información es gestionada mediante variables locales para esta versión del sistema.
