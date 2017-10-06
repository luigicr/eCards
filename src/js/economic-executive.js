/* global $, undefined, eCard */
/* eslint-disable no-console */
var templates = require('../../src/lib/templates.js');

var templateHeadline = templates.headline, // eslint-disable-line one-var
  templatePrice = templates.price,
  templateInfo = templates.info,
  templateTerms = templates.terms,
  $infoEconomic = $('.info-economic-executive'),
  $termsEconomic = $('.terms-economic-executive'),
  $economicPrice = $('.economic-price'),
  $executivePrice = $('.executive-price'),
  $headlineEconomic = $('.headline-content-economic-executive'),
  $imageEconomic = $('.image-economic-excutive'),
  $formEconomic = $('.form-economic-or-executive'),
  $success = $('.success'),
  $folder = $('.folder'),
  $error = $('.error');

// HEADLINE
$headlineEconomic.on('click', '.add-headline', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateHeadline, $headlineEconomic, 3);
});

$headlineEconomic.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $headlineEconomic, 3);
});

// PRICES
// Economic price
$economicPrice.on('click', '.add-headline-price', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templatePrice, $economicPrice, 3, 'economyClass');
});

$economicPrice.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $economicPrice, 3);
});

// Executive price
$executivePrice.on('click', '.add-headline-price', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templatePrice, $executivePrice, 3, 'executiveClass');
});

$executivePrice.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $executivePrice, 3);
});

// INFO
$infoEconomic.on('click', '.add-info', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateInfo, $infoEconomic, 3);
});

$infoEconomic.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $infoEconomic, 3);
});

// TERMS
$termsEconomic.on('click', '.add-terms', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateTerms, $termsEconomic, 20);
});

$termsEconomic.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $termsEconomic, 20);
});

// IMAGE
$imageEconomic.change(function () {
  'use strict';
  eCard.imgTo64(this);
});

$formEconomic.on('submit', function (e) {
  'use strict';
  var checkboxs = $(this).find('input[type=checkbox]'),
    img = $imageEconomic[0],
    objTest;

  e.preventDefault();
  if (eCard.validationForm($(this))) {
    objTest = eCard.serializeAll($(this), checkboxs, img);

    $.ajax({
      url: '/generate',
      type: 'POST',
      data: objTest,
      datatype: 'json', // expecting JSON to be returned
      success: function (result) {
        console.log(result);
        $folder.text(objTest.ecardName);
        $success.modal('show');
      },
      error: function (result) {
        console.log(result);
        $error.modal('show');
      }
    });
    return true;
  }
  return false;
});
