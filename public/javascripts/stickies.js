var EDITABLE_STICKY_PROPS = { type : 'textarea', onblur : 'submit', event : "dblclick", tooltip : "Double-click to edit", indicator : 'Saving...', placeholder : "Double-click to edit" };

function update_sticky_text(value, settings) {
  var stickie = parent_sticky(this);
  var url = sticky_update_url_for(stickie);
  update_sticky(url, value);
  return value;
}

function update_sticky(url, value){
  $.post(url, {"sticky[content]" : value, '_method' : 'put', authenticity_token : AUTH_TOKEN}, null, "json");
}

function hookup_sticky_editing(){
  $('.sticky .editable').editable(update_sticky_text, EDITABLE_STICKY_PROPS);
}

function sticky_update_url_for(sticky_div){
  return $(sticky_div).attr('data-update-url');
}

function parent_sticky(sticky_child){
  return $(sticky_child).parent(".sticky");
}

function hookup_draggability(){
  $('.sticky').draggable();
}
$(document).ready(hookup_sticky_editing);
$(document).ready(hookup_draggability);
