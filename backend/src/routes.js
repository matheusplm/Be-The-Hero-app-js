const express = require('express');

const OngController = require('./controllers/OngController');
const CasoController = require('./controllers/CasoController');
const PerfilController = require('./controllers/PerfilController');
const LoginController = require('./controllers/LoginController');

const connection = require('./database/connection');

const routes = express.Router();


//ROTAS
routes.post('/ongs',OngController.create);
routes.get('/ongs',OngController.index);


routes.post('/incidents',CasoController.create);
routes.get('/incidents',CasoController.index);
routes.delete('/incidents/:id',CasoController.delete);


routes.get('/perfil',PerfilController.index);


routes.post('/login',LoginController.create);

module.exports = routes;