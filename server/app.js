const express = require('express');
const open = require('open');
const path = require('path');
const ecardsGenerator = require('./ecards-generator');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();
var entities = require('special-entities');

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
  // AVIPD-1381 ES waiting for UTM
  // var data = {
  //     'titleTop': entities.normalizeXML('Vuela desde São Paulo, Río de Janeiro o Porto Alegre'),
  //     'utm': 'http://www.avianca.com/br/es/promociones/experiencias-en-destino.html?reqfromappmobile=true&utm_source=commercial&utm_medium=email&utm_campaign=br_por_email_com_1710-volemosjuntos_all_all_prc_sp',
  //     'img': '170929_PRICING_BR_GLOBAL_ecard_345x300.jpg',
  //     'titleBanner':  [
  //       entities.normalizeXML('Un mundo de emociones'),
  //       entities.normalizeXML('espera por ti')
  //     ],
  //     'subtitleBanner': [
  //       // entities.normalizeXML('Desde')
  //     ],
  //     'titlePrice': [
  //       // {
  //       //   currency: 'USD',
  //       //   price: '206'
  //       // }
  //     ],
  //     'titlePromo': [
  //       // entities.normalizeXML('Viaja a Surámerica con las mejores tarifas'),
  //     ],
  //     'paragraphsTop': [
  //       // {
  //       //   text: entities.normalizeXML('Aprovecha nuestras mejores tarifas para viajar a las siguientes ciudades de Surámerica'),
  //       //   bold: false
  //       // }
  //     ],
  //     'paragraphsBottom': [
  //       {
  //         text: entities.normalizeXML('Ida y regreso – Directo o vía Lima  - Incluye impuestos o tasas'),
  //         bold: false
  //       },
  //       {
  //         text: entities.normalizeXML('Compra del 15 al 21 de agosto de 2017'),
  //         bold: true
  //       }
  //     ],

  //     'cities': [
  //       [
  //         {
  //           text: entities.normalizeXML('Vuela a Perú'),
  //           subtext: entities.normalizeXML('desde'),
  //           national: false,
  //           prices: [
  //             {
  //               currency: 'USD',
  //               price: '299'
  //             },
  //             {
  //               currency: 'BRL',
  //               price: '955'
  //             }
  //           ]
  //         },
  //         {
  //           text: entities.normalizeXML('Vuela a Bogotá'),
  //           subtext: entities.normalizeXML('desde'),
  //           national: false,
  //           prices: [
  //             {
  //               currency: 'USD',
  //               price: '379'
  //             },
  //             {
  //               currency: 'BRL',
  //               price: '1.210'
  //             }
  //           ]
  //         }
  //       ]
  //       // [
  //       //   {
  //       //     text: entities.normalizeXML('Sao Paulo o Rio de Janeiro'),
  //       //     subtext: entities.normalizeXML('Desde'),
  //       //     national: true,
  //       //     prices: [
  //       //       {
  //       //         currency: 'USD',
  //       //         price: '206'
  //       //       },
  //       //       {
  //       //         currency: 'CLP',
  //       //         price: '173,174'
  //       //       }
  //       //     ]
  //       //   },
  //       //   {
  //       //     text: entities.normalizeXML('Cartagena, Santa Marta o Barranquilla'),
  //       //     subtext: entities.normalizeXML('Desde'),
  //       //     national: false,
  //       //     prices: [
  //       //       {
  //       //         currency: 'USD',
  //       //         price: '206'
  //       //       }
  //       //     ]
  //       //   }
  //       // ]
  //     ],
  //     'termAndCond': [
  //       entities.normalizeXML('Estas tarifas aplican exclusivamente para compras realizadas en Avianca.com, si realizas tus compras a través de otros canales, las tarifas pueden variar ligeramente.'),
  //       entities.normalizeXML('Promoción válida para compras en Brasil.'),
  //       entities.normalizeXML('Las tarifas mencionadas son ida y regreso, incluyen impuestos o tasas.'),
  //       entities.normalizeXML('Tipo de vuelo: Directo o vía Lima.'),
  //       entities.normalizeXML('Última fecha de regreso: 15 de diciembre de 2017.'),
  //       entities.normalizeXML('Los destinos en Perú son: Arequipa, Cusco, Iquitos, Juliaca, Lima, Puerto Maldonado, Piura y Trujillo.'),
  //       entities.normalizeXML('Si viajas hacia Perú, la tarifa final aplica llegando a Lima, el precio puede variar ligeramente hacia otros puntos al interior de Perú.'),
  //       entities.normalizeXML('No aplica para vuelos de código compartido con otras aerolíneas.'),
  //       entities.normalizeXML('Las promociones no son acumulables.'),
  //       entities.normalizeXML('Otro tipo de descuentos no aplican para esta promoción.'),
  //       entities.normalizeXML('Los valores son aproximados debido a la variación cambiaria.'),
  //       entities.normalizeXML('Tarifas sujetas a cambios sin previo aviso.'),
  //       entities.normalizeXML('Aplica descuento para niños.'),
  //       entities.normalizeXML('Vuelos operados por Avianca, TACA o Lacsa.'),
  //       entities.normalizeXML('Consulta otras condiciones y restricciones en Avianca.com. ')
  //     ]
  //   };
  // ecardsGenerator.evenDestinations(data, 'es');
  // PT
  // var data = {
  //     'titleTop': entities.normalizeXML('Voe de São Paulo, Rio de Janeiro ou Porto Alegre'),
  //     'utm': 'http://www.avianca.com/br/pt/promocoes/experiencias-em-destino?reqfromappmobile=true&utm_source=commercial&utm_medium=email&utm_campaign=br_por_email_com_1710-volemosjuntos_all_all_prc_sp',
  //     'img': '170929_PRICING_BR_GLOBAL_ecard_345x300.jpg',
  //     'titleBanner':  [
  //       entities.normalizeXML('Um mundo de emoções'),
  //       entities.normalizeXML('espera por você')
  //     ],
  //     'subtitleBanner': [
  //       // entities.normalizeXML('Desde')
  //     ],
  //     'titlePrice': [
  //       // {
  //       //   currency: 'USD',
  //       //   price: '206'
  //       // }
  //     ],
  //     'titlePromo': [
  //       // entities.normalizeXML('Viaja a Surámerica con las mejores tarifas'),
  //     ],
  //     'paragraphsTop': [
  //       // {
  //       //   text: entities.normalizeXML('Aprovecha nuestras mejores tarifas para viajar a las siguientes ciudades de Surámerica'),
  //       //   bold: false
  //       // }
  //     ],
  //     'paragraphsBottom': [
  //       {
  //         text: entities.normalizeXML('Ida e volta – Direto ou Via Lima - Impostos e taxas incluídos'),
  //         bold: false
  //       },
  //       {
  //         text: entities.normalizeXML('Compre de 15 a 21 de agosto de 2017'),
  //         bold: true
  //       }
  //     ],

  //     'cities': [
  //       [
  //         {
  //           text: entities.normalizeXML('Voe para a Perú'),
  //           subtext: entities.normalizeXML('a partir de'),
  //           national: false,
  //           prices: [
  //             {
  //               currency: 'USD',
  //               price: '299'
  //             },
  //             {
  //               currency: 'BRL',
  //               price: '955'
  //             }
  //           ]
  //         },
  //         {
  //           text: entities.normalizeXML('Voe para a Bogotá'),
  //           subtext: entities.normalizeXML('a partir de'),
  //           national: false,
  //           prices: [
  //             {
  //               currency: 'USD',
  //               price: '379'
  //             },
  //             {
  //               currency: 'BRL',
  //               price: '1.210'
  //             }
  //           ]
  //         }
  //       ]
  //       // [
  //       //   {
  //       //     text: entities.normalizeXML('Sao Paulo o Rio de Janeiro'),
  //       //     subtext: entities.normalizeXML('Desde'),
  //       //     national: true,
  //       //     prices: [
  //       //       {
  //       //         currency: 'USD',
  //       //         price: '206'
  //       //       },
  //       //       {
  //       //         currency: 'CLP',
  //       //         price: '173,174'
  //       //       }
  //       //     ]
  //       //   },
  //       //   {
  //       //     text: entities.normalizeXML('Cartagena, Santa Marta o Barranquilla'),
  //       //     subtext: entities.normalizeXML('Desde'),
  //       //     national: false,
  //       //     prices: [
  //       //       {
  //       //         currency: 'USD',
  //       //         price: '206'
  //       //       }
  //       //     ]
  //       //   }
  //       // ]
  //     ],
  //     'termAndCond': [
  //       entities.normalizeXML('As tarifas aplicam exclusivamente para compras realizadas no site Avianca.com, se você comprar através de outros canais, as tarifas podem variar um pouco.'),
  //       entities.normalizeXML('Promoção válida para compras no Brasil.'),
  //       entities.normalizeXML('As tarifas mencionadas são para ida e volta. Impostos e taxas aeroportuárias incluídas.'),
  //       entities.normalizeXML('Tipo de voo: Direto, via Lima ou Bogota.'),
  //       entities.normalizeXML('Última data de volta: 15 de dezembro de 2017.'),
  //       entities.normalizeXML('Os destinos no Peru são: Arequipa, Cusco, Iquitos, Juliaca, Lima, Puerto Maldonado, Piura y Trujillo.'),
  //       entities.normalizeXML('Se viajar para o Peru, a tarifa final aplica chegando a Lima, o preço pode variar um pouco para outros pontos dentro do Peru.'),
  //       entities.normalizeXML('Não aplica para voos de código compartilhado com outras linhas aéreas.'),
  //       entities.normalizeXML('As promoções não são acumuláveis.'),
  //       entities.normalizeXML('Não aplicam outros tipos de desconto para a promoção.'),
  //       entities.normalizeXML('Os valores são aproximados por contada da variação cambial.'),
  //       entities.normalizeXML('Tarifas sujeitas a mudanças sem aviso prévio.'),
  //       entities.normalizeXML('Aplica desconto para crianças de até 11 anos.'),
  //       entities.normalizeXML('Voos operados por Avianca, TACA ou Lacsa.'),
  //       entities.normalizeXML('Consulte outras condições e restrições no site Avianca.com')
  //     ]
  //   };
  // ecardsGenerator.evenDestinations(data, 'pt');

  console.log(req.body);
  ecardsGenerator.compile(req.body);
  res.status(200).json({success: "Updated Successfully", status : 200});
  // res.send({result:"success"});
  // res.status(200).jsonp({ success: 'success' });
});

app.listen(port, function (err) {
  if (err) {
      console.log(err);
    } else {
      console.log('Example app listening on port ' + port + '!');
      open('http://localhost:' + port);
    }
});
