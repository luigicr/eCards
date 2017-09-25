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
  console.log(req.body);
  console.log(req.body.titlePrice);

  for (var i = req.body.titlePrice.length - 1; i >= 0; i--) {
    console.log(req.body.titlePrice[i].currency);
  };

  console.log(req.body.titlePrice[0]);

    var data = {
      'titleTop': 'entities.normalizeXML(req.body.titleTop)',
      'utm': 'req.body.utm',
      'img': 'http://images-aviancataca.com/mail/images/ecomm/far/avianca/avmail-bnr-T22-demo.jpg',
      'titleBanner':  [
        'entities.normalizeXML(req.body.titleBanner)',
        'entities.normalizeXML(req.body.titleBanner1)'
      ],
      'subtitleBanner': [
        'entities.normalizeXML(req.body.subtitleBanner)',
        'entities.normalizeXML(req.body.subtitleBanner1)'
      ],
      'titlePrice': [
        {
          currency: 'USD',
          price: 'req.body.price'
        },
        {
          currency: 'ARS',
          price: 'req.body.price1'
        }
      ],
      'paragraphs': [
        {
          text: 'entities.normalizeXML(req.body.text)',
          bold: false
        },
        {
          text: 'entities.normalizeXML(req.body.text1)',
          bold: true
        }
      ]
    };
    ecardsGenerator.unDestinoUnaTarifa(req.body);
    res.end();
});

app.listen(port, function (err) {
  if (err) {
      console.log(err);
    } else {
      console.log('Example app listening on port ' + port + '!');
      open('http://localhost:' + port);
    }
});
