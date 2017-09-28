exports['headline-price']=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row" data-item="'+
((__t=( value ))==null?'':__t)+
'"> <div class="form-group col-xs-5"> <label for="tpl-headline-currency-'+
((__t=( value ))==null?'':__t)+
'">Moneda</label> <input type="text" name="titlePrice" class="form-control" id="tpl-headline-currency-'+
((__t=( value ))==null?'':__t)+
'" placeholder="Moneda"> </div> <div class="form-group col-xs-5"> <label for="tpl-headline-price-'+
((__t=( value ))==null?'':__t)+
'">Precio</label> <input type="text" name="titlePrice" class="form-control" id="tpl-headline-price-'+
((__t=( value ))==null?'':__t)+
'" placeholder="Precio"> </div> <div class="col-xs-1 form-group"> <button type="button" title="Remover precio" class="btn btn-default btn-success pull-right add-headline-price add-item"> <span class="glyphicon glyphicon-plus"></span> </button> </div> <div class="col-xs-1 form-group"> <button type="button" title="Remover precio" class="btn btn-default btn-danger pull-right remove-headline-price remove-item"> <span class="glyphicon glyphicon-minus"></span> </button> </div> </div> ';
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
'">Información</label> <input type="text" name="paragraphs" class="form-control" id="tpl-content'+
((__t=( value ))==null?'':__t)+
'" placeholder="Información"> </div> <div class="checkbox col-xs-2"> <label><input type="checkbox" name="paragraphs">Strong</label> </div> <div class="col-xs-1 form-group"> <button type="button" title="Agregar otra información" class="btn btn-default btn-success pull-right add-info add-item"> <span class="glyphicon glyphicon-plus"></span> </button> </div> <div class="col-xs-1 form-group"> <button type="button" title="Remover Información" class="btn btn-default btn-danger pull-right remove-info remove-item"> <span class="glyphicon glyphicon-minus"></span> </button> </div> </div> ';
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