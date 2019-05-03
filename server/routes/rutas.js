const express = require('express');
const app = express();
//requerir el archivo que se llamará
app.use(require("./vistas"));

app.use(require('./crear'));

app.use(require('./index'));

app.use(require('./users'));

//app.use(require('./editor'))

app.use(require('./carpetas'));

app.use(require('./archivos'));

app.use(require("./proyectos"));
module.exports = app;
