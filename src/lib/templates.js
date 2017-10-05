exports['cities-subtext']=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row city-'+
((__t=( value ))==null?'':__t)+
'" data-item="'+
((__t=( value ))==null?'':__t)+
'"> <div class="col-xs-5 form-group"> <label for="city-name-odd-one-more-'+
((__t=( value ))==null?'':__t)+
'">Cuidad</label> <input type="text" class="form-control" id="city-name-odd-one-more-'+
((__t=( value ))==null?'':__t)+
'" name="'+
((__t=( typeof(cityName)!== 'undefined' ?  cityName : 'cities' ))==null?'':__t)+
'"> </div> <div class="col-xs-3 form-group"> <label for="sub-city-name-odd-one-more-'+
((__t=( value ))==null?'':__t)+
'">Sub texto</label> <input type="text" class="form-control" id="sub-city-name-odd-one-more-'+
((__t=( value ))==null?'':__t)+
'" name="'+
((__t=( typeof(subCityName)!== 'undefined' ?  subCityName : 'subCities' ))==null?'':__t)+
'"> </div> <div class="checkbox col-xs-2"> <label><input type="checkbox" name="'+
((__t=( typeof(cityName)!== 'undefined' ?  cityName : 'cities' ))==null?'':__t)+
'">Nacional</label> </div> <div class="col-xs-1 form-group"> <button type="button" title="Agregar otra cuidad" class="btn btn-default btn-success pull-right add-city add-item"> <span class="glyphicon glyphicon-plus"></span> </button> </div> <div class="col-xs-1 form-group"> <button type="button" title="Agregar otra cuidad" class="btn btn-default btn-danger pull-right remove-city remove-item"> <span class="glyphicon glyphicon-minus"></span> </button> </div> <div class="col-xs-12 cities-prices-odd-'+
((__t=( value ))==null?'':__t)+
'"> <div class="row" data-item="0"> <div class="col-xs-3 form-group"> <label for="currency-name-odd-one-more">Moneda</label> <input type="text" class="form-control" id="currency-name-odd-one-more" name="'+
((__t=( typeof(name)!== 'undefined' ?  name : 'citiesPrice' ))==null?'':__t)+
'"> </div> <div class="col-xs-3 form-group"> <label for="price-name-odd-one-more">Precio</label> <input type="text" class="form-control" id="price-name-odd-one-more" name="'+
((__t=( typeof(name)!== 'undefined' ?  name : 'citiesPrice' ))==null?'':__t)+
'"> </div> <div class="col-xs-2 form-group"> <button type="button" title="Agregar otra cuidad" class="btn btn-default btn-success pull-right add-city-price"> <span class="glyphicon glyphicon-plus"></span> </button> </div> </div> </div> </div> ';
}
return __p;
};
exports['cities']=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row city-'+
((__t=( value ))==null?'':__t)+
'" data-item="'+
((__t=( value ))==null?'':__t)+
'"> <div class="col-xs-8 form-group"> <label for="city-name-even-one-more-'+
((__t=( value ))==null?'':__t)+
'">Cuidad</label> <input type="text" class="form-control" id="city-name-even-one-more-'+
((__t=( value ))==null?'':__t)+
'" name="cities"> </div> <div class="checkbox col-xs-2"> <label><input type="checkbox" name="cities">Nacional</label> </div> <div class="col-xs-1 form-group"> <button type="button" title="Agregar otra cuidad" class="btn btn-default btn-success pull-right add-city add-item"> <span class="glyphicon glyphicon-plus"></span> </button> </div> <div class="col-xs-1 form-group"> <button type="button" title="Agregar otra cuidad" class="btn btn-default btn-danger pull-right remove-city remove-item"> <span class="glyphicon glyphicon-minus"></span> </button> </div> <div class="col-xs-12 cities-prices-'+
((__t=( value ))==null?'':__t)+
'"> <div class="row" data-item="0"> <div class="col-xs-3 form-group"> <label for="currency-name-even-one-more">Moneda</label> <input type="text" class="form-control" id="currency-name-even-one-more" name="'+
((__t=( typeof(name)!== 'undefined' ?  name : 'citiesPrice' ))==null?'':__t)+
'"> </div> <div class="col-xs-3 form-group"> <label for="price-name-even-one-more">Precio</label> <input type="text" class="form-control" id="price-name-even-one-more" name="'+
((__t=( typeof(name)!== 'undefined' ?  name : 'citiesPrice' ))==null?'':__t)+
'"> </div> <div class="col-xs-2 form-group"> <button type="button" title="Agregar otra cuidad" class="btn btn-default btn-success pull-right add-city-price"> <span class="glyphicon glyphicon-plus"></span> </button> </div> </div> </div> </div> ';
}
return __p;
};
exports['city-prices']=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row" data-item="'+
((__t=( value ))==null?'':__t)+
'"> <div class="col-xs-3 form-group"> <label for="currency-name-even-one-more-'+
((__t=( value ))==null?'':__t)+
'">Moneda</label> <input type="text" class="form-control" id="currency-name-even-one-more-'+
((__t=( value ))==null?'':__t)+
'" name="'+
((__t=( typeof(name)!== 'undefined' ?  name : 'citiesPrice' ))==null?'':__t)+
'"> </div> <div class="col-xs-3 form-group"> <label for="price-name-even-one-more-'+
((__t=( value ))==null?'':__t)+
'">Precio</label> <input type="text" class="form-control" id="price-name-even-one-more-'+
((__t=( value ))==null?'':__t)+
'" name="'+
((__t=( typeof(name)!== 'undefined' ?  name : 'citiesPrice' ))==null?'':__t)+
'"> </div> <div class="col-xs-1 form-group"> <button type="button" title="Agregar otro precio" class="btn btn-default btn-success pull-right add-city-price"> <span class="glyphicon glyphicon-plus"></span> </button> </div> <div class="col-xs-1 form-group"> <button type="button" title="Reover precio" class="btn btn-default btn-danger pull-right remove-city-price"> <span class="glyphicon glyphicon-minus"></span> </button> </div> </div> ';
}
return __p;
};
exports['headline']=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row tpl-headline-'+
((__t=( value ))==null?'':__t)+
'" data-item="'+
((__t=( value ))==null?'':__t)+
'"> <div class="form-group col-xs-10"> <label for="tpl-headline-'+
((__t=( value ))==null?'':__t)+
'">Headline</label> <input type="text" name="titleBanner" class="form-control" id="tpl-headline-'+
((__t=( value ))==null?'':__t)+
'" placeholder="Headline"> </div> <div class="col-xs-1 form-group"> <button type="button" title="Agregar otro Headline" class="btn btn-default btn-success pull-right add-headline add-item"> <span class="glyphicon glyphicon-plus"></span> </button> </div> <div class="col-xs-1 form-group"> <button type="button" title="Remover Headline" class="btn btn-default btn-danger pull-right remove-headline remove-item"> <span class="glyphicon glyphicon-minus"></span> </button> </div> </div> ';
}
return __p;
};
exports['info']=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row" data-item="'+
((__t=( value ))==null?'':__t)+
'"> <div class="form-group col-xs-8"> <label for="tpl-content'+
((__t=( value ))==null?'':__t)+
'">Información</label> <input type="text" name="'+
((__t=( typeof(name)!== 'undefined' ?  name : 'paragraphs' ))==null?'':__t)+
'" class="form-control" id="tpl-content'+
((__t=( value ))==null?'':__t)+
'" placeholder="Información"> </div> <div class="checkbox col-xs-2"> <label><input type="checkbox" name="'+
((__t=( typeof(name)!== 'undefined' ?  name : 'paragraphs' ))==null?'':__t)+
'">Strong</label> </div> <div class="col-xs-1 form-group"> <button type="button" title="Agregar otra información" class="btn btn-default btn-success pull-right add-info add-item"> <span class="glyphicon glyphicon-plus"></span> </button> </div> <div class="col-xs-1 form-group"> <button type="button" title="Remover Información" class="btn btn-default btn-danger pull-right remove-info remove-item"> <span class="glyphicon glyphicon-minus"></span> </button> </div> </div> ';
}
return __p;
};
exports['price']=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row" data-item="'+
((__t=( value ))==null?'':__t)+
'"> <div class="form-group col-xs-5"> <label for="tpl-headline-currency-'+
((__t=( value ))==null?'':__t)+
'">Moneda</label> <input type="text" name="'+
((__t=( typeof(name)!== 'undefined' ?  name : 'titlePrice' ))==null?'':__t)+
'" class="form-control" id="tpl-headline-currency-'+
((__t=( value ))==null?'':__t)+
'" placeholder="Moneda"> </div> <div class="form-group col-xs-5"> <label for="tpl-headline-price-'+
((__t=( value ))==null?'':__t)+
'">Precio</label> <input type="text" name="'+
((__t=( typeof(name)!== 'undefined' ?  name : 'titlePrice' ))==null?'':__t)+
'" class="form-control" id="tpl-headline-price-'+
((__t=( value ))==null?'':__t)+
'" placeholder="Precio"> </div> <div class="col-xs-1 form-group"> <button type="button" title="Agregar precio" class="btn btn-default btn-success pull-right add-headline-price add-item"> <span class="glyphicon glyphicon-plus"></span> </button> </div> <div class="col-xs-1 form-group"> <button type="button" title="Remover precio" class="btn btn-default btn-danger pull-right remove-headline-price remove-item"> <span class="glyphicon glyphicon-minus"></span> </button> </div> </div> ';
}
return __p;
};
exports['sub-headline']=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row tpl-sub-headline-'+
((__t=( value ))==null?'':__t)+
'" data-item="'+
((__t=( value ))==null?'':__t)+
'"> <div class="form-group col-xs-10"> <label for="tpl-sub-headline-'+
((__t=( value ))==null?'':__t)+
'">Sub Headline</label> <input type="text" name="subtitleBanner" class="form-control" id="tpl-sub-headline-'+
((__t=( value ))==null?'':__t)+
'" placeholder="Sub Headline"> </div> <div class="col-xs-1 form-group"> <button type="button" title="Agregar otro Sub Headline" class="btn btn-default btn-success pull-right add-sub-headline add-item"> <span class="glyphicon glyphicon-plus"></span> </button> </div> <div class="col-xs-1 form-group"> <button type="button" title="Remover Sub Headline" class="btn btn-default btn-danger pull-right remove-sub-headline remove-item"> <span class="glyphicon glyphicon-minus"></span> </button> </div> </div> ';
}
return __p;
};
exports['terms']=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row" data-item="'+
((__t=( value ))==null?'':__t)+
'"> <div class="form-group col-xs-10"> <label for="tpl-terms'+
((__t=( value ))==null?'':__t)+
'">Términos y condiciones</label> <input type="text" name="termAndCond" class="form-control" id="tpl-terms'+
((__t=( value ))==null?'':__t)+
'" placeholder="Términos y condiciones"> </div> <div class="col-xs-1 form-group"> <button type="button" title="Agregar otro término o condición" class="btn btn-default btn-success pull-right add-terms add-item"> <span class="glyphicon glyphicon-plus"></span> </button> </div> <div class="col-xs-1 form-group"> <button type="button" title="Remover Términos y condiciones" class="btn btn-default btn-danger pull-right remove-terms remove-item"> <span class="glyphicon glyphicon-minus"></span> </button> </div> </div> ';
}
return __p;
};
exports['title-promo']=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row title-promo-'+
((__t=( value ))==null?'':__t)+
'" data-item="'+
((__t=( value ))==null?'':__t)+
'"> <div class="form-group col-xs-10"> <label for="title-promo-'+
((__t=( value ))==null?'':__t)+
'">Título promoción</label> <input type="text" name="titlePromo" class="form-control" id="title-promo-'+
((__t=( value ))==null?'':__t)+
'" placeholder="Título de la promoción"> </div> <div class="col-xs-1 form-group"> <button type="button" title="Agregar otro título" class="btn btn-default btn-success pull-right add-title-promo add-item"> <span class="glyphicon glyphicon-plus"></span> </button> </div> <div class="col-xs-1 form-group"> <button type="button" title="Remover título" class="btn btn-default btn-danger pull-right remove-title-promo remove-item"> <span class="glyphicon glyphicon-minus"></span> </button> </div> </div> ';
}
return __p;
};