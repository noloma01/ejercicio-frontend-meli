var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var itemsRouter = require('./routes/items');

var app = express();

app.locals.apiUrl = "https://api.mercadolibre.com/";
app.locals.authorName = "Manolo";
app.locals.authorLastName = "Fernandez";
app.locals.cantidadItems = 4;

app.listen(3000);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/items', itemsRouter);

module.exports = app;
