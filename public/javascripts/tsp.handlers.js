/*global $*/
/*global TSP*/
TSP.handlers = (function() {
  var tsp = TSP.get();
  return {
    create_sticky: function() {
                     tsp.builders.create_sticky();
                   },
    destroy_sticky: function(){
                      var sticky = tsp.lookups.sticky_from(this);
                      sticky.destroy();
                   },
    update_sticky_text: function(value, settings){
                          var sticky = tsp.lookups.sticky_from(this);
                          sticky.update_content(value);
                          return value;
                   },
    update_sticky_position: function(event, ui){
                              var left = Math.round(ui.position.left);
                              var top = Math.round(ui.position.top);
                              var position = { left : left, top : top };
                              var sticky = tsp.lookups.sticky_from(ui.helper);
                              sticky.update_position(position);
                   },
    update_surface_name: function(value, settings){
                           var surface = tsp.lookups.current_surface();
                           surface.update_name(value);
                           return value;
                   }
  };
}());


