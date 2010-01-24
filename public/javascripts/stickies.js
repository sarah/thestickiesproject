function hookup_sticky_new(){
  var handler = TSP.get().handlers.create_sticky;
  $('#new_sticky_button').click(handler);
}
$(document).ready(hookup_sticky_new);
