/*global $*/
/*global TSP*/
TSP.event_handlers = (function() {
  var tsp = TSP.get();
  return {
    create_sticky: function() {
                     tsp.builders.create_sticky();
                   },
    destroy_sticky: function(){
                      var actions = tsp.lookups.actions_on(this);
                      actions.destroy();
                   },
    update_sticky_text: function(new_content, settings){
                      var actions = tsp.lookups.actions_on(this);
                      actions.update_content(new_content);
                      return new_content;
                   },
    update_sticky_position: function(event, ui){
                      var left = Math.round(ui.offset.left);
                      var top = Math.round(ui.offset.top);
                      var position = { left : left, top : top };
                      var actions = tsp.lookups.actions_on(ui.helper);
                      actions.update_position(position);
                   },
    update_surface_name: function(value, settings){
                           var surface = tsp.lookups.current_surface();
                           surface.update_name(value);
                           return value;
                   }
  };
}());


