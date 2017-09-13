var templates = require('./lib/templates.js');

var tpl1 = templates['es-tarifa-unica'], // eslint-disable-line one-var
  resultHtml = tpl1();

console.log(resultHtml); // eslint-disable-line no-console
