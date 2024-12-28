const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

app.use(express.json());
app.use(cors());

const taskRoutes = require('./router/task.router');

app.use('/api', taskRoutes);

const setupSwagger = require('./utils/swagger');

setupSwagger(app);

connectDB();

module.exports = app;
