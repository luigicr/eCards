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
