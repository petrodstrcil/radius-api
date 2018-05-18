'use strict';

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

var app = express();
app.use('/radius-api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));