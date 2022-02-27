const express = require('express');
const controller = require('./controller');

const Router = express.Router();

Router
	.route('/multiple/')
	.get(controller.generateMultipleWords);

module.exports = Router;