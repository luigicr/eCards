/* eslint-disable no-console, no-unused-vars */
/* globals window, document, $, _, he, eCard */
/* eslint complexity: ["error", 30] */
(function (root) {
  'use strict';
  var test,
    reader,
    img64,
    img64Branding,
    isCobranding,
    imgCoBrandName;

  root.eCard = {
    test: test,
    reader: reader,
    img64: img64,
    img64Branding: img64Branding,
    isCobranding: false,
    imgCoBrandName: imgCoBrandName,

    init: function () {
      return;
    },

    // Add a template row for the compose elements
    // @template: the html template
    // @container: where the template goes
    // @maxRows: maximun number of rows allowed
    addRow: function (template, $container, maxRows, customName, customCityName, customSubCityName) {
      var count,
        itemIndex = 0,
        itemArray;

      itemArray = $container.children('.row').map(function () {
        return [$(this).data('item')];
      }).get();

      // Looks for an available index
      $.each($container.children('.row'), function __loopRows__() {
        if ($.inArray(itemIndex, itemArray) === -1) {
          return;
        }
        itemIndex++;
      });

      // tmpl = _.template(templateHeadline);
      $container.append(template({ value: itemIndex,
        name: customName,
        cityName: customCityName,
        subCityName: customSubCityName }));

      count = $container.children('.row').not('.hidden').length;

      if (count >= maxRows) {
        if ($container.find('.add-item').length) {
          $container.find('.add-item').addClass('hidden');
        } else {
          $container.find('.add-city-price').addClass('hidden');
        }
      }

      return count;
    },

    // Remove a template row for the compose elements
    // @elem: the element to remove
    // @container: where the element be removed
    removeRow: function (elem, $container, maxRows) {
      var $row = $(elem).closest('.row'),
        count;

      $row.remove();
      count = $container.children('.row').not('.hidden').length;

      if (count < maxRows) {
        if ($container.find('.add-item').length) {
          $container.find('.add-item').removeClass('hidden');
        } else {
          $container.find('.add-city-price').removeClass('hidden');
        }
      }
    },

    // Group paragh Object into text, bold
    // @arrayElem: Array of paragh values
    // @strong: Array of checkboxes
    // @name: name to filter the correct checkboxes
    groupTextBold: function (arrayElem, strong, name) {
      var checkboxes,
        formatedPair = [];

      checkboxes = strong.filter(function (index, item) {
        return item.name === name;
      });

      // Creates paragrhaps object in correct format
      _.each(arrayElem, function (el, index) {
        formatedPair.push({ text: el, bold: checkboxes[index].value });
      });

      return formatedPair;
    },

    // Group city Object into text, subtext, national
    // @city: Array of cities
    // @subcity: Array of cities sub text
    // @strong: Array of checkboxes
    // @name: name to filter the correct checkboxes
    groupCity: function (city, subcity, strong, name) {
      var checkboxes,
        temp,
        formatedPair = [];

      checkboxes = strong.filter(function (index, item) {
        return item.name === name;
      });

      // Creates paragrhaps object in correct format
      _.each(city, function (el, index) {
        if (subcity) {
          formatedPair.push({ text: el,
            subtext: subcity[index],
            national: checkboxes[index].value });
        } else {
          formatedPair.push({ text: el, national: checkboxes[index].value });
        }
      });

      return formatedPair;
    },

    // Group Price into currency price Object
    // @arrayElem: Array of price elements
    groupPairPrices: function (arrayElem) {
      var pair,
        formatedPair = [];

      pair = _.groupBy(arrayElem, function (val, index) {
        return Math.floor(index / 2);
      });

      _.each(pair, function (el) {
        formatedPair.push({ currency: el[0], price: el[1] });
      });

      return formatedPair;
    },

    // Filter element by name and return array of values or value
    // @serialized: serialized array object of form elements
    // @elemName: the name of element to filter
    // @isArray: require return an array
    // @encode: return value encoded (default is true)
    getValues: function (serialized, elemName, isArray, encode) {
      var itemArray,
        isEncoded = !(typeof encode !== 'undefined');

      itemArray = _.filter(serialized, function (item, index) {
        return item.name === elemName && item.value !== 'on';
      });

      if (itemArray.length === 0) {
        return null;
      }

      if (isArray) {
        itemArray = itemArray.map(function (el) {
          return isEncoded ? he.encode(el.value) : el.value;
        });

        return itemArray;
      }

      return isEncoded ? he.encode(itemArray[0].value) : itemArray[0].value;
    },

    // Serialize form elements into correct format for post endpoint
    // @form: the container form
    // @checkboxes: checkboxes from form (serializeArray ignore non checked)
    // @img: image element (serializeArray ignore input type file)
    serializeAllOptimized: function (form, checkboxes, img) {
      var serialized,
        temp,
        cityTemp,
        chkboxes,
        objJSON = {};

      serialized = $(form).serializeArray();
      chkboxes = checkboxes.map(function () {
        return { value: this.checked ? '1' : '', name: this.name };
      });

      // Global elements
      objJSON.imgcobrand = '';
      objJSON.template = form.data('template');
      objJSON.ecardName = this.getValues(serialized, 'ecardName', false, false);
      objJSON.titleTop = this.getValues(serialized, 'titleTop', false);
      objJSON.utm = this.getValues(serialized, 'utm', false);
      objJSON.language = this.getValues(serialized, 'language', false);
      objJSON.titleBanner = this.getValues(serialized, 'titleBanner', true);
      objJSON.subtitleBanner = this.getValues(serialized, 'subtitleBanner', true);
      objJSON.termAndCond = this.getValues(serialized, 'termAndCond', true);
      // Check if image exists
      if (img.files[0]) {
        objJSON.img = img.files[0].name;
        objJSON.imgBase64 = this.img64;
      }

      // check if is co brand template
      if (this.getCoBranding()) {
        objJSON.imgcobrand = this.img64Branding;
        objJSON.imgCoBrandName = this.getImgCoBrandName();
      }

      // EXCLUDE CLASE ECONOMICA EJECUTIVA
      if (objJSON.template !== 'economic-or-executive') {
        temp = this.getValues(serialized, 'titlePrice', true);

        objJSON.titlePrice = this.groupPairPrices(temp);
      } else {
        temp = this.getValues(serialized, 'economyClass', true);
        objJSON.economyClass = this.groupPairPrices(temp);

        temp = this.getValues(serialized, 'executiveClass', true);
        objJSON.executiveClass = this.groupPairPrices(temp);
      }

      objJSON.titlePromo = this.getValues(serialized, 'titlePromo', true);

      temp = this.getValues(serialized, 'paragraphs', true);
      objJSON.paragraphs = this.groupTextBold(temp, chkboxes, 'paragraphs');

      temp = this.getValues(serialized, 'paragraphsTop', true);
      objJSON.paragraphsTop = this.groupTextBold(temp, chkboxes, 'paragraphsTop');

      temp = this.getValues(serialized, 'paragraphsBottom', true);
      objJSON.paragraphsBottom = this.groupTextBold(temp, chkboxes, 'paragraphsBottom');

      // Group economy/executive
      // ONLY DESTINOS PARES CLASE EJECUTIVA Y ECONOMICA
      if (objJSON.template === 'economic-executive-odd' || objJSON.template === 'economic-executive-even') {
        // Create a function?
        // ECONOMY
        cityTemp = this.getValues(serialized, 'citiesEconomic', true);

        cityTemp = this.groupCity(cityTemp,
          this.getValues(serialized, 'subCitiesEconomic', true),
          chkboxes,
          'citiesEconomic',
          'citiesPriceEconomic');

        // Create a function?
        _.each(cityTemp, function (el, index) {
          if (index === 0) {
            temp = eCard.getValues(serialized, 'citiesPriceEconomic', true);
          } else {
            temp = eCard.getValues(serialized, 'citiesPriceEconomic' + index, true);
          }
          el.prices = eCard.groupPairPrices(temp);
        });

        // group in pairs
        if (objJSON.template === 'economic-executive-odd') {
          objJSON.economyClass = _.groupBy(cityTemp, function (el, index) {
            return Math.floor(index / 2);
          });
        } else {
          objJSON.economyClass = cityTemp;
        }

        // EXECUTIVE
        cityTemp = this.getValues(serialized, 'citiesExecutive', true);

        cityTemp = this.groupCity(cityTemp,
          this.getValues(serialized, 'subCitiesExecutive', true),
          chkboxes, 'citiesExecutive');

        _.each(cityTemp, function (el, index) {
          if (index === 0) {
            temp = eCard.getValues(serialized, 'citiesPriceExecutive', true);
          } else {
            temp = eCard.getValues(serialized, 'citiesPriceExecutive' + index, true);
          }
          el.prices = eCard.groupPairPrices(temp);
        });

        // group in pairs
        if (objJSON.template === 'economic-executive-odd') {
          objJSON.executiveClass = _.groupBy(cityTemp, function (el, index) {
            return Math.floor(index / 2);
          });
        } else {
          objJSON.executiveClass = cityTemp;
        }
      }

      // ONLY DESTINOS PARES or DESTINOS IMPARES
      if (objJSON.template === 'odd-one-more' || objJSON.template === 'even-one-more') {
        // ECONOMY
        cityTemp = this.getValues(serialized, 'cities', true);

        cityTemp = this.groupCity(cityTemp,
          this.getValues(serialized, 'subCities', true),
          chkboxes,
          'cities',
          'citiesPrice');

        // Create a function?
        _.each(cityTemp, function (el, index) {
          if (index === 0) {
            temp = eCard.getValues(serialized, 'citiesPrice', true);
          } else {
            temp = eCard.getValues(serialized, 'citiesPrice' + index, true);
          }
          el.prices = eCard.groupPairPrices(temp);
        });

        // group in pairs
        if (objJSON.template === 'odd-one-more') {
          objJSON.cities = _.groupBy(cityTemp, function (el, index) {
            return Math.floor(index / 2);
          });
        } else {
          objJSON.cities = cityTemp;
        }
      }

      return objJSON;
    },

    // Serialize form elements into correct format for post endpoint
    // @form: the container form
    // @checkboxes: checkboxes from form (serializeArray ignore non checked)
    // @img: image element (serializeArray ignore input type file)
    // serializeAll: function (form, checkboxes, img) {
    //   var dataForm = $(form).serializeArray(),
    //     serialized,
    //     objTest = {},
    //     price = [],
    //     prices = [],
    //     priceCity = [],
    //     priceCity1 = [],
    //     priceCity2 = [],
    //     priceCity3 = [],
    //     priceCity4 = [],
    //     priceCities0 = [],
    //     priceCities1 = [],
    //     priceCities2 = [],
    //     priceCities3 = [],
    //     priceCities4 = [],
    //     priceCities = [],
    //     parag = [],
    //     parags = [],
    //     paragTop = [],
    //     paragsTop = [],
    //     paragBottom = [],
    //     paragsBottom = [],
    //     paragCities = [],
    //     paragSubCities = [],
    //     paragsCities = [],
    //     strong,
    //     strongTop,
    //     strongCities,
    //     strongBottom,
    //     economy = [],
    //     economys = [],
    //     executive = [],
    //     executives = [],
    //     temp = [];

    //   strong = checkboxes.map(function () {
    //     return { value: this.checked ? '1' : '', name: this.name };
    //   });

    //   strongTop = strong.filter(function (index, item) {
    //     return item.name === 'paragraphsTop';
    //   });

    //   strongCities = strong.filter(function (index, item) {
    //     return item.name === 'cities';
    //   });

    //   strongBottom = strong.filter(function (index, item) {
    //     return item.name === 'paragraphsBottom';
    //   });

    //   strong = strong.filter(function (index, item) {
    //     return item.name === 'paragraphs';
    //   });

    //   serialized = $(dataForm).filter(function (index, item) {
    //     return item.value !== '' || item.name === 'subCities';
    //   });

    //   // console.log(serialized);
    //   // temp = this.getValues(serialized, 'cities');

    //   // Go through elements and group according type (array, complex array)
    //   // @TODO optimize due complexity USE get Values
    //   $(serialized).each(function (index, el) {
    //     if (el.name !== 'ecardName' || el.name === 'utm') {
    //       el.value = he.encode(el.value);
    //     }

    //     if (el.name === 'titlePrice') {
    //       price.push(el);
    //       return true;
    //     }

    //     if (el.name === 'citiesPrice') {
    //       priceCity.push(el);
    //       return true;
    //     }

    //     if (el.name === 'citiesPrice1') {
    //       priceCity1.push(el);
    //       return true;
    //     }

    //     if (el.name === 'citiesPrice2') {
    //       priceCity2.push(el);
    //       return true;
    //     }

    //     if (el.name === 'citiesPrice3') {
    //       priceCity3.push(el);
    //       return true;
    //     }

    //     if (el.name === 'citiesPrice4') {
    //       priceCity4.push(el);
    //       return true;
    //     }

    //     if (el.name === 'economyClass') {
    //       economy.push(el);
    //       return true;
    //     }

    //     if (el.name === 'executiveClass') {
    //       executive.push(el);
    //       return true;
    //     }

    //     if (el.name === 'paragraphs') {
    //       if (el.value !== 'on') {
    //         parag.push(el);
    //       }
    //       return true;
    //     }

    //     if (el.name === 'paragraphsTop') {
    //       if (el.value !== 'on') {
    //         paragTop.push(el);
    //       }
    //       return true;
    //     }

    //     if (el.name === 'paragraphsBottom') {
    //       if (el.value !== 'on') {
    //         paragBottom.push(el);
    //       }
    //       return true;
    //     }

    //     if (el.name === 'cities') {
    //       if (el.value !== 'on') {
    //         paragCities.push(el);
    //       }
    //       return true;
    //     }

    //     if (el.name === 'subCities') {
    //       if (el.value !== 'on') {
    //         paragSubCities.push(el);
    //       }
    //       return true;
    //     }

    //     if (el.name === 'titleBanner' ||
    //       el.name === 'subtitleBanner' ||
    //       el.name === 'termAndCond' ||
    //       el.name === 'titlePromo') {
    //       if (!objTest[el.name]) {

    //         objTest[el.name] = [];
    //       }

    //       objTest[el.name].push(el.value);
    //     } else {
    //       objTest[el.name] = el.value;
    //     }

    //     return true;
    //   });

    //   // console.log('paragCities');
    //   // console.log(paragCities);
    //   // Creates price object in correct format
    //   price = _.groupBy(price, function (val, index) {
    //     return Math.floor(index / 2);
    //   });

    //   _.each(price, function (el) {
    //     prices.push({ currency: el[0].value, price: el[1].value });
    //   });

    //   // Creates price object in correct format
    //   priceCity = _.groupBy(priceCity, function (val, index) {
    //     return Math.floor(index / 2);
    //   });

    //   _.each(priceCity, function (el) {
    //     priceCities0.push({ currency: el[0].value, price: el[1].value });
    //   });

    //   // Creates price object in correct format
    //   priceCity1 = _.groupBy(priceCity1, function (val, index) {
    //     return Math.floor(index / 2);
    //   });

    //   _.each(priceCity1, function (el) {
    //     priceCities1.push({ currency: el[0].value, price: el[1].value });
    //   });

    //   // Creates price object in correct format
    //   priceCity2 = _.groupBy(priceCity2, function (val, index) {
    //     return Math.floor(index / 2);
    //   });

    //   _.each(priceCity2, function (el) {
    //     priceCities2.push({ currency: el[0].value, price: el[1].value });
    //   });

    //   // Creates price object in correct format
    //   priceCity3 = _.groupBy(priceCity3, function (val, index) {
    //     return Math.floor(index / 2);
    //   });

    //   _.each(priceCity3, function (el) {
    //     priceCities3.push({ currency: el[0].value, price: el[1].value });
    //   });

    //   // Creates price object in correct format
    //   priceCity4 = _.groupBy(priceCity4, function (val, index) {
    //     return Math.floor(index / 2);
    //   });

    //   _.each(priceCity4, function (el) {
    //     priceCities4.push({ currency: el[0].value, price: el[1].value });
    //   });

    //   priceCities.push(priceCities0);
    //   priceCities.push(priceCities1);
    //   priceCities.push(priceCities2);
    //   priceCities.push(priceCities3);
    //   priceCities.push(priceCities4);

    //   // Creates economy price object in correct format
    //   economy = _.groupBy(economy, function (val, index) {
    //     return Math.floor(index / 2);
    //   });

    //   _.each(economy, function (el) {
    //     economys.push({ currency: el[0].value, price: el[1].value });
    //   });

    //   // Creates executive price object in correct format
    //   executive = _.groupBy(executive, function (val, index) {
    //     return Math.floor(index / 2);
    //   });

    //   _.each(executive, function (el) {
    //     executives.push({ currency: el[0].value, price: el[1].value });
    //   });

    //   // Creates paragrhaps object in correct format
    //   _.each(parag, function (el, index) {
    //     parags.push({ text: el.value, bold: strong[index].value });
    //   });

    //   // Creates paragrhaps object in correct format
    //   _.each(paragTop, function (el, index) {
    //     paragsTop.push({ text: el.value, bold: strongTop[index].value });
    //   });

    //   // Creates paragrhaps object in correct format
    //   _.each(paragBottom, function (el, index) {
    //     paragsBottom.push({ text: el.value, bold: strongBottom[index].value });
    //   });

    //   // Creates paragrhaps object in correct format
    //   _.each(paragCities, function (el, index) {
    //     paragsCities.push({ text: el.value,
    //       national: strongCities[index].value });
    //   });


    //   // Check if image exist and pass to object
    //   if (img.files[0]) {
    //     objTest.img = img.files[0].name;
    //     objTest.imgBase64 = this.img64;
    //   }

    //   objTest.titlePrice = prices;
    //   objTest.economyClass = economys;
    //   objTest.executiveClass = executives;
    //   objTest.paragraphs = parags;
    //   objTest.paragraphsTop = paragsTop;
    //   objTest.paragraphsBottom = paragsBottom;
    //   objTest.cities = paragsCities;

    //   _.each(objTest.cities, function (el, index) {
    //     el.prices = priceCities[index];
    //     if (paragSubCities[index]) {
    //       if (paragSubCities[index].value !== '') {
    //         el.subtext = paragSubCities[index].value;
    //       }
    //     }
    //   });

    //   objTest.template = form.data('template');

    //   if (objTest.template === 'odd-one-more') {
    //     objTest.cities = _.groupBy(objTest.cities, function (val, index) {
    //       return Math.floor(index / 2);
    //     });
    //   }

    //   return objTest;
    // },

    // Validate the inputs required
    // @form: the container form
    validationForm: function (form) {
      var $validate = form.find('input[required="required"]'),
        valid = true;

      $validate.each(function () {
        console.log($(this));
        if (!$(this).val()) {
          $(this).addClass('alert-danger').tooltip('show');
          valid = false;
        } else {
          $(this).removeClass('alert-danger').tooltip('hide');
        }
      });
      return valid;
    },

    // Transform image from input to base64 image
    // @input: the image input container
    imgTo64: function (input) {
      var that = this;

      if (input.files && input.files[0]) {
        reader = new FileReader();

        reader.onload = function (e) {
          that.img64 = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
      }
    },

    // Transform image from input to base64 image
    // @input: the image input container
    setImgBranding64: function (input) {
      var that = this;

      if (input.files && input.files[0]) {
        reader = new FileReader();

        reader.onload = function (e) {
          that.img64Branding = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
      }
    },

    setCoBranding: function (val) {
      this.isCobranding = val;
    },

    getCoBranding: function () {
      return this.isCobranding;
    },

    setImgCoBrandName: function (val) {
      this.imgCoBrandName = val.files[0].name;
    },

    getImgCoBrandName: function () {
      return this.imgCoBrandName;
    }
  };
}(window));

(function(){
  $(document).keydown(function(evt){
      if (evt.keyCode == 77 && (evt.ctrlKey)){
          evt.preventDefault();
          $focus = $(document.activeElement);
          if($focus.attr('type') === 'text'){
            $focus.val(toSentencesCase($focus.val()))
          }
      }
  });

  function toSentencesCase(str){
    return str.substring(0, 1).toUpperCase() + str.substring(1, str.length).toLowerCase();
  }
}(window));
