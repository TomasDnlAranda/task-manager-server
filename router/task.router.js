const express = require('express');
const { check } = require('express-validator');
const {
	createTask,
	getTasks,
	getTaskById,
	updateTask,
	deleteTask,
} = require('../controllers/task.controller');

const router = express.Router();

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     description: Crea una tarea nueva y la guarda en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *       400:
 *         description: Error en los datos proporcionados
 */
router.post('/tasks', [check('title', 'Title is required').not().isEmpty()], createTask);
/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     description: Obtiene una lista de todas las tareas. Puedes filtrar por estado con el parámetro 'status'.
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         description: Filtra las tareas por estado. Puede ser 'completada' o 'pendiente'.
 *         schema:
 *           type: string
 *           enum: [completada, pendiente]
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   completed:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */
router.get('/tasks', getTasks);
/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtener una tarea específica
 *     description: Obtiene los detalles de una tarea específica por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *       404:
 *         description: Tarea no encontrada
 */
router.get('/tasks/:id', getTaskById);
/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea existente
 *     description: Actualiza los detalles de una tarea existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *       404:
 *         description: Tarea no encontrada
 */
router.put('/tasks/:id', updateTask);
/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     description: Elimina una tarea específica por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *       404:
 *         description: Tarea no encontrada
 */
router.delete('/tasks/:id', deleteTask);

module.exports = router;
