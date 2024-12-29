const request = require('supertest');
const express = require('express');
const mockingoose = require('mockingoose');
const Task = require('../../models/task.model');
const {
	createTask,
	getTasks,
	getTaskById,
	updateTask,
	deleteTask,
} = require('../../controllers/task.controller');

// Crear una aplicación Express solo para las pruebas
const app = express();
app.use(express.json()); // Para parsear JSON en el cuerpo de las peticiones

// Definir rutas que usen las funciones del controlador
app.post('/api/tasks', createTask);
app.get('/api/tasks', getTasks);
app.get('/api/tasks/:id', getTaskById);
app.put('/api/tasks/:id', updateTask);
app.delete('/api/tasks/:id', deleteTask);

describe('Task Controller', () => {
	describe('POST /tasks', () => {
		it('should create a new task and return status 201', async () => {
			const newTask = { title: 'Test Task', description: 'Test Description' };

			mockingoose(Task).toReturn(newTask, 'save');

			const response = await request(app).post('/api/tasks').send(newTask);

			expect(response.status).toBe(201);
			expect(response.body.title).toBe('Test Task');
			expect(response.body.description).toBe('Test Description');
		});
	});

	describe('GET /tasks', () => {
		it('should return an array of tasks', async () => {
			const tasks = [
				{ title: 'Task 1', description: 'Description 1' },
				{ title: 'Task 2', description: 'Description 2' },
			];

			mockingoose(Task).toReturn(tasks, 'find');

			const response = await request(app).get('/api/tasks');

			expect(response.status).toBe(200);
			expect(response.body).toHaveLength(2);
			expect(response.body[0].title).toBe('Task 1');
			expect(response.body[1].title).toBe('Task 2');
		});
	});

	describe('GET /tasks/:id', () => {
		it('should return a task if found', async () => {
			const task = { title: 'Test Task', description: 'Test Description' };

			// Simular que se encuentra una tarea por ID
			mockingoose(Task).toReturn(task, 'findOne');

			const response = await request(app).get('/api/tasks/1');

			expect(response.status).toBe(200);
			expect(response.body.title).toBe('Test Task');
		});

		it('should return 404 if task not found', async () => {
			mockingoose(Task).toReturn(null, 'findOne');

			const response = await request(app).get('/api/tasks/1');

			expect(response.status).toBe(404);
			expect(response.body.message).toBe('Task not found');
		});
	});

	describe('PUT /tasks/:id', () => {
		it('should update a task and return it', async () => {
			const updatedTask = { title: 'Updated Task', description: 'Updated Description' };

			mockingoose(Task).toReturn(updatedTask, 'findOneAndUpdate');

			const response = await request(app).put('/api/tasks/1').send(updatedTask);

			expect(response.status).toBe(200);
			expect(response.body.title).toBe('Updated Task');
		});

		it('should return 404 if task not found', async () => {
			mockingoose(Task).toReturn(null, 'findOneAndUpdate');

			const response = await request(app).put('/api/tasks/1').send({ title: 'Updated Task' });

			expect(response.status).toBe(404);
			expect(response.body.message).toBe('Task not found');
		});
	});

	describe('DELETE /tasks/:id', () => {
		it('should delete a task and return a success message', async () => {
			mockingoose(Task).toReturn({}, 'findOneAndDelete');

			const response = await request(app).delete('/api/tasks/1');

			expect(response.status).toBe(200);
			expect(response.body.message).toBe('Task deleted');
		});

		it('should return 404 if task not found', async () => {
			mockingoose(Task).toReturn(null, 'findOneAndDelete');

			const response = await request(app).delete('/api/tasks/1');

			expect(response.status).toBe(404);
			expect(response.body.message).toBe('Task not found');
		});
	});
});
