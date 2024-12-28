const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Task Manager API',
			version: '1.0.0',
			description: 'API documentation for Task Manager',
		},
	},
	apis: ['./router/*.router.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app) => {
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
