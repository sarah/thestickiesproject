/*global $*/
/*global TSP*/
TSP.event_handlers = (function() {
  var tsp = TSP.get();
  tsp.actions = {};
  tsp.actions.destroy = function(sticky_dom_element) {
    var sticky_object = tsp.lookups.sticky_from(sticky_dom_element);
    sticky_object.destroy();
  };
  tsp.actions.update_content = function(sticky_dom_element, new_content) {
    var sticky = tsp.lookups.sticky_from(sticky_dom_element);
    sticky.update_content(new_content);
    return new_content;
  };
  tsp.actions.update_position = function(sticky_dom_element, new_position) {
    var sticky = tsp.lookups.sticky_from(ui.helper);
    sticky.update_position(position);
  };
  return {
    create_sticky: function() {
                     tsp.builders.create_sticky();
                   },
    destroy_sticky: function(){
                      tsp.actions.destroy(this);
                   },
    update_sticky_text: function(value, settings){
                      return tsp.actions.update_content(this, value);
                   },
    update_sticky_position: function(event, ui){
                              var left = Math.round(ui.offset.left);
                              var top = Math.round(ui.offset.top);
                              var position = { left : left, top : top };
                              tsp.actions.update_position(ui.helper, position);
                   },
    update_surface_name: function(value, settings){
                           var surface = tsp.lookups.current_surface();
                           surface.update_name(value);
                           return value;
                   }
  };
}());


