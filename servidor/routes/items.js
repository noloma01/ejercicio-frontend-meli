var express = require('express');
var router = express.Router();

var request = require('request');
var rp = require('request-promise');

/* GET lista items. */
router.get('/', function (req, res) {
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
                items: obtenerListaItems(result.results, req.query.cantidad || res.app.locals.cantidadItems)
            };

            res.send(responseBody)
        });
    }
});

/* GET item por id. */
router.get('/:id', function (req, res) {

    let url = req.app.locals.apiUrl + 'items/' + req.params.id;

    rp(url).then(result => {
        rp(url + "/description").then(description => {
            let item = obtenerItem(JSON.parse(result));
            item.description = JSON.parse(description).plain_text;
            let responseBody = {
                author: {name: res.app.locals.authorName, lastname: res.app.locals.authorLastName},
                item: item
            };
            res.set('Content-Type', 'application/json');
            res.send(responseBody);
        })
    });
});

function obtenerCategorias(filtros, idFiltro) {
    let resultado = [];
    let categorias = filtros.find(x => x.id === idFiltro);
    categorias.values[0].path_from_root.forEach(x => {
        resultado.push(x.name);
    });

    return resultado;
}

function obtenerListaItems(resultados, cantidad) {
    let items = [];

    for (let i = 0; i < cantidad; i++) {
        let item = armarItem(resultados[i]);
        item.state = address.state_name;
        items.push(item);
        if (items.length === cantidad) {
            break;
        }
    }
    return items;
}

function obtenerItem(resultado) {
    let item = armarItem(resultado);
    item.sold_quantity = resultado.sold_quantity;

    return item;
}

function armarItem(resultado) {
    console.log("shipping -> ", resultado);
    return {
        id: resultado.id,
        title: resultado.title,
        price: {
            currency: resultado.currency_id,
            amount: resultado.price,
            decimals: 2
        },
        picture: resultado.thumbnail,
        condition: resultado.condition,
        free_shipping: resultado.shipping.free_shipping
    };
}

module.exports = router;
