# Task Manager - Backend

## Descripción

Backend de la aplicación de gestión de tareas **Task Manager**. Permite gestionar las tareas con funcionalidades para crear, leer, actualizar y eliminar tareas, además de filtrarlas por estado (completada o pendiente).

## Enlace a la API desplegada

[https://task-manager-server-1py4.onrender.com/](https://task-manager-server-1py4.onrender.com)

## Instalación local

1. Clona el repositorio:

```bash
git clone https://github.com/TomasDnlAranda/task-manager-server.git
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura las variables de entorno: Crea un archivo .env en la raíz del proyecto y agrega:

```env
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@base-de-datos.mongodb.net/
PORT=5000
```

4. Ejecuta el servidor:

```bash
npm start
```

## Endpoints

### POST /api/tasks

- **Descripción**: Crea una nueva tarea.
- **Campos requeridos**: `title` (string), `description` (string)
- **Respuesta**: La tarea recién creada.

### GET /api/tasks

- **Descripción**: Devuelve la lista de todas las tareas.
- **Parámetros de consulta**: `status` (completado o pendiente).
- **Respuesta**: Lista de tareas.

### GET /api/tasks/:id

- **Descripción**: Devuelve los detalles de una tarea específica.
- **Parámetros**: `id` (ID de la tarea).
- **Respuesta**: Datos de la tarea.

### PUT /api/tasks/:id

- **Descripción**: Permite actualizar los datos de una tarea.
- **Parámetros**: `id` (ID de la tarea).
- **Campos posibles**: `title`, `description`, `completed`.
- **Respuesta**: La tarea actualizada.

### DELETE /api/tasks/:id

- **Descripción**: Elimina una tarea.
- **Parámetros**: `id` (ID de la tarea).
- **Respuesta**: Mensaje de confirmación de eliminación.

## Tecnologías

- Node.js
- Express
- MongoDB con Mongoose
- Express Validator

- Swagger para documentación de API

## Despliegue

1. Backend:
   - Desplegado en [Render](https://render.com/).
   - Enlace de producción: [https://task-manager-server-1py4.onrender.com](https://task-manager-server-1py4.onrender.com).

## Documentación de la API

La API está documentada con Swagger. Puedes acceder a la documentación en:

[https://task-manager-server-1py4.onrender.com/api-docs/](https://task-manager-server-1py4.onrender.com/api-docs/)
