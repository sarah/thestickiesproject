var EDITABLE_STICKY_PROPS = { type : 'textarea', onblur : 'submit', event : "dblclick", tooltip : "Double-click to edit", indicator : 'Saving...', placeholder : "Double-click to edit"};

function hookup_sticky_editing(){
  var handler = TSP.get().handlers.update_sticky_text;
  $('.sticky .editable').editable(handler, EDITABLE_STICKY_PROPS);
}
function hookup_draggability(){
  var handler = TSP.get().handlers.update_sticky_position;
  $('.sticky').draggable({ stop: handler, containment: "#stickies" });
}
function hookup_sticky_delete(){
  var handler = TSP.get().handlers.destroy_sticky;
  $('.sticky .delete_link').click(handler);
}
function hookup_sticky_new(){
  var handler = TSP.get().handlers.create_sticky;
  $('#new_sticky_button').click(handler);
}
$(document).ready(hookup_sticky_editing);
$(document).ready(hookup_draggability);
$(document).ready(hookup_sticky_delete);
$(document).ready(hookup_sticky_new);
