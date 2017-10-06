/* eslint-disable no-console, no-unused-vars */
/* global $, undefined, eCard */
var templates = require('../../src/lib/templates.js');

var templateHeadline = templates.headline, // eslint-disable-line one-var
  templateSubHeadline = templates['sub-headline'],
  templatePrice = templates.price,
  templateTitlePromo = templates['title-promo'],
  templateInfo = templates.info,
  templateCities = templates.cities,
  templateCityPrice = templates['city-prices'],
  templateTerms = templates.terms,
  $headlineEconomicExecutiveEven = $('.headline-economic-executive-even'),
  $subHeadlineEconomicExecutiveEven = $('.sub-headline-economic-executive-even'),
  $priceEconomicExecutiveEven = $('.price-economic-executive-even'),
  $titlePromoEconomicExecutiveEven = $('.info-headline-economic-executive-even'),
  $infoTopEconomicExecutiveEven = $('.info-top-economic-executive-even'),
  $citiesEconomicExecutiveEvenEcomonic = $('.cities-economic-executive-even.economic'),
  $citiesEconomicExecutiveEvenExecutive = $('.cities-economic-executive-even.executive'),
  $cityPriceEconomicExecutiveEvenEconomy = $('.cities-prices-economic-executive-even.economic'),
  $cityPriceEconomicExecutiveEvenExecutive = $('.cities-prices-economic-executive-even.executive'),
  $infoBottomEconomicExecutiveEven = $('.info-bottom-economic-executive-even'),
  $termsEconomicExecutiveEven = $('.terms-economic-executive-even'),
  $imageEconomicExecutiveEven = $('.image-economic-executive-even'),
  indexChild = 1,
  indexChildExecutive = 1,
  $formEconomicExecutiveEven = $('.form-economic-executive-even'),
  $success = $('.success'),
  $folder = $('.folder'),
  $error = $('.error');

// HEADLINE
$headlineEconomicExecutiveEven.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateHeadline, $headlineEconomicExecutiveEven, 3);
});

$headlineEconomicExecutiveEven.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $headlineEconomicExecutiveEven, 3);
});

// SUB HEADLINE
$subHeadlineEconomicExecutiveEven.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateSubHeadline, $subHeadlineEconomicExecutiveEven, 3);
});

$subHeadlineEconomicExecutiveEven.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $subHeadlineEconomicExecutiveEven, 3);
});

// PRICE
$priceEconomicExecutiveEven.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templatePrice, $priceEconomicExecutiveEven, 3);
});

$priceEconomicExecutiveEven.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $priceEconomicExecutiveEven, 3);
});

// TITLE PROMO
$titlePromoEconomicExecutiveEven.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateTitlePromo, $titlePromoEconomicExecutiveEven, 3);
});

$titlePromoEconomicExecutiveEven.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $titlePromoEconomicExecutiveEven, 3);
});

// INFO TOP
$infoTopEconomicExecutiveEven.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateInfo, $infoTopEconomicExecutiveEven, 3, 'paragraphsTop');
});

$infoTopEconomicExecutiveEven.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $infoTopEconomicExecutiveEven, 3);
});

// CITIES
$citiesEconomicExecutiveEvenEcomonic.on('click', '.add-item', function __handler__(e) {
  'use strict';
  var index,
    templateChild;

  e.preventDefault();
  index = eCard.addRow(templateCities,
    $citiesEconomicExecutiveEvenEcomonic,
    6,
    'citiesPriceEconomic' + indexChild,
    'citiesEconomic',
    'subCitiesEconomic');

  indexChild = index;
  templateChild = $citiesEconomicExecutiveEvenEcomonic.find('.cities-prices-even-' + (index - 1));
  templateChild.on('click', '.add-city-price', function (echild) {
    echild.preventDefault();

    eCard.addRow(templateCityPrice, templateChild, 2, 'citiesPriceEconomic' + (index - 1));
  });

  templateChild.on('click', '.remove-city-price', function (echild) {
    echild.preventDefault();

    eCard.removeRow(this, templateChild, 2);
  });
});

$citiesEconomicExecutiveEvenEcomonic.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $citiesEconomicExecutiveEvenEcomonic, 2);
});

// Executive
$citiesEconomicExecutiveEvenExecutive.on('click', '.add-item', function __handler__(e) {
  'use strict';
  var index,
    templateChild;

  e.preventDefault();
  index = eCard.addRow(templateCities,
    $citiesEconomicExecutiveEvenExecutive,
    6,
    'citiesPriceExecutive' + indexChildExecutive,
    'citiesExecutive',
    'subCitiesExecutive');
  indexChildExecutive = index;
  templateChild = $citiesEconomicExecutiveEvenExecutive.find('.cities-prices-even-' + (index - 1));
  templateChild.on('click', '.add-city-price', function (echild) {
    echild.preventDefault();

    eCard.addRow(templateCityPrice, templateChild, 2, 'citiesPriceExecutive' + (index - 1));
  });

  templateChild.on('click', '.remove-city-price', function (echild) {
    echild.preventDefault();

    eCard.removeRow(this, templateChild, 2);
  });
});

$citiesEconomicExecutiveEvenExecutive.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $citiesEconomicExecutiveEvenExecutive, 2);
});

// CITY PRICES Economy
$cityPriceEconomicExecutiveEvenEconomy.on('click', '.add-city-price', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateCityPrice, $cityPriceEconomicExecutiveEvenEconomy, 2, 'citiesPriceEconomic');
});

$cityPriceEconomicExecutiveEvenEconomy.on('click', '.remove-city-price', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $cityPriceEconomicExecutiveEvenEconomy, 3);
});


// CITY PRICES Executive
$cityPriceEconomicExecutiveEvenExecutive.on('click', '.add-city-price', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateCityPrice, $cityPriceEconomicExecutiveEvenExecutive, 2, 'citiesPriceExecutive');
});

$cityPriceEconomicExecutiveEvenExecutive.on('click', '.remove-city-price', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $cityPriceEconomicExecutiveEvenExecutive, 3);
});

// INFO BOTTOM
$infoBottomEconomicExecutiveEven.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateInfo, $infoBottomEconomicExecutiveEven, 3, 'paragraphsBottom');
});

$infoBottomEconomicExecutiveEven.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $infoBottomEconomicExecutiveEven, 3);
});

// TERMS
$termsEconomicExecutiveEven.on('click', '.add-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.addRow(templateTerms, $termsEconomicExecutiveEven, 20, 'paragraphsBottom');
});

$termsEconomicExecutiveEven.on('click', '.remove-item', function __handler__(e) {
  'use strict';

  e.preventDefault();
  eCard.removeRow(this, $termsEconomicExecutiveEven, 20);
});

// IMAGE
$imageEconomicExecutiveEven.change(function () {
  'use strict';
  eCard.imgTo64(this);
});

// SUBMIT
$formEconomicExecutiveEven.on('submit', function (e) {
  'use strict';
  var checkboxs = $(this).find('input[type=checkbox]'),
    img = $imageEconomicExecutiveEven[0],
    objTest;

  e.preventDefault();
  if (eCard.validationForm($(this))) {
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
    return true;
  }
  return false;
});
