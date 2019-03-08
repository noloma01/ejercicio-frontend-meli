const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const itemsRouter = require('./routes/items');

let app = express();

let environment = process.env.NODE_ENV;

app.locals.apiUrl = "https://api.mercadolibre.com/";
app.locals.authorName = "Manolo";
app.locals.authorLastName = "Fernandez";
app.locals.cantidadItems = 4;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

if (environment === 'develop') {
    app.use(cors());
}
app.use(express.static(path.join(__dirname, '../', '/cliente', '/dist', '/cliente')));
app.listen(3000);

app.use('/api/items', itemsRouter);

module.exports = app;
