/* global Buffer */
/* eslint-disable no-console */
var Handlebars = require('handlebars'),
  fs = require('fs'),
  archiver = require('archiver');

Handlebars.registerHelper('two_prices', function(obj, options) {
    if( obj.length == 2) {
        return options.fn(this);
    } else {
      return options.inverse(this);
    }
});

Handlebars.registerHelper('exist_top_text', function(title, text, options) {
    if((title != "" && title != null  && typeof title != "undefined") ||
    (text != "" && text != null  && typeof text != "undefined")) {
        return options.fn(this);
    } else {
      return options.inverse(this);
    }
});

Handlebars.registerHelper('exist_var', function(value, options) {
    if(value != "" && value != null  && typeof value != "undefined"){
        return options.fn(this);
    } else {
      return options.inverse(this);
    }
});

function generateEcard(data, source){
  var template = Handlebars.compile(source);
  var result = template(data);

  fs.writeFile("eCard.html", result, function(err) {
      if(err) {
          return console.log(err);
      }
  });
}

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

    dir = 'C:/eCards/';

    // Create folder if doesn't exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    dir += data.ecardName + '/';
    // Create folder if doesn't exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
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
      case 'economic-or-executive':
        templateDir += '2-clase-económica-ejecutiva.html'
        break;
      case 'even-one-more':
        templateDir += '3-destinos-impares-una-o-más-tarifas.html'
        break;
      case 'odd-one-more':
        templateDir += '4-destinos-pares-una-o-más-tarifas.html'
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
    if (data.img) {
      archive.append(fs.createReadStream(dir + data.img), { name: data.img });
    }

    // finalize the archive (ie we are done appending files but streams have to finish yet)
    archive.finalize();
  },

  evenDestinations: function(data, lang){
    var source;
    switch(lang){
      case 'en':
        source = fs.readFileSync('./tmp-ecards/en/4-destinos-pares-una-o-más-tarifasEng.html', 'utf-8');
        break;
      case 'pt':
        source = fs.readFileSync('./tmp-ecards/pt/4-destinos-pares-una-o-más-tarifasPor.html', 'utf-8');
        break;
      default:
        source = fs.readFileSync('./tmp-ecards/es/4-destinos-pares-una-o-más-tarifas.html', 'utf-8');
        break;
    }
    generateEcard(data, source);
  }
}
