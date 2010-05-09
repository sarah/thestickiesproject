/*global $*/
/*global TSP*/
TSP.event_handlers = (function() {
  var tsp = TSP.get();
  function position_from_offset(offset) {
    var left, top;
    left = Math.round(offset.left);
    top = Math.round(offset.top);
    return { left : left, top : top };
  }
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
                      var position = position_from_offset(ui.offset);
                      var actions = tsp.lookups.actions_on(ui.helper);
                      actions.update_position(position);
                    },
  };
  var dragging_actions = {
    dragging_sticky: null,
    start: function() {
      console.log('started ' ); 
      console.log( arguments); 
      this.dragging_sticky = { youAreBeingDragged: $.noop };
    },
    stop: function(event,ui){
      sticky_actions.update_position(event,ui);
    },
    drag: function(event, ui){
      console.log('drag ');
      console.log(arguments);
      var new_position;
      new_position = position_from_offset(ui.offset);
      this.dragging_sticky.youAreBeingDragged(new_position);
    }
  };

  sticky_actions.dragging = dragging_actions;


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


