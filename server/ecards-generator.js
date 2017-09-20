var Handlebars = require('handlebars');
var fs = require('fs');
var entities = require('special-entities');

module.exports = {
	unDestinoUnaTarifa: function(data, lang) {
		if(lang === 'es'){
			var source = fs.readFileSync('../tmp-ecards/es/1-un-destino-una-tarifa.html', 'utf-8');
			var template = Handlebars.compile(source);
			var result = template(data);

			fs.writeFile("eCard.html", result, function(err) {
			    if(err) {
			        return console.log(err);
			    }
			});
		}
	},

	claseEconómicaEjecutiva: function(){
		var source = fs.readFileSync('templates/esp/2-clase-económica-ejecutiva.html', 'utf-8');
		var template = Handlebars.compile(source);
		var titleTop = entities.normalizeXML('Yo soy un title'),
			utm = 'http://www.google.com',
			titleBanner = entities.normalizeXML('Viaja desde Colombia hacia Washington D.C.'),
			subtitleBanner = entities.normalizeXML('viaja vía Lima o Bogotá con tarifas pensadas para ti desde', "html");

		var data = { 
			'titleTop': titleTop,
			'utm': utm,
			'titleBanner': titleBanner,
			'economyClass': [
				{
					currency: 'USD',
					price: '489'
				},
				{
					currency: 'CLP',
					price: '341.172'
				}
			],
			'executiveClass': [
				{
					currency: 'USD',
					price: '489'
				},
				{
					currency: 'CL',
					price: '341.172'
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

		var result = template(data);

		fs.writeFile("eCard.html", result, function(err) {
		    if(err) {
		        return console.log(err);
		    }
		});
	}
}