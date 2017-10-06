/* global $, undefined, eCard */
/* eslint-disable no-console */
var templates = require('../../src/lib/templates.js');

var templateHeadline = templates.headline, // eslint-disable-line one-var
  templateSubHeadline = templates['sub-headline'],
  templateHeadlinePrice = templates.price,
  templateInfo = templates.info,
  templateTerms = templates.terms,
  $headlineContent = $('.headline-content'),
  $subHeadlineContent = $('.sub-headline-content'),
  $headlinePriceContent = $('.headline-price-content'),
  $infoContent = $('.info-content'),
  $termsContent = $('.terms-content'),
  $form = $('.form-one-fare'),
  $fileImage = $('.tpl-headline-image'),
  $success = $('.success'),
  $folder = $('.folder'),
  $error = $('.error');

//
// ONE DESTINY, ONE FARE
//
$headlineContent.on('click', '.add-headline', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateHeadline, $headlineContent, 3);
});

$headlineContent.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $headlineContent, 3);
});

$subHeadlineContent.on('click', '.add-sub-headline', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateSubHeadline, $subHeadlineContent, 3);
});

$subHeadlineContent.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $subHeadlineContent, 3);
});

$headlinePriceContent.on('click', '.add-headline-price', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateHeadlinePrice, $headlinePriceContent, 3);
});

$headlinePriceContent.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $headlinePriceContent, 3);
});

$infoContent.on('click', '.add-info', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateInfo, $infoContent, 3);
});

$infoContent.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $infoContent, 3);
});

$termsContent.on('click', '.add-terms', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateTerms, $termsContent, 20);
});

$termsContent.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $termsContent, 20);
});

$fileImage.change(function () {
  'use strict';
  eCard.imgTo64(this);
});

$form.on('submit', function (e) {
  'use strict';
  var checkboxs = $(this).find('input[type=checkbox]'),
    img = $fileImage[0],
    objTest;

  if (eCard.validationForm($(this))) {

    e.preventDefault();

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

