/* globals window, document, $, _, he */
/* eslint-disable no-console */
/* eslint complexity: ["error", 30] */
(function (root) {
  'use strict';
  var test,
    reader,
    img64;

  root.eCard = {
    test: test,
    reader: reader,
    img64: img64,

    init: function () {
      return;
    },

    // Add a template row for the compose elements
    // @template: the html template
    // @container: where the template goes
    // @maxRows: maximun number of rows allowed
    addRow: function (template, $container, maxRows, customName) {
      var count,
        itemIndex = 0,
        itemArray;

      itemArray = $container.children('.row').map(function () {
        return [$(this).data('item')];
      }).get();

      // Looks for an available index
      $.each($container.children('.row'), function __loopRows__() {
        if ($.inArray(itemIndex, itemArray) === -1) {
          return;
        }
        itemIndex++;
      });

      // tmpl = _.template(templateHeadline);
      $container.append(template({ value: itemIndex, name: customName }));

      count = $container.children('.row').not('.hidden').length;

      if (count >= maxRows) {
        if ($container.find('.add-item').length) {
          $container.find('.add-item').addClass('hidden');
        } else {
          $container.find('.add-city-price').addClass('hidden');
        }
      }

      return count;
    },

    // Remove a template row for the compose elements
    // @elem: the element to remove
    // @container: where the element be removed
    removeRow: function (elem, $container, maxRows) {
      var $row = $(elem).closest('.row'),
        count;

      $row.remove();
      count = $container.children('.row').not('.hidden').length;

      if (count < maxRows) {
        if ($container.find('.add-item').length) {
          $container.find('.add-item').removeClass('hidden');
        } else {
          $container.find('.add-city-price').removeClass('hidden');
        }
      }
    },

    // Serialize form elements into correct format for post endpoint
    // @form: the container form
    // @checkboxes: checkboxes from form (serializeArray ignore non checked)
    // @img: image element (serializeArray ignore input type file)
    serializeAll: function (form, checkboxes, img) {
      var dataForm = $(form).serializeArray(),
        serialized,
        objTest = {},
        price = [],
        prices = [],
        priceCity = [],
        priceCity1 = [],
        priceCity2 = [],
        priceCity3 = [],
        priceCity4 = [],
        priceCities0 = [],
        priceCities1 = [],
        priceCities2 = [],
        priceCities3 = [],
        priceCities4 = [],
        priceCities = [],
        parag = [],
        parags = [],
        paragTop = [],
        paragsTop = [],
        paragBottom = [],
        paragsBottom = [],
        paragCities = [],
        paragsCities = [],
        strong,
        strongTop,
        strongCities,
        strongBottom,
        economy = [],
        economys = [],
        executive = [],
        executives = [];

      strong = checkboxes.map(function () {
        return { value: this.checked ? '1' : '', name: this.name };
      });

      strongTop = strong.filter(function (index, item) {
        return item.name === 'paragraphsTop';
      });

      strongCities = strong.filter(function (index, item) {
        return item.name === 'cities';
      });

      strongBottom = strong.filter(function (index, item) {
        return item.name === 'paragraphsBottom';
      });

      strong = strong.filter(function (index, item) {
        return item.name === 'paragraphs';
      });

      serialized = $(dataForm).filter(function (index, item) {
        return item.value !== '';
      });

      // Go through elements and group according type (array, complex array)
      // @TODO optimize due complexity
      $(serialized).each(function (index, el) {
        if (el.name !== 'ecardName' || el.name === 'utm') {
          el.value = he.encode(el.value);
        }

        if (el.name === 'titlePrice') {
          price.push(el);
          return true;
        }

        if (el.name === 'citiesPrice') {
          priceCity.push(el);
          return true;
        }

        if (el.name === 'citiesPrice1') {
          priceCity1.push(el);
          return true;
        }

        if (el.name === 'citiesPrice2') {
          priceCity2.push(el);
          return true;
        }

        if (el.name === 'citiesPrice3') {
          priceCity3.push(el);
          return true;
        }

        if (el.name === 'citiesPrice4') {
          priceCity4.push(el);
          return true;
        }

        if (el.name === 'economyClass') {
          economy.push(el);
          return true;
        }

        if (el.name === 'executiveClass') {
          executive.push(el);
          return true;
        }

        if (el.name === 'paragraphs') {
          if (el.value !== 'on') {
            parag.push(el);
          }
          return true;
        }

        if (el.name === 'paragraphsTop') {
          if (el.value !== 'on') {
            paragTop.push(el);
          }
          return true;
        }

        if (el.name === 'paragraphsBottom') {
          if (el.value !== 'on') {
            paragBottom.push(el);
          }
          return true;
        }

        if (el.name === 'cities') {
          if (el.value !== 'on') {
            paragCities.push(el);
          }
          return true;
        }

        if (el.name === 'titleBanner' ||
          el.name === 'subtitleBanner' ||
          el.name === 'termAndCond' ||
          el.name === 'titlePromo') {
          if (!objTest[el.name]) {

            objTest[el.name] = [];
          }

          objTest[el.name].push(el.value);
        } else {
          objTest[el.name] = el.value;
        }

        return true;
      });

      // Creates price object in correct format
      price = _.groupBy(price, function (val, index) {
        return Math.floor(index / 2);
      });

      _.each(price, function (el) {
        prices.push({ currency: el[0].value, price: el[1].value });
      });

      // Creates price object in correct format
      priceCity = _.groupBy(priceCity, function (val, index) {
        return Math.floor(index / 2);
      });

      _.each(priceCity, function (el) {
        priceCities0.push({ currency: el[0].value, price: el[1].value });
      });

      // Creates price object in correct format
      priceCity1 = _.groupBy(priceCity1, function (val, index) {
        return Math.floor(index / 2);
      });

      _.each(priceCity1, function (el) {
        priceCities1.push({ currency: el[0].value, price: el[1].value });
      });

      // Creates price object in correct format
      priceCity2 = _.groupBy(priceCity2, function (val, index) {
        return Math.floor(index / 2);
      });

      _.each(priceCity2, function (el) {
        priceCities2.push({ currency: el[0].value, price: el[1].value });
      });

      // Creates price object in correct format
      priceCity3 = _.groupBy(priceCity3, function (val, index) {
        return Math.floor(index / 2);
      });

      _.each(priceCity3, function (el) {
        priceCities3.push({ currency: el[0].value, price: el[1].value });
      });

      // Creates price object in correct format
      priceCity4 = _.groupBy(priceCity4, function (val, index) {
        return Math.floor(index / 2);
      });

      _.each(priceCity4, function (el) {
        priceCities4.push({ currency: el[0].value, price: el[1].value });
      });

      priceCities.push(priceCities0);
      priceCities.push(priceCities1);
      priceCities.push(priceCities2);
      priceCities.push(priceCities3);
      priceCities.push(priceCities4);

      // Creates economy price object in correct format
      economy = _.groupBy(economy, function (val, index) {
        return Math.floor(index / 2);
      });

      _.each(economy, function (el) {
        economys.push({ currency: el[0].value, price: el[1].value });
      });

      // Creates executive price object in correct format
      executive = _.groupBy(executive, function (val, index) {
        return Math.floor(index / 2);
      });

      _.each(executive, function (el) {
        executives.push({ currency: el[0].value, price: el[1].value });
      });

      // Creates paragrhaps object in correct format
      _.each(parag, function (el, index) {
        parags.push({ text: el.value, bold: strong[index].value });
      });

      // Creates paragrhaps object in correct format
      _.each(paragTop, function (el, index) {
        paragsTop.push({ text: el.value, bold: strongTop[index].value });
      });

      // Creates paragrhaps object in correct format
      _.each(paragBottom, function (el, index) {
        paragsBottom.push({ text: el.value, bold: strongBottom[index].value });
      });

      // Creates paragrhaps object in correct format
      _.each(paragCities, function (el, index) {
        paragsCities.push({ text: el.value, national: strongCities[index].value });
      });


      // Check if image exist and pass to object
      if (img.files[0]) {
        objTest.img = img.files[0].name;
        objTest.imgBase64 = this.img64;
      }

      objTest.titlePrice = prices;
      objTest.economyClass = economys;
      objTest.executiveClass = executives;
      objTest.paragraphs = parags;
      objTest.paragraphsTop = paragsTop;
      objTest.paragraphsBottom = paragsBottom;
      objTest.cities = paragsCities;

      _.each(objTest.cities, function (el, index) {
        el.prices = priceCities[index];
      });

      objTest.template = form.data('template');

      console.log(objTest);

      return objTest;
    },

    // Transform image from input to base64 image
    // @input: the image input container
    imgTo64: function (input) {
      var that = this;

      if (input.files && input.files[0]) {
        reader = new FileReader();

        reader.onload = function (e) {
          that.img64 = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
      }
    }
  };
}(window));
