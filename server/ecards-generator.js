/* global Buffer */
/* eslint-disable no-console */
var Handlebars = require('handlebars'),
  fs = require('fs'),
  archiver = require('archiver');

module.exports = {
  compile: function (data) {
    'use strict';
    var dir,
      image64,
      bitmap,
      source,
      result,
      output,
      archive,
      templateDir,
      template;

    dir = 'C:/eCards/' + data.ecardName + '/';

    // Create folder if doesn't exists
    if (!fs.exists(dir)) {
      fs.mkdir(dir);
    }

    // Render base 64 image and write to folder
    if (data.imgBase64) {
      image64 = data.imgBase64.replace(/^data:image\/\w+;base64,/, '');
      bitmap = new Buffer(image64, 'base64');
      fs.writeFile(dir + data.img, bitmap, function (err) {
        console.log(err);
      });
    }

    // select folder language
    templateDir = './tmp-ecards/' + data.language + '/';

    // select corresponding template
    switch (data.template) {
      case 'one-destiny-fare':
        templateDir += '1-un-destino-una-tarifa.html';
        break;
      default:
        // return error
    }

    // compile template
    source = fs.readFileSync(templateDir, 'utf-8');
    template = Handlebars.compile(source);
    result = template(data);

    // write template to filesystem
    fs.writeFile(dir + 'eCard.html', result, function (err) {
      if (err) {
        return console.log(err);
      }

      return true;
    });

    // ZIP files
    // create a file to stream archive data to.
    output = fs.createWriteStream(dir + data.ecardName + '.zip');
    archive = archiver('zip', {
      zlib: { level: 3 } // Sets the compression level.
    });

    // listen for all archive data to be writte
    output.on('close', function () {
      console.log(archive.pointer() + ' total bytes');
      console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on('warning', function (err) {
      if (err.code === 'ENOENT') {
        // log warning
      } else {
        // throw error
        throw err;
      }
    });

    // good practice to catch this error explicitly
    archive.on('error', function (err) {
      throw err;
    });

    // pipe archive data to the file
    archive.pipe(output);

    // append a file from stream
    archive.append(fs.createReadStream(dir + 'eCard.html'), { name: 'eCard.html' });
    archive.append(fs.createReadStream(dir + data.img), { name: data.img });

    // finalize the archive (ie we are done appending files but streams have to finish yet)
    archive.finalize();
  }

  // unDestinoUnaTarifa: function(data) {
  //   'use strict';
  //   if(data.language === 'es') {
  //     var dir = 'C:/eCards/' + data.ecardName + '/';

  //     if (!fs.existsSync(dir)){
  //         fs.mkdirSync(dir);
  //     }

  //     if (data.imgBase64) {
  //       var image64 = data.imgBase64.replace(/^data:image\/\w+;base64,/, "");
  //       var bitmap = new Buffer(image64, 'base64');
  //       fs.writeFile(dir + data.img, bitmap, function(err) {
  //         console.log(err);
  //       });
  //     }

  //     var source = fs.readFileSync('./tmp-ecards/es/1-un-destino-una-tarifa.html', 'utf-8');
  //     var template = Handlebars.compile(source);
  //     var result = template(data);

  //     fs.writeFile(dir + 'eCard.html', result, function(err) {
  //       if(err) {
  //         return console.log(err);
  //       }
  //     });

  //     // create a file to stream archive data to.
  //     var output = fs.createWriteStream(dir + data.ecardName + '.zip');
  //     var archive = archiver('zip', {
  //         zlib: { level: 3 } // Sets the compression level.
  //     });

  //     // listen for all archive data to be writte
  //     output.on('close', function() {
  //       console.log(archive.pointer() + ' total bytes');
  //       console.log('archiver has been finalized and the output file descriptor has closed.');
  //     });

  //     // good practice to catch warnings (ie stat failures and other non-blocking errors)
  //     archive.on('warning', function(err) {
  //       if (err.code === 'ENOENT') {
  //           // log warning
  //       } else {
  //           // throw error
  //           throw err;
  //       }
  //     });

  //     // good practice to catch this error explicitly
  //     archive.on('error', function(err) {
  //       throw err;
  //     });

  //     // pipe archive data to the file
  //     archive.pipe(output);

  //     // append files from a sub-directory, putting its contents at the root of archive
  //     // archive.directory(dir, false);

  //     // append a file from stream
  //     var file1 = dir + 'eCard.html';
  //     archive.append(fs.createReadStream(file1), { name: 'eCard.html' });
  //     var file2 = dir + data.img;
  //     archive.append(fs.createReadStream(file1), { name: data.img });

  //     // finalize the archive (ie we are done appending files but streams have to finish yet)
  //     archive.finalize();
  //   }
  // },

  // claseEconómicaEjecutiva: function(){
  //   var source = fs.readFileSync('templates/esp/2-clase-económica-ejecutiva.html', 'utf-8');
  //   var template = Handlebars.compile(source);
  //   var titleTop = entities.normalizeXML('Yo soy un title'),
  //     utm = 'http://www.google.com',
  //     titleBanner = entities.normalizeXML('Viaja desde Colombia hacia Washington D.C.'),
  //     subtitleBanner = entities.normalizeXML('viaja vía Lima o Bogotá con tarifas pensadas para ti desde', "html");

  //   var data = {
  //     'titleTop': titleTop,
  //     'utm': utm,
  //     'titleBanner': titleBanner,
  //     'economyClass': [
  //       {
  //         currency: 'USD',
  //         price: '489'
  //       },
  //       {
  //         currency: 'CLP',
  //         price: '341.172'
  //       }
  //     ],
  //     'executiveClass': [
  //       {
  //         currency: 'USD',
  //         price: '489'
  //       },
  //       {
  //         currency: 'CL',
  //         price: '341.172'
  //       }
  //     ],
  //     'paragraphs': [
  //       {
  //         text: entities.normalizeXML('Promoción válida para comprar hasta el 30 de octubre de 2017. Impuestos y cargos incluídos.'),
  //         bold: false
  //       },
  //       {
  //         text: entities.normalizeXML('Compra hasta el 30 de octubre de 2017'),
  //         bold: true
  //       }
  //     ],
  //     'termAndCond': [
  //       entities.normalizeXML('Estas tarifas aplican exclusivamente para compras realizadas en Avianca.com; si deseas hacerlo a través de otros canales aplica un cargo adicional.'),
  //       entities.normalizeXML('Válido para compras en Costa Rica.'),
  //       entities.normalizeXML('Viaja entre el 19 de mayo y el 27 de noviembre de 2017.'),
  //       entities.normalizeXML('Las fechas de vuelo dependen del destino seleccionado.'),
  //       entities.normalizeXML('Las tarifas son ida y regreso, impuestos y cargos incluidos.'),
  //       entities.normalizeXML('Las promociones no son acumulables.'),
  //       entities.normalizeXML('Las tarifas promocionales descritas pueden ser combinadas con otras tarifas siempre y cuando se cumplan con todas las condiciones de la tarifa más restrictiva.'),
  //       entities.normalizeXML('Otro tipo de descuentos no aplican para esta promoción. Tarifas sujetas a cambios sin previo aviso. No aplica para fechas específicas.'),
  //       entities.normalizeXML('Tarifas sujetas a disponibilidad de cupo.'),
  //       entities.normalizeXML('Los valores son aproximados. Aplica descuento para niños.'),
  //       entities.normalizeXML('Aplica para vuelos operados por Avianca, TACA, y/o Lacsa.'),
  //       entities.normalizeXML('Compra en Avianca.com y conoce más términos y condiciones de viaje.'),
  //       entities.normalizeXML('Que belleza handlebars')
  //     ]
  //   };

  //   var result = template(data);

  //   fs.writeFile("eCard.html", result, function(err) {
  //       if(err) {
  //           return console.log(err);
  //       }
  //   });
  // }
}
