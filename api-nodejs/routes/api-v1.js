var express = require('express');
var cidades = require('../models/cidades');
const https = require('https');

var router = express.Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access_token, x-id_token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*CIDADES*/
router.get('/cidades', validaToken, cidades.get);
router.get('/cidades/:id', validaToken, cidades.getById);
router.post('/cidades', validaToken, cidades.post);
router.put('/cidades/:id', validaToken, cidades.put);
router.delete('/cidades/:id', validaToken, cidades.delete);

function validaToken(req, res, next) {
	next();
    try {
        var clientId = '281275352003-nrbluthgjnach2lom1u15pct6qj0lgn0.apps.googleusercontent.com';

        var access_token = req.headers['x-access_token'];
        //var id_token = req.headers['x-id_token'];
        //console.log(id_token);

        https.get('https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=' + access_token, (res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);

            res.on('data', (d) => {
                process.stdout.write(d);
                next();
            });

        }).on('error', (e) => {
            console.error(e);
        });

    }
    catch (err) {
        console.log("Erro geral:" + err);
    }

}


module.exports = router;