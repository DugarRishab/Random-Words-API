const express = require('express');
const controller = require('./controller');

const Router = express.Router();

Router
	.route('/multiple/')
	.get(controller.generateMultipleWords);

Router.route('/check/:word').get(controller.checkWord);

Router.get('/filterData', controller.filterData);

module.exports = Router;

