const Task = require('../models/task.model');
const { validationResult } = require('express-validator');

const createTask = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const { title, description } = req.body;
		const newTask = new Task({ title, description });
		await newTask.save();
		res.status(201).json(newTask);
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
};

const getTasks = async (req, res) => {
	try {
		const { completed } = req.query;
		const filter = completed ? { completed: completed === 'true' } : {};
		const tasks = await Task.find(filter);
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
};

const getTaskById = async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);
		if (!task) return res.status(404).json({ message: 'Task not found' });
		res.status(200).json(task);
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
};

const updateTask = async (req, res) => {
	try {
		const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!task) return res.status(404).json({ message: 'Task not found' });
		res.status(200).json(task);
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
};

const deleteTask = async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id);
		if (!task) return res.status(404).json({ message: 'Task not found' });
		res.status(200).json({ message: 'Task deleted' });
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
