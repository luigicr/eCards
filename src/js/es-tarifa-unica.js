/* global $, undefined, eCard, _ */
/* eslint-disable no-console */
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
  $form = $('.form-one-fare'),
  $fileImage = $('.tpl-headline-image'),
  $image = $('.img-preview');

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

  objTest.img = $fileImage[0].files[0].name;
  objTest.imgBase64 = $image.attr('src');
  objTest.titlePrice = prices;
  objTest.paragraphs = parags;

  $.ajax({
    url: '/generate',
    type: 'POST',
    data: objTest,
    dataType: 'application/json'
  });
});
