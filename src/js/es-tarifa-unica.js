/* global $, undefined, eCard, _, he */
/* eslint-disable no-console */
var templates = require('../../src/lib/templates.js');

var templateHeadline = templates.headline, // eslint-disable-line one-var
  templateSubHeadline = templates['sub-headline'],
  templateHeadlinePrice = templates['headline-price'],
  templateInfo = templates.info,
  templateTerms = templates.terms,
  $headlineContent = $('.headline-content'),
  $subHeadlineContent = $('.sub-headline-content'),
  $headlinePriceContent = $('.headline-price-content'),
  $infoContent = $('.info-content'),
  $termsContent = $('.terms-content'),
  $form = $('.form-one-fare'),
  $fileImage = $('.tpl-headline-image'),
  $image = $('.img-preview'),
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
  eCard.readURL(this, $image);
});

$form.on('submit', function (e) {
  'use strict';
  var dataForm = $(this).serializeArray(),
    serialized,
    objTest = {},
    price = [],
    prices = [],
    parag = [],
    parags = [],
    strong;

  e.preventDefault();

  strong = $(this).find('input[type=checkbox]').map(function () {
    return { value: this.checked ? '1' : '' };
  });

  serialized = $(dataForm).filter(function (index, item) {
    return item.value !== '';
  });

  $(serialized).each(function (index, el) {
    if (el.name !== 'ecardName') {
      el.value = he.encode(el.value);
    }

    if (el.name === 'titlePrice') {
      price.push(el);
      return true;
    }

    if (el.name === 'paragraphs') {
      if (el.value !== 'on') {
        parag.push(el);
      }
      return true;
    }

    if (el.name === 'titleBanner' ||
      el.name === 'subtitleBanner' ||
      el.name === 'termAndCond') {
      if (!objTest[el.name]) {

        objTest[el.name] = [];
      }

      objTest[el.name].push(el.value);
    } else {
      objTest[el.name] = el.value;
    }

    return true;
  });
  console.log(objTest);

  price = _.groupBy(price, function (val, index) {
    return Math.floor(index / 2);
  });

  _.each(price, function (el) {
    prices.push({ currency: el[0].value, price: el[1].value });
  });

  _.each(parag, function (el, index) {
    parags.push({ text: el.value, bold: strong[index].value });
  });

  if ($fileImage[0].files[0]) {
    objTest.img = $fileImage[0].files[0].name;
    objTest.imgBase64 = $image.attr('src');
  }

  objTest.titlePrice = prices;
  objTest.paragraphs = parags;

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
