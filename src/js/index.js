/* global $, undefined, eCard */
var $menu = $('.dropdown-menu'),
  $chkBranding = $('.chk-branding'),
  $coImage = $('.co-image');

$menu.on('click', 'a', function (e) {
  'use strict';

  e.preventDefault();

  $(this).closest('li').siblings().removeClass('active');
});

$chkBranding.on('change', function (e) {
  'use strict';
  e.preventDefault();

  $coImage.toggleClass('hidden');

  eCard.setCoBranding(this.checked);
});

// IMAGE
$coImage.change(function () {
  'use strict';
  eCard.setImgBranding64(this);

  eCard.setImgCoBrandName($coImage[0]);
});
