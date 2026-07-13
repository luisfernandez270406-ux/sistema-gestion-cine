# Proyecto de Gestión de Cine
Manual de Usuario: Sistema de Gestión de Cine

## 1. Introducción
Este sistema permite la administración integral de un cine, facilitando el control de películas, reservaciones, salas, tickets y funciones de manera organizada y eficiente.

A partir de esta versión, el sistema incorpora un mecanismo completo de autenticación (JWT, bcrypt y cookies HttpOnly) y autorización basada en roles (Administrador, Empleado y Cliente), además de dos nuevos módulos funcionales: Productos y Ventas, con control automático de inventario.

## 2. Requisitos Previos
Para ejecutar el sistema en tu equipo, asegúrate de tener instalado:

- Node.js.

- Servidor MySQL: Se requiere un Sistema de Gestión de Base de Datos relacional activo. Puede utilizarse mediante distribuciones locales como XAMPP.

- Navegador Web Moderno: Google Chrome o cualquier navegador con soporte completo para renderizado HTML5 y ejecución de scripts.

- Thunder Client o Postman (opcional, para probar las rutas de la API REST directamente).

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

Abra este archivo en su editor de código y copie todo su contenido. Este script crea todas las tablas del sistema, incluyendo `usuarios`, `productos` y `ventas`, además de la columna `id_usuario` en `reservaciones` (vincula cada reservación con el cliente que la creó).

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

### 4.1 Variables de Entorno

Crea un archivo `.env` en la raíz, usando `.env.example` como referencia:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=sistema_cine
JWT_SECRET=contrasena_ejemplo
```

Nota: `JWT_SECRET` firma y verifica los tokens de sesión, no debe compartirse ni subirse al repositorio.

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

Al ingresar, el navegador cargará la vista principal del sistema, permitiendo al usuario interactuar con los formularios web y ejecutar operaciones de gestión de datos en tiempo real. La página principal se adapta automáticamente según si hay una sesión activa y el rol del usuario logueado.

## 6. Sistema de Autenticación y Autorización

### 6.1 Registro e Inicio de Sesión

- Registro (GET /usuarios/registro y POST /usuarios/registro): formulario público de registro. El rol siempre se asigna automáticamente como `cliente`, nunca se toma del formulario, evitando que un usuario se autoasigne privilegios.

- Login (GET /usuarios/login y POST /usuarios/login): valida las credenciales con bcrypt y genera un JSON Web Token (JWT) que identifica al usuario y su rol, guardado en una cookie HttpOnly (no accesible desde JavaScript, protegida con sameSite: lax).

- Logout (GET /usuarios/logout): cierra la sesión eliminando la cookie del token.

### 6.2 Autenticación en la API REST

Para consumir la API desde Thunder Client, Postman u otra aplicación externa, el token se envía en el encabezado:
```text
Authorization: Bearer 
```
El middleware `verificarToken` acepta el token tanto por cookie (uso desde el navegador) como por este encabezado (uso desde la API), sin necesidad de mantener dos mecanismos separados.

### 6.3 Control de Acceso por Roles

El middleware `verificarRol(...roles)` valida que el usuario autenticado tenga uno de los roles permitidos para acceder a una ruta. Si no cumple, responde 403 en formato JSON (rutas API) o muestra un aviso en pantalla (rutas web).

Matriz de permisos:

| Módulo | Cliente | Empleado | Admin |
|---|---|---|---|
| Películas | Solo consultar | Consultar, crear y editar (no eliminar) | Acceso total |
| Funciones | Solo consultar (público) | Consultar y editar (no crear ni eliminar) | Acceso total |
| Reservaciones | Ver y crear solo las propias | Ver y gestionar todas | Acceso total |
| Productos | Sin acceso | Consultar y gestionar (eliminar solo admin) | Acceso total |
| Ventas | Sin acceso | Consultar y registrar | Acceso total |
| Usuarios | Sin acceso | Sin acceso | Acceso total |

La interfaz también adapta automáticamente los botones y el menú de navegación según el rol del usuario autenticado.

## 7. Guía de Operaciones (CRUD)
El sistema permite gestionar de forma completa el ciclo de vida de los datos para todas las entidades mediante formularios web (EJS) y peticiones HTTP. A continuación, se detalla el funcionamiento de cada una:
## 7.1. Gestión de Películas
- Listar (GET /peliculas): Muestra una tabla en la interfaz web con el catálogo de todas las películas registradas en el sistema.


- Agregar (POST /peliculas): Envía los datos desde el formulario de la vista para registrar una nueva película (Título, género, duración). Solo admin.


- Editar (PUT/POST /peliculas/editar/:id): Permite modificar los datos de una película existente mediante su ID único. Admin y empleado.


- Eliminar (DELETE /peliculas/eliminar/:id): * Control de Integridad: El sistema verifica en el modelo si la película está asignada a alguna función o reserva activa. Si tiene dependencias, la operación se cancela y se retorna un mensaje de error controlado en formato JSON ("No se puede eliminar porque tiene reservaciones"). Si está libre, se procede con el borrado. Solo admin.


## 7.2. Gestión de Salas
- Listar (GET /salas): Muestra la lista de salas disponibles en el cine, detallando su número, tipo de sala (2D/3D) y capacidad máxima de asientos.


- Agregar (POST/salas): Registra una nueva sala en las variables de memoria del sistema.


- Editar (PUT/salas/editar/:id): Modifica la capacidad o configuración de una sala específica.


- Eliminar (DELETE/salas/eliminar/:id): permite eliminar una Sala.


## 7.3. Gestión de Funciones 
- Listar (GET/funciones): Muestra la cartelera o cronograma del cine. Acceso público.


- Agregar (POST/funciones/agregar): Permite programar una función vinculando una Película específica con una Sala en un horario determinado. Admin y empleado.


- Editar(PUT/funciones/editar/:id): Modifica los datos de una funcion. Admin y empleado.


- Eliminar(DELETE/funciones/eliminar/:id): Permite cancelar funciones directamente desde la administración. Admin y empleado.


## 7.4. Gestión de Reservaciones


- Listar (GET/reservaciones): Muestra el registro de todos los bloqueos de asientos realizados. Un cliente ve únicamente sus propias reservaciones; admin y empleado ven todas.


- Agregar (POST/reservaciones): El formulario usa listas desplegables (select) alimentadas desde la base de datos, tanto para el cliente como para la función, evitando errores de captura por texto libre. El sistema vincula la reservación al id_usuario real del cliente seleccionado, y descuenta la disponibilidad de la capacidad de la sala.


- Editar(PUT/reservaciones/editar/:id): Modifica los datos de una reservacion. Restringido a admin y empleado.


- Eliminar (DELETE /reservas/eliminar/:id): Cancela la reserva y libera los asientos asociados. Restringido a admin y empleado.


## 7.5. Gestión y Reportes de Tickets


- Listar (GET /tickets): Muestra el historial de emisiones de tickets de entrada.


- Agregar (POST /tickets): Procesa el pago y emite el ticket final basado en una reservación confirmada.


- ObtenerDetalles(GET/tickets/detalles/:id): Muestra detalles sobre un ticket como su película y precio total


- Editar(PUT/tickets/editar/:id): Modifca el contenido de un ticket


- Eliminar(DELETE/tickets/eliminar/:id): Elimina el ticket


### Consultas Avanzadas (Filtros requeridos):


o	Filtrar últimos 5 elementos(GET /tickets/ultimos): Filtra y renderiza una vista con los 5 elementos más relevantes o vendidos del sistema.


o	Rango de Fechas (POST /tickets/filtrar): Permite realizar búsquedas avanzadas enviando un objeto estructurado en formato JSON a través del cuerpo de la petición con los campos correspondientes a la fecha de inicio y fin. El sistema procesa los datos en memoria y retorna únicamente los tickets emitidos en ese período de tiempo.


## 7.6. Gestión de Productos

- Listar (GET /productos): Muestra el catálogo de productos disponibles para la venta, con precio, stock y estado (activo/inactivo). Solo admin y empleado.


- Agregar (POST /productos): Registra un nuevo producto.


- Editar (PUT /productos/editar/:id): Permite modificar los datos y alternar el estado activo/inactivo mediante opciones explícitas (no un checkbox), evitando que el estado se pierda al no marcarlo.


- Eliminar (DELETE /productos/eliminar/:id): Solo admin.


## 7.7. Gestión de Ventas

- Listar (GET /ventas): Muestra el historial de ventas con producto, cliente, cantidad, total y fecha.


- Agregar (POST /ventas): El formulario solo pide cliente, producto y cantidad; el total se calcula automáticamente en el backend (precio x cantidad). La operación corre dentro de una transacción SQL: se verifica que haya stock suficiente (no se permite stock negativo), se calcula el total, se registra la venta y se descuenta el stock, todo o nada. Si no hay stock suficiente, el sistema muestra un aviso legible en el formulario en vez de un error crudo.


- Editar(PUT/ventas/editar/:id): Modifica el contenido de una venta. Restringido a admin y empleado.


- Eliminar(DELETE/ventas/eliminar/:id): Elimina la venta. Restringido a admin y empleado.


## 8. Especificaciones Técnicas
- Tecnología: Desarrollado en Node.js utilizando el framework Express.

- Arquitectura: Se utilizó el patrón MVC (Modelo-Vista-Controlador) para separar la lógica de negocio de la interfaz de usuario, con separación explícita entre rutas web (/routes) y rutas de API REST (/routes/api).

- Base de Datos: La información es almacenada y gestionada mediante MySQL, utilizando consultas SQL parametrizadas y transacciones SQL para operaciones críticas como el registro de ventas.

- Autenticación: JSON Web Tokens (JWT) firmados con una clave definida en variables de entorno, contraseñas cifradas con bcrypt, sesión persistida mediante cookies HttpOnly.

- Autorización: middlewares verificarToken y verificarRol aplicados de forma granular por ruta y por acción.

- Interfaz: Se implementaron vistas dinámicas utilizando EJS, HTML y CSS para la interacción del usuario desde el navegador, adaptadas en tiempo real según el rol del usuario autenticado.
