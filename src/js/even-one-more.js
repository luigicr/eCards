/* global $, undefined, eCard */
/* eslint-disable no-console */
var templates = require('../../src/lib/templates.js');

var templateHeadline = templates.headline, // eslint-disable-line one-var
  templateSubHeadline = templates['sub-headline'],
  templatePrice = templates.price,
  templateTitlePromo = templates['title-promo'],
  templateInfo = templates.info,
  templateCities = templates.cities,
  templateCityPrice = templates['city-prices'],
  templateTerms = templates.terms,
  $headlineEvenOneMore = $('.headline-even-one-more'),
  $subHeadlineEvenOneMore = $('.sub-headline-even-one-more'),
  $priceEvenOneMore = $('.price-even-one-more'),
  $titlePromoEvenOneMore = $('.info-headline-even-one-more'),
  $infoTopEvenOneMore = $('.info-top-even-one-more'),
  $citiesEvenOneMore = $('.cities-even-one-more'),
  $cityPriceEvenOneMore = $('.cities-prices'),
  $infoBottomEvenOneMore = $('.info-bottom-even-one-more'),
  $termsEvenOneMore = $('.terms-even-one-more'),
  $formEvenOneMore = $('.form-even-one-more'),
  $imageEvenOneMore = $('.image-even-one-more'),
  indexChild = 1,
  $success = $('.success'),
  $folder = $('.folder'),
  $error = $('.error');

// HEADLINE
$headlineEvenOneMore.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateHeadline, $headlineEvenOneMore, 3);
});

$headlineEvenOneMore.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $headlineEvenOneMore, 3);
});

// SUB HEADLINE
$subHeadlineEvenOneMore.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateSubHeadline, $subHeadlineEvenOneMore, 3);
});

$subHeadlineEvenOneMore.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $subHeadlineEvenOneMore, 3);
});

// PRICE
$priceEvenOneMore.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templatePrice, $priceEvenOneMore, 3);
});

$priceEvenOneMore.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $priceEvenOneMore, 3);
});

// TITLE PROMO
$titlePromoEvenOneMore.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateTitlePromo, $titlePromoEvenOneMore, 3);
});

$titlePromoEvenOneMore.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $titlePromoEvenOneMore, 3);
});

// INFO TOP
$infoTopEvenOneMore.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateInfo, $infoTopEvenOneMore, 3, 'paragraphsTop');
});

$infoTopEvenOneMore.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $infoTopEvenOneMore, 3);
});

// CITIES
$citiesEvenOneMore.on('click', '.add-item', function __handler__(e) {
  'use strict';
  var index,
    templateChild;

  e.preventDefault();
  index = eCard.addRow(templateCities, $citiesEvenOneMore, 5, 'citiesPrice' + indexChild);
  indexChild = index;
  templateChild = $citiesEvenOneMore.find('.cities-prices-' + (index - 1));
  templateChild.on('click', '.add-city-price', function (echild) {
    echild.preventDefault();

    eCard.addRow(templateCityPrice, templateChild, 2, 'citiesPrice' + (index - 1));
  });

  templateChild.on('click', '.remove-city-price', function (echild) {
    echild.preventDefault();

    eCard.removeRow(this, templateChild, 2);
  });
});

$citiesEvenOneMore.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $citiesEvenOneMore, 2);
});

// CITY PRICES
$cityPriceEvenOneMore.on('click', '.add-city-price', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateCityPrice, $cityPriceEvenOneMore, 2);
});

$cityPriceEvenOneMore.on('click', '.remove-city-price', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $cityPriceEvenOneMore, 3);
});

// INFO BOTTOM
$infoBottomEvenOneMore.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateInfo, $infoBottomEvenOneMore, 3, 'paragraphsBottom');
});

$infoBottomEvenOneMore.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $infoBottomEvenOneMore, 3);
});

// TERMS
$termsEvenOneMore.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateTerms, $termsEvenOneMore, 20, 'paragraphsBottom');
});

$termsEvenOneMore.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $termsEvenOneMore, 20);
});

// IMAGE
$imageEvenOneMore.change(function () {
  'use strict';
  eCard.imgTo64(this);
});

$formEvenOneMore.on('submit', function (e) {
  'use strict';
  var checkboxs = $(this).find('input[type=checkbox]'),
    img = $imageEvenOneMore[0],
    objTest;

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
});
