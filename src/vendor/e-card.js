/* globals window, document, $, _, he */
/* eslint-disable no-console */
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
    addRow: function (template, $container, maxRows) {
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
      $container.append(template({ value: itemIndex }));

      count = $container.children('.row').not('.hidden').length;

      if (count >= maxRows) {
        $container.find('.add-item').addClass('hidden');
      }
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
        $container.find('.add-item').removeClass('hidden');
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
        parag = [],
        parags = [],
        strong;

      strong = checkboxes.map(function () {
        return { value: this.checked ? '1' : '' };
      });

      serialized = $(dataForm).filter(function (index, item) {
        return item.value !== '';
      });

      // Go through elements and group according type (array, complex array)
      $(serialized).each(function (index, el) {
        if (el.name !== 'ecardName') {
          el.value = he.encode(el.value);
        }

        if (el.name === 'titlePrice') {
          price.push(el);
          return true;
        }

        if (el.name === 'paragraphs') {
          if (el.value !== 'on') {
            parag.push(el);
          }
          return true;
        }

        if (el.name === 'titleBanner' ||
          el.name === 'subtitleBanner' ||
          el.name === 'termAndCond') {
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

      // Creates paragrhaps object in correct format
      _.each(parag, function (el, index) {
        parags.push({ text: el.value, bold: strong[index].value });
      });

      // Check if image exist and pass to object
      if (img.files[0]) {
        objTest.img = img.files[0].name;
        objTest.imgBase64 = this.img64;
      }

      objTest.titlePrice = prices;
      objTest.paragraphs = parags;
      objTest.template = form.data('template');

      console.log(objTest.template);

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
