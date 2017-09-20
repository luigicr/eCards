/* global $, undefined, eCard */
var templates = require('../../dist/lib/templates.js');

var templateHeadline = templates.headline, // eslint-disable-line one-var
  templateSubHeadline = templates['sub-headline'],
  templateHeadlinePrice = templates['headline-price'],
  templateInfo = templates.info,
  templateTerms = templates.terms,
  $addHeadline = $('.add-headline'),
  $headlineContent = $('.headline-content'),
  $addSubHeadline = $('.add-sub-headline'),
  $subHeadlineContent = $('.sub-headline-content'),
  $addHeadlinePrice = $('.add-headline-price'),
  $headlinePriceContent = $('.headline-price-content'),
  $addInfo = $('.add-info'),
  $infoContent = $('.info-content'),
  $addTerms = $('.add-terms'),
  $termsContent = $('.terms-content'),
  tpl1 = templates['es-tarifa-unica'], // eslint-disable-line one-var
  resultHtml = tpl1();

console.log(resultHtml); // eslint-disable-line no-console


//
// ONE DESTINY, ONE FARE
//
$addHeadline.on('click', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateHeadline, $headlineContent, 3);
});

$headlineContent.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $headlineContent, 3);
});

$addSubHeadline.on('click', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateSubHeadline, $subHeadlineContent, 3);
});

$subHeadlineContent.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $subHeadlineContent, 3);
});

$addHeadlinePrice.on('click', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateHeadlinePrice, $headlinePriceContent, 3);
});

$headlinePriceContent.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $headlinePriceContent, 3);
});

$addInfo.on('click', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateInfo, $infoContent, 3);
});

$infoContent.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $infoContent, 3);
});

$addTerms.on('click', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateTerms, $termsContent, 20);
});

$termsContent.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $termsContent, 20);
});
