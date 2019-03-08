const express = require('express');
const router = express.Router();

const request = require('request');
const rp = require('request-promise');

/* GET lista items. */
router.get('/', validarParametro, obtenerListaRespuestas);

/* GET item por id. */
router.get('/:id', obtenerItemRespuesta);


function validarParametro(req, res, next) {
    if (!req.query.q || req.query.q === '') {
        res.json("El parámetro de búsqueda es requerido.");
    }
    else {
        next();
    }
}

function obtenerListaRespuestas(req, res) {
    try {
        let parametro = req.query.q;
        let url = `${req.app.locals.apiUrl}sites/MLA/search?q=${parametro}`;

        request(url, function (error, response, body) {

            const result = JSON.parse(body);

            let responseBody = [{
                author: {name: res.app.locals.authorName, lastname: res.app.locals.authorLastName},
                categories: obtenerCategorias(result.filters, "category"),
                items: obtenerListaItems(result.results, req.query.cantidad || res.app.locals.cantidadItems)
            }];

            res.json(responseBody, 200)
        });
    }
    catch (e) {
        res.json("Se produjo un error: " + e, 500);
    }
}

function obtenerItemRespuesta(req, res) {

    try {
        let url = req.app.locals.apiUrl + 'items/' + req.params.id;

        rp(url).then(result => {
            rp(url + "/description").then(description => {
                let item = obtenerItem(JSON.parse(result));
                item.description = JSON.parse(description).plain_text;
                let responseBody = [{
                    author: {name: res.app.locals.authorName, lastname: res.app.locals.authorLastName},
                    item: item
                }];
                res.json(responseBody, 200);
            })
        });
    }
    catch (e) {
        res.json("Se produjo un error: " + e, 500);
    }
}

function obtenerCategorias(filtros, idFiltro) {
    let resultado = [];
    let categorias = filtros.find(x => x.id === idFiltro);
    if (categorias) {
        categorias.values[0].path_from_root.forEach(x => {
            resultado.push(x.name);
        });
    }

    return resultado;
}

function obtenerListaItems(resultados, cantidad) {
    resultados = resultados.slice(0, cantidad);

    return resultados.map(x => {
        let item = armarItem(x);
        item.state = x.address.state_name;
        return item;
    });
}

function obtenerItem(resultado) {
    let item = armarItem(resultado);
    item.sold_quantity = resultado.sold_quantity;

    return item;
}

function armarItem(resultado) {
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
