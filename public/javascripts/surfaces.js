var EDITABLE_SURFACE_PROPS = { onblur : 'submit', event : "dblclick", tooltip : "Double-click to change name", indicator : 'Saving...', placeholder : "Double-click to change name"};

function hookup_surface_editing(){
  var handler = TSP.get().handlers.update_surface_name;
  $('#surface_header .editable').editable(handler, EDITABLE_SURFACE_PROPS);
}

$(document).ready(hookup_surface_editing);
