/* globals window, document, $ */
(function (root) {
  'use strict';

  root.eCard = {
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
    }
  };
}(window));
