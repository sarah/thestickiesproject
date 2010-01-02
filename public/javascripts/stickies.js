var EDITABLE_STICKY_PROPS = { type : 'textarea', onblur : 'submit', event : "dblclick", tooltip : "Double-click to edit", indicator : 'Saving...', placeholder : "Double-click to edit" };

function old_update_sticky_text(value, settings) {
  var sticky = parent_sticky(this);
  var url = sticky_update_url_for(sticky);
  update_sticky(url, value);
  return value;
}

function update_sticky(url, value){
  $.post(url, {"sticky[content]" : value, '_method' : 'put', authenticity_token : AUTH_TOKEN}, null, "json");
}

function hookup_sticky_editing(){
  $('.sticky .editable').editable(old_update_sticky_text, EDITABLE_STICKY_PROPS);
}

function sticky_update_url_for(sticky_div){
  return $(sticky_div).attr('data-update-url');
}

function parent_sticky(sticky_child){
  return $(sticky_child).parent(".sticky");
}

function inspect(me){
  if(JSON) {
    return JSON.stringify(me);
  }else{
    return 'me';
  }
}
function get_position_from_ui_object(ui_object){
  var left = Math.round(ui_object.absolutePosition.left);
  var top = Math.round(ui_object.absolutePosition.top);
  return { left : left, top : top };
}

function update_sticky_position(url, position){
 $.post(url, {"sticky[x]" : position.left, "sticky[y]" : position.top, '_method' : 'put', authenticity_token : AUTH_TOKEN}, null, "json");
}

function on_sticky_drag_stop(event, ui){
  var position = get_position_from_ui_object(ui);
  var sticky = ui.helper;
  var update_url = sticky_update_url_for(sticky);
  update_sticky_position(update_url, position);
}
function hookup_draggability(){
  $('.sticky').draggable({ stop: on_sticky_drag_stop});
}
$(document).ready(hookup_sticky_editing);
$(document).ready(hookup_draggability);
