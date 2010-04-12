/*global $*/
/*global TSP*/
TSP.builders = (function() {
  function attach_handlers(sticky_element) {
    var handlers = TSP.get().event_handlers.stickies;
    var EDITABLE_STICKY_PROPS = { type : 'textarea', onblur : 'submit', 
                                  event : "dblclick", tooltip : "Double-click to edit",
                                  indicator : 'Saving...', placeholder : "Double-click to edit"};

    sticky_element.draggable({stop: handlers.update_position, containment: "#stickies" });

    sticky_element.find('.editable').editable(handlers.update_text, EDITABLE_STICKY_PROPS);

    sticky_element.find('.delete_link').click(handlers.destroy);

    return sticky_element;
  }

  function create_sticky_dom_element(options){
    var sticky_el = $("<div class='sticky' data-delete-url='"+
                      options.delete_url+"' data-update-url='"+
                      options.update_url+"'><div class='header'>"+
                      options.id+"<a class='delete_link'>x</a></div><div class='body'>"+
                      "<div class='editable'>"+options.content+
                      "</div></div><div class='footer'></div></div>");
    return attach_handlers(sticky_el);
  }

  function place_sticky_dom_element_on_surface(stage_selector) {
    var sticky_el = create_sticky_dom_element(this);
    $(stage_selector).append(sticky_el);
    sticky_el.css({left:this.left, top:this.top, position: 'absolute', display:"none"});
    sticky_el.slideDown(1000);
    return sticky_el;
  }

  return {
      create_sticky: function(){
            var url = $('#stickies').attr('data-create-sticky-url');
            $.post(url, null, function(response_json) { 
                  TSP.get().builders.create_sticky_dom_element(response_json).place_on("#stickies");
                }, "json");
          },
      create_sticky_dom_element:function(options){
              var new_sticky = $.extend({}, options);
              new_sticky.place_on = place_sticky_dom_element_on_surface;
              return new_sticky;
         }
  };
}());
