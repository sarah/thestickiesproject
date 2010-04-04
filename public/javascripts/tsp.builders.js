/*global $*/
/*global TSP*/
TSP.builders = (function() {
  function attach_handlers(sticky_element) {
    var handlers = TSP.get().handlers;
    var EDITABLE_STICKY_PROPS = { type : 'textarea', onblur : 'submit', 
                                  event : "dblclick", tooltip : "Double-click to edit",
                                  indicator : 'Saving...', placeholder : "Double-click to edit"};

    sticky_element.draggable({ stop: handlers.update_sticky_position, containment: "#stickies" });

    sticky_element.find('.editable').editable(handlers.update_sticky_text, EDITABLE_STICKY_PROPS);

    sticky_element.find('.delete_link').click(handlers.destroy_sticky);

    return sticky_element;
  }

  function sticky_element(options){
    var sticky_el = $("<div class='sticky' data-delete-url='"+
                      options.delete_url+"' data-update-url='"+
                      options.update_url+"'><div class='header'>"+
                      options.id+"<a class='delete_link'>x</a></div><div class='body'>"+
                      "<div class='editable'>"+options.content+
                      "</div></div><div class='footer'></div></div>");
    return attach_handlers(sticky_el);
  }

  return {
      create_sticky: function(){
            var url = $('#stickies').attr('data-create-sticky-url');
            $.post(url, null, function(response_json) { 
                  TSP.get().builders.sticky(response_json).place_on("#stickies");
                }, "json");
          },
      sticky:function(options){
              var new_sticky = $.extend({}, options);

              new_sticky.place_on = function(container){
                var sticky_el = sticky_element(this);
                $(container).append(sticky_el);
                return sticky_el;
              };
              return new_sticky;

         }
  };
}());
