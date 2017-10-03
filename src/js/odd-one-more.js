/* global $, undefined, eCard */
/* eslint-disable no-console */
var templates = require('../../src/lib/templates.js');

var templateHeadline = templates.headline, // eslint-disable-line one-var
  templateSubHeadline = templates['sub-headline'],
  templatePrice = templates.price,
  templateTitlePromo = templates['title-promo'],
  templateInfo = templates.info,
  templateCitiesSub = templates['cities-subtext'],
  templateCityPrice = templates['city-prices'],
  templateTerms = templates.terms,
  $headlineOddOneMore = $('.headline-odd-one-more'),
  $subHeadlineOddOneMore = $('.sub-headline-odd-one-more'),
  $priceOddOneMore = $('.price-odd-one-more'),
  $titlePromoOddOneMore = $('.info-headline-odd-one-more'),
  $infoTopOddOneMore = $('.info-top-odd-one-more'),
  $citiesOddOneMore = $('.cities-odd-one-more'),
  $cityPriceOddOneMore = $('.cities-prices-odd'),
  $infoBottomOddOneMore = $('.info-bottom-odd-one-more'),
  $termsOddOneMore = $('.terms-odd-one-more'),
  $formOddOneMore = $('.form-odd-one-more'),
  $imageOddOneMore = $('.image-odd-one-more'),
  indexChild = 1,
  $success = $('.success'),
  $folder = $('.folder'),
  $error = $('.error');


// HEADLINE
$headlineOddOneMore.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateHeadline, $headlineOddOneMore, 3);
});

$headlineOddOneMore.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $headlineOddOneMore, 3);
});

// SUB HEADLINE
$subHeadlineOddOneMore.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateSubHeadline, $subHeadlineOddOneMore, 3);
});

$subHeadlineOddOneMore.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $subHeadlineOddOneMore, 3);
});

// PRICE
$priceOddOneMore.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templatePrice, $priceOddOneMore, 3);
});

$priceOddOneMore.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $priceOddOneMore, 3);
});

// TITLE PROMO
$titlePromoOddOneMore.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateTitlePromo, $titlePromoOddOneMore, 3);
});

$titlePromoOddOneMore.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $titlePromoOddOneMore, 3);
});

// INFO TOP
$infoTopOddOneMore.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateInfo, $infoTopOddOneMore, 3, 'paragraphsTop');
});

$infoTopOddOneMore.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $infoTopOddOneMore, 3);
});

// CITIES
$citiesOddOneMore.on('click', '.add-item', function __handler__(e) {
  'use strict';
  var index,
    templateChild;

  e.preventDefault();
  index = eCard.addRow(templateCitiesSub, $citiesOddOneMore, 5, 'citiesPrice' + indexChild);
  indexChild = index;
  templateChild = $citiesOddOneMore.find('.cities-prices-odd-' + (index - 1));
  templateChild.on('click', '.add-city-price', function (echild) {
    echild.preventDefault();

    eCard.addRow(templateCityPrice, templateChild, 2, 'citiesPrice' + (index - 1));
  });

  templateChild.on('click', '.remove-city-price', function (echild) {
    echild.preventDefault();

    eCard.removeRow(this, templateChild, 2);
  });
});

$citiesOddOneMore.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $citiesOddOneMore, 2);
});

// CITY PRICES
$cityPriceOddOneMore.on('click', '.add-city-price', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateCityPrice, $cityPriceOddOneMore, 2);
});

$cityPriceOddOneMore.on('click', '.remove-city-price', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $cityPriceOddOneMore, 3);
});

// INFO BOTTOM
$infoBottomOddOneMore.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateInfo, $infoBottomOddOneMore, 3, 'paragraphsBottom');
});

$infoBottomOddOneMore.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $infoBottomOddOneMore, 3);
});

// TERMS
$termsOddOneMore.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateTerms, $termsOddOneMore, 20, 'paragraphsBottom');
});

$termsOddOneMore.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $termsOddOneMore, 20);
});

// IMAGE
$imageOddOneMore.change(function () {
  'use strict';
  eCard.imgTo64(this);
});

// SUBMIT
$formOddOneMore.on('submit', function (e) {
  'use strict';
  var checkboxs = $(this).find('input[type=checkbox]'),
    img = $imageOddOneMore[0],
    objTest;

  e.preventDefault();

  objTest = eCard.serializeAll($(this), checkboxs, img);


  console.log(objTest.cities);


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
