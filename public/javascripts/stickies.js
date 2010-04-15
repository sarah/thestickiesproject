/*global $*/
/*global TSP*/
$(document).ready(function(){
  var handler = TSP.get().event_handlers.surfaces.create_sticky;
  $('#new_sticky_button').click(handler);
});
