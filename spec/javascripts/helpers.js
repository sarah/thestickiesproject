var Helpers = {};

Helpers.editable_div = function(){
  return $('.sticky .editable');
};

Helpers.sticky_div = function(){
  return $('.sticky');
};

Helpers.get_surface_selector = function(){
  return '#surface';
};


Helpers.get_stickies_selector = function(){
  return "#stickies";
}

Helpers.stickies_div = function() {
  return $(Helpers.get_stickies_selector());
};

var get_editable_div = Helpers.editable_div;
var get_sticky_div = Helpers.sticky_div;
var get_stickies_div = Helpers.stickies_div;
var get_stickies_selector = Helpers.get_stickies_selector;
var get_surface_selector = Helpers.get_surface_selector;

