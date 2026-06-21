# Proyecto de Gestión de Cine
Manual de Usuario: Sistema de Gestión de Cine
## 1. Introducción
Este sistema permite la administración integral de un cine, facilitando el control de películas, reservaciones, salas, tickets y funciones de manera organizada y eficiente.
## 2. Requisitos Previos
Para ejecutar el sistema en tu equipo, asegúrate de tener instalado:
•	Node.js.
•	Servidor MySQL: Se requiere un Sistema de Gestión de Base de Datos relacional activo. Puede utilizarse mediante distribuciones locales como XAMPP.
•	Navegador Web Moderno: Google Chrome o cualquier navegador con soporte completo para renderizado HTML5 y ejecución de scripts.
## 3. Configuración e Inicialización de la Base de Datos
Abra el panel de control de XAMPP e inicie los módulos de **Apache** y **MySQL** haciendo clic en el botón **Start** correspondiente a cada servicio, verificando que ambos se resalten en color verde
### 3.2 Acceso al Gestor
Abra su navegador web y diríjase a la dirección:
```text
http://localhost/phpmyadmin
```
para acceder directamente a la interfaz gráfica de administración de bases de datos.
### 3.3 Localización del Script

Ubique el archivo de estructuración de datos denominado **schema.sql**, el cual se encuentra dentro del directorio:

```text
/database
```

Abra este archivo en su editor de código y copie todo su contenido.

### 3.4 Ejecución del Script

Dentro de la interfaz de phpMyAdmin, seleccione la pestaña **SQL** ubicada en el menú de navegación superior.

Pegue el contenido copiado del archivo **schema.sql** en el cuadro de consultas y presione el botón **Continuar** para ejecutar el script.

Al finalizar este proceso, la estructura de la base de datos quedará creada y lista para ser utilizada por la aplicación.

---

## 4. Despliegue y Preparación del Entorno de Aplicación

Tras clonar el repositorio, se debe acceder a la carpeta raíz del proyecto desde la terminal y ejecutar el siguiente comando para instalar todas las dependencias necesarias:

```bash
npm install
```

### 4.1 Configuración de Conexión

El sistema establece la conexión con la base de datos mediante el archivo:

```text
database/db.js
```
Por defecto, la configuración está preparada para un entorno local estándar
```

**Nota:** Si su gestor MySQL utiliza contraseña, deberá modificar el valor del campo `password` antes de iniciar la aplicación.

```
## 5. Arranque del Servidor y Validación de Acceso

### 5.1 Ejecución del Servidor

Desde la terminal del proyecto, inicie la aplicación mediante el comando:

```bash
npm start
```

### 5.2 Validación en Consola

Node.js iniciará el servidor Express y establecerá la conexión con MySQL.

Si la conexión se realiza correctamente, la terminal mostrará el mensaje:

```text
Conexion sql funcional
```

### 5.3 Acceso a la Interfaz Gráfica

Con el servidor en ejecución, abra su navegador web e introduzca la siguiente dirección:

```text
http://localhost:3000
```

Al ingresar, el navegador cargará la vista principal del sistema, permitiendo al usuario interactuar con los formularios web y ejecutar operaciones de gestión de datos en tiempo real.

## 6. Guía de Operaciones (CRUD)
El sistema permite gestionar de forma completa el ciclo de vida de los datos para todas las entidades mediante formularios web (EJS) y peticiones HTTP. A continuación, se detalla el funcionamiento de cada una:
## 6.1. Gestión de Películas
•	Listar (GET /peliculas): Muestra una tabla en la interfaz web con el catálogo de todas las películas registradas en el sistema.


•	Agregar (POST /peliculas): Envía los datos desde el formulario de la vista para registrar una nueva película (Título, género, duración).


•	Editar (PUT/POST /peliculas/editar/:id): Permite modificar los datos de una película existente mediante su ID único.


•	Eliminar (DELETE /peliculas/eliminar/:id): * Control de Integridad: El sistema verifica en el modelo si la película está asignada a alguna función o reserva activa. Si tiene dependencias, la operación se cancela y se retorna un mensaje de error controlado en formato JSON ("No se puede eliminar porque tiene reservaciones"). Si está libre, se procede con el borrado.


## 6.2. Gestión de Salas
•	Listar (GET /salas): Muestra la lista de salas disponibles en el cine, detallando su número, tipo de sala (2D/3D) y capacidad máxima de asientos.


•	Agregar (POST/salas): Registra una nueva sala en las variables de memoria del sistema.


•	Editar (PUT/salas/editar/:id): Modifica la capacidad o configuración de una sala específica.


•	Eliminar (DELETE/salas/eliminar/:id): permite eliminar una Sala.


## 6.3. Gestión de Funciones 
•	Listar (GET/funciones): Muestra la cartelera o cronograma del cine.


•	Agregar (POST/funciones/agregar): Permite programar una función vinculando una Película específica con una Sala en un horario determinado.


•	Editar(PUT/funciones/editar/:id): Modifica los datos de una funcion


•	Eliminar(DELETE/funciones/eliminar/:id): Permite cancelar funciones directamente desde la administración.


## 6.4. Gestión de Reservaciones


•	Listar (GET/reservaciones): Muestra el registro de todos los bloqueos de asientos realizados.


•	Agregar (POST/reservaciones): El cliente selecciona una Función y se registran los asientos reservados, restando la disponibilidad de la capacidad de la sala.


•	Editar(PUT/reservaciones/editar/:id):Modifica los datos de una reservacion


•	Eliminar (DELETE /reservas/eliminar/:id): Cancela la reserva y libera los asientos asociados.


## 6.5. Gestión y Reportes de Tickets


•	Listar (GET /tickets): Muestra el historial de emisiones de tickets de entrada.


•	Agregar (POST /tickets): Procesa el pago y emite el ticket final basado en una reservación confirmada.


•	ObtenerDetalles(GET/tickets/detalles/:id): Muestra detalles sobre un ticket como su película y precio total


•	Editar(PUT/tickets/editar/:id): Modifca el contenido de un ticket


•	Eliminar(DELETE/tickets/eliminar/:id): Elimina el ticket


### Consultas Avanzadas (Filtros requeridos):


o	Filtrar últimos 5 elementos(GET /tickets/ultimos): Filtra y renderiza una vista con los 5 elementos más relevantes o vendidos del sistema.


o	Rango de Fechas (POST /tickets/filtrar): Permite realizar búsquedas avanzadas enviando un objeto estructurado en formato JSON a través del cuerpo de la petición con los campos correspondientes a la fecha de inicio y fin. El sistema procesa los datos en memoria y retorna únicamente los tickets emitidos en ese período de tiempo.


## 7. Especificaciones Técnicas
•	Tecnología: Desarrollado en Node.js utilizando el framework Express.

•	Arquitectura: Se utilizó el patrón MVC (Modelo-Vista-Controlador) para separar la lógica de negocio de la interfaz de usuario.

• Base de Datos: La información es almacenada y gestionada mediante MySQL, utilizando consultas SQL para las operaciones CRUD del sistema.

• Interfaz: Se implementaron vistas dinámicas utilizando EJS, HTML y CSS para la interacción del usuario desde el navegador.
