/* globals window, document, $, _ */
/* eslint-disable no-console */
(function (root) {
  'use strict';
  var test,
    reader;

  root.eCard = {
    test: test,
    reader: reader,
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

    serializeAll: function (data) {
      var serialized = [],
        price = [];



      $(data).each(function (index, item) {
        if (item.name !== 'titlePrice') {
          serialized.push(item);
        } else {
          price.push(item);
        }
      });

      price = _.groupBy(price, function (val, index) {
        return Math.floor(index / 2);
      });

      _.each(price, function (el) {
        serialized.push({ name: 'titlePrice', value: { currency: el[0].value, price: el[1].value } });
      });

      console.log(serialized);

      this.test = data;

      return serialized;
    },

    readURL: function (input, img) {
      if (input.files && input.files[0]) {
        reader = new FileReader();

        reader.onload = function (e) {
          img.attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
      }
    }
  };
}(window));
