/* global $, undefined */
var $menu = $('.dropdown-menu');

$menu.on('click', 'a', function (e) {
  'use strict';

  e.preventDefault();

  $(this).closest('li').siblings().removeClass('active');
});
