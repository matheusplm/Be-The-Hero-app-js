const express = require('express');

const cors = require('cors');

//importando as rotas criadas no arquivo routes.js
const routes = require('./routes');

const app = express();

//usando dependencias
app.use(express.json());
app.use(cors());
/*
se tu quiser expecificar QUAL O FRONT END que pode acessar a aplicação, basta expecificar no cors a url, ex
    app.use(cors(
        origin: 'http://soeu.com'
    ));
*/

//usando as rotas
app.use(routes);

app.listen(3333);