var express = require('express');
var router = express.Router();

var request = require('request');

/* GET lista items. */
router.get('/', function (req, res, next) {
    let parametro = req.query.q;

    if (!parametro || parametro === '') {
        res.set('Content-Type', 'application/json');
        res.send("El parámetro de búsqueda es requerido.");
    }
    else {
        let url = req.app.locals.apiUrl + 'sites/MLA/search?q=' + parametro;

        request(url, function (error, response, body) {
            res.set('Content-Type', 'application/json');
            console.log("URL " + url);

            const result = JSON.parse(body);

            let responseBody = {
                author: {name: res.app.locals.authorName, lastname: res.app.locals.authorLastName},
                categories: obtenerCategorias(result.filters, "category"),
                items: obtenerItems(result.results, req.query.cantidad || res.app.locals.cantidadItems)
            };

            res.send(responseBody)
        });
    }
});

function obtenerCategorias(filtros, idFiltro) {
    let resultado = [];
    let categorias = filtros.find(x => x.id === idFiltro);
    categorias.values[0].path_from_root.forEach(x => {
        resultado.push(x.name);
    });

    return resultado;
}

function obtenerItems(resultados, cantidad) {

    let items = [];

    for (let i = 0; i < cantidad; i++) {
        let objeto = {
            id: resultados[i].id,
            title: resultados[i].title,
            price: {
                currency: resultados[i].currency_id,
                amount: resultados[i].price,
                decimals: 2
            },
            picture: resultados[i].thumbnail,
            condition: resultados[i].condition,
            free_shipping: resultados[i].shipping.free_shipping
        };
        items.push(objeto);
        if (items.length === cantidad) {
            break;
        }
    }
    return items;
}

module.exports = router;
