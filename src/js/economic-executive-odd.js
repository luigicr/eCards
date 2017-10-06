/* eslint-disable no-console */
/* global $, undefined, eCard */
var templates = require('../../src/lib/templates.js');

var templateHeadline = templates.headline, // eslint-disable-line one-var
  templateSubHeadline = templates['sub-headline'],
  templatePrice = templates.price,
  templateTitlePromo = templates['title-promo'],
  templateInfo = templates.info,
  templateCitiesSub = templates['cities-subtext'],
  templateCityPrice = templates['city-prices'],
  templateTerms = templates.terms,
  $headlineEconomicExecutiveOdd = $('.headline-economic-executive-odd'),
  $subHeadlineEconomicExecutiveOdd = $('.sub-headline-economic-executive-odd'),
  $priceEconomicExecutiveOdd = $('.price-economic-executive-odd'),
  $titlePromoEconomicExecutiveOdd = $('.info-headline-economic-executive-odd'),
  $infoTopEconomicExecutiveOdd = $('.info-top-economic-executive-odd'),
  $citiesEconomicExecutiveOddEcomonic = $('.cities-economic-executive-odd.economic'),
  $citiesEconomicExecutiveOddExecutive = $('.cities-economic-executive-odd.executive'),
  $cityPriceEconomicExecutiveOddEconomy = $('.cities-prices-economic-executive-odd.economic'),
  $cityPriceEconomicExecutiveOddExecutive = $('.cities-prices-economic-executive-odd.executive'),
  $infoBottomEconomicExecutiveOdd = $('.info-bottom-economic-executive-odd'),
  $termsEconomicExecutiveOdd = $('.terms-economic-executive-odd'),
  $imageEconomicExecutiveOdd = $('.image-economic-executive-odd'),
  indexChild = 1,
  indexChildExecutive = 1,
  $formEconomicExecutiveOdd = $('.form-economic-executive-odd'),
  $success = $('.success'),
  $folder = $('.folder'),
  $error = $('.error');

// HEADLINE
$headlineEconomicExecutiveOdd.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateHeadline, $headlineEconomicExecutiveOdd, 3);
});

$headlineEconomicExecutiveOdd.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $headlineEconomicExecutiveOdd, 3);
});

// SUB HEADLINE
$subHeadlineEconomicExecutiveOdd.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateSubHeadline, $subHeadlineEconomicExecutiveOdd, 3);
});

$subHeadlineEconomicExecutiveOdd.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $subHeadlineEconomicExecutiveOdd, 3);
});

// PRICE
$priceEconomicExecutiveOdd.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templatePrice, $priceEconomicExecutiveOdd, 3);
});

$priceEconomicExecutiveOdd.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $priceEconomicExecutiveOdd, 3);
});

// TITLE PROMO
$titlePromoEconomicExecutiveOdd.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateTitlePromo, $titlePromoEconomicExecutiveOdd, 3);
});

$titlePromoEconomicExecutiveOdd.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $titlePromoEconomicExecutiveOdd, 3);
});

// INFO TOP
$infoTopEconomicExecutiveOdd.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateInfo, $infoTopEconomicExecutiveOdd, 3, 'paragraphsTop');
});

$infoTopEconomicExecutiveOdd.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $infoTopEconomicExecutiveOdd, 3);
});

// CITIES
$citiesEconomicExecutiveOddEcomonic.on('click', '.add-item', function __handler__(e) {
  'use strict';
  var index,
    templateChild;

  e.preventDefault();
  index = eCard.addRow(templateCitiesSub,
    $citiesEconomicExecutiveOddEcomonic,
    6,
    'citiesPriceEconomic' + indexChild,
    'citiesEconomic',
    'subCitiesEconomic');

  indexChild = index;
  templateChild = $citiesEconomicExecutiveOddEcomonic.find('.cities-prices-odd-' + (index - 1));
  templateChild.on('click', '.add-city-price', function (echild) {
    echild.preventDefault();

    eCard.addRow(templateCityPrice, templateChild, 2, 'citiesPriceEconomic' + (index - 1));
  });

  templateChild.on('click', '.remove-city-price', function (echild) {
    echild.preventDefault();

    eCard.removeRow(this, templateChild, 2);
  });
});

$citiesEconomicExecutiveOddEcomonic.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $citiesEconomicExecutiveOddEcomonic, 2);
});

// Executive
$citiesEconomicExecutiveOddExecutive.on('click', '.add-item', function __handler__(e) {
  'use strict';
  var index,
    templateChild;

  e.preventDefault();
  index = eCard.addRow(templateCitiesSub,
    $citiesEconomicExecutiveOddExecutive,
    6,
    'citiesPriceExecutive' + indexChildExecutive,
    'citiesExecutive',
    'subCitiesExecutive');
  indexChildExecutive = index;
  templateChild = $citiesEconomicExecutiveOddExecutive.find('.cities-prices-odd-' + (index - 1));
  templateChild.on('click', '.add-city-price', function (echild) {
    echild.preventDefault();

    eCard.addRow(templateCityPrice, templateChild, 2, 'citiesPriceExecutive' + (index - 1));
  });

  templateChild.on('click', '.remove-city-price', function (echild) {
    echild.preventDefault();

    eCard.removeRow(this, templateChild, 2);
  });
});

$citiesEconomicExecutiveOddExecutive.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $citiesEconomicExecutiveOddExecutive, 2);
});

// CITY PRICES Economy
$cityPriceEconomicExecutiveOddEconomy.on('click', '.add-city-price', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateCityPrice, $cityPriceEconomicExecutiveOddEconomy, 2, 'citiesPriceEconomic');
});

$cityPriceEconomicExecutiveOddEconomy.on('click', '.remove-city-price', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $cityPriceEconomicExecutiveOddEconomy, 3);
});


// CITY PRICES Executive
$cityPriceEconomicExecutiveOddExecutive.on('click', '.add-city-price', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateCityPrice, $cityPriceEconomicExecutiveOddExecutive, 2, 'citiesPriceExecutive');
});

$cityPriceEconomicExecutiveOddExecutive.on('click', '.remove-city-price', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $cityPriceEconomicExecutiveOddExecutive, 3);
});

// INFO BOTTOM
$infoBottomEconomicExecutiveOdd.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateInfo, $infoBottomEconomicExecutiveOdd, 3, 'paragraphsBottom');
});

$infoBottomEconomicExecutiveOdd.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $infoBottomEconomicExecutiveOdd, 3);
});

// TERMS
$termsEconomicExecutiveOdd.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateTerms, $termsEconomicExecutiveOdd, 20, 'paragraphsBottom');
});

$termsEconomicExecutiveOdd.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $termsEconomicExecutiveOdd, 20);
});

// IMAGE
$imageEconomicExecutiveOdd.change(function () {
  'use strict';
  eCard.imgTo64(this);
});

// SUBMIT
$formEconomicExecutiveOdd.on('submit', function (e) {
  'use strict';
  var checkboxs = $(this).find('input[type=checkbox]'),
    img = $imageEconomicExecutiveOdd[0],
    objTest;

  e.preventDefault();

  objTest = eCard.serializeAllOptimized($(this), checkboxs, img);

  console.log(objTest);

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
