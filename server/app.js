const express = require('express');
const open = require('open');
const path = require('path');
const ecardsGenerator = require('./ecards-generator');
const entities = require('special-entities');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, '../dist')));
app.use('/dist/css', express.static(path.join(__dirname, '../dist/css')));
app.use('/dist/js', express.static(path.join(__dirname, '../dist/js')));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res, next) {
  var fileName = 'index.html',
    options = {
      root: __dirname + '../dist/',
      dotfiles: 'allow',
      headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
      }
    };

  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});

app.post('/generate', function(req, res) {
    var data = { 
      'titleTop': entities.normalizeXML('Viaja a Colombia desde USD 549'),
      'utm': 'http://www.google.com',
      'img': 'http://images-aviancataca.com/mail/images/ecomm/far/avianca/avmail-bnr-T22-demo.jpg',
      'titleBanner':  [
        entities.normalizeXML('Viaja a Colombia'),
        entities.normalizeXML('desde Buenos Aires')
      ],
      'subtitleBanner': [
        entities.normalizeXML('viaja vía Lima o Bogotá'),
        entities.normalizeXML('con tarifas pensadas para ti desde')
      ],
      'titlePrice': [
        {
          currency: 'USD',
          price: '549'
        },
        {
          currency: 'ARS',
          price: '8.400'
        }
      ],
      'paragraphs': [
        {
          text: entities.normalizeXML('Promoción válida para comprar hasta el 30 de octubre de 2017. Impuestos y cargos incluídos.'),
          bold: false
        },
        {
          text: entities.normalizeXML('Compra hasta el 30 de octubre de 2017'),
          bold: true
        }
      ],
      'termAndCond': [
        entities.normalizeXML('Estas tarifas aplican exclusivamente para compras realizadas en Avianca.com; si deseas hacerlo a través de otros canales aplica un cargo adicional.'),
        entities.normalizeXML('Válido para compras en Costa Rica.'),
        entities.normalizeXML('Viaja entre el 19 de mayo y el 27 de noviembre de 2017.'),
        entities.normalizeXML('Las fechas de vuelo dependen del destino seleccionado.'),
        entities.normalizeXML('Las tarifas son ida y regreso, impuestos y cargos incluidos.'),
        entities.normalizeXML('Las promociones no son acumulables.'),
        entities.normalizeXML('Las tarifas promocionales descritas pueden ser combinadas con otras tarifas siempre y cuando se cumplan con todas las condiciones de la tarifa más restrictiva.'),
        entities.normalizeXML('Otro tipo de descuentos no aplican para esta promoción. Tarifas sujetas a cambios sin previo aviso. No aplica para fechas específicas.'),
        entities.normalizeXML('Tarifas sujetas a disponibilidad de cupo.'),
        entities.normalizeXML('Los valores son aproximados. Aplica descuento para niños.'),
        entities.normalizeXML('Aplica para vuelos operados por Avianca, TACA, y/o Lacsa.'),
        entities.normalizeXML('Compra en Avianca.com y conoce más términos y condiciones de viaje.'),
        entities.normalizeXML('Que belleza handlebars')
      ]
    };
    ecardsGenerator.unDestinoUnaTarifa(data,'es');
});

app.listen(port, function (err) {
  if (err) {
      console.log(err);
    } else {
      ecardsGenerator.unDestinoUnaTarifa();
      console.log('Example app listening on port ' + port + '!');
      open('http://localhost:' + port);
    }
});
