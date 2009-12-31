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

function inspect(me){
  return JSON.stringify(me);
}
function get_position_from_ui_object(ui_object){
  var left = Math.round(ui_object.absolutePosition.left);
  var top = Math.round(ui_object.absolutePosition.top);
  return { left : left, top : top };
}

function update_sticky_position(url, position){
 console.log("updating sticky via ajax");
 $.post(url, {"sticky[x]" : position.left, "sticky[y]" : position.top, '_method' : 'put', authenticity_token : AUTH_TOKEN}, null, "json");
}

function on_sticky_drag_stop(event, ui){
  var position = get_position_from_ui_object(ui);
  console.log(inspect(position));
  var sticky = ui.helper;
  console.log(inspect(sticky));
  var update_url = sticky_update_url_for(sticky);
  console.log("update_url " + update_url);
  update_sticky_position(update_url, position);
}
function hookup_draggability(){
  $('.sticky').draggable({ stop: on_sticky_drag_stop});
}
$(document).ready(hookup_sticky_editing);
$(document).ready(hookup_draggability);
