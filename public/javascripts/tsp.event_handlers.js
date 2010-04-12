/*global $*/
/*global TSP*/
TSP.event_handlers = (function() {
  var tsp = TSP.get();
  var sticky_actions = {
    destroy: function(){
                      var actions = tsp.lookups.actions_on(this);
                      actions.destroy();
                   },
    update_text: function(new_content, settings){
                      var actions = tsp.lookups.actions_on(this);
                      actions.update_content(new_content);
                      return new_content;
                   },
    update_position: function(event, ui){
                      var left = Math.round(ui.offset.left);
                      var top = Math.round(ui.offset.top);
                      var position = { left : left, top : top };
                      var actions = tsp.lookups.actions_on(ui.helper);
                      actions.update_position(position);
                   }
  };
  var surface_actions = {
    create_sticky: function() {
                     tsp.builders.create_sticky();
                   }
  };
  return {
    stickies: sticky_actions,
    surfaces: surface_actions
  };
}());


