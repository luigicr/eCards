/* global $, undefined */
var templates = require('../../dist/lib/templates.js');

var templateHeadline = templates.headline, // eslint-disable-line one-var
  templateSubHeadline = templates['sub-headline'],
  templateHeadlinePrice = templates['headline-price'],
  templateInfo = templates.info,
  $addHeadline = $('.add-headline'),
  $headlineContent = $('.headline-content'),
  $addSubHeadline = $('.add-sub-headline'),
  $subHeadlineContent = $('.sub-headline-content'),
  $addHeadlinePrice = $('.add-headline-price'),
  $headlinePriceContent = $('.headline-price-content'),
  $addInfo = $('.add-info'),
  $infoContent = $('.info-content'),
  tpl1 = templates['es-tarifa-unica'], // eslint-disable-line one-var
  resultHtml = tpl1();

console.log(resultHtml); // eslint-disable-line no-console

// Add a template row for the compose elements
// @template: the html template
// @container: where the template goes
// @maxRows: maximun number of rows allowed
function addRow(template, $container, maxRows) { // eslint-disable-line no-console
  'use strict';

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
}

// Remove a template row for the compose elements
// @elem: the element to remove
// @container: where the element be removed
function removeRow(elem, $container, maxRows) {
  'use strict';

  var $row = $(elem).closest('.row'),
    count;

  $row.remove();
  count = $container.children('.row').not('.hidden').length;

  if (count < maxRows) {
    $container.find('.add-item').removeClass('hidden');
  }
}

//
// ONE DESTINY, ONE FARE
//
$addHeadline.on('click', function __handler__(e) {
  'use strict';

  e.preventDefault();
  addRow(templateHeadline, $headlineContent, 3);
});

$headlineContent.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  removeRow(this, $headlineContent, 3);
});

$addSubHeadline.on('click', function __handler__(e) {
  'use strict';

  e.preventDefault();
  addRow(templateSubHeadline, $subHeadlineContent, 3);
});

$subHeadlineContent.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  removeRow(this, $subHeadlineContent, 3);
});

$addHeadlinePrice.on('click', function __handler__(e) {
  'use strict';

  e.preventDefault();
  addRow(templateHeadlinePrice, $headlinePriceContent, 3);
});

$headlinePriceContent.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  removeRow(this, $headlinePriceContent, 3);
});

$addInfo.on('click', function __handler__(e) {
  'use strict';

  e.preventDefault();
  addRow(templateInfo, $infoContent, 3);
});

$infoContent.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  removeRow(this, $infoContent, 3);
});
