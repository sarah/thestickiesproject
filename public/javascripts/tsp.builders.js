TSP.builders = (function() {
  var attach_handlers = function(sticky_element) {
    var handler = TSP.get().handlers.update_sticky_position;
    sticky_element.draggable({ stop: handler, containment: "#stickies" });
    handler = TSP.get().handlers.update_sticky_text;
    var EDITABLE_STICKY_PROPS = { type : 'textarea', onblur : 'submit', event : "dblclick", tooltip : "Double-click to edit", indicator : 'Saving...', placeholder : "Double-click to edit"};
    sticky_element.find('.editable').editable(handler, EDITABLE_STICKY_PROPS);
    handler = TSP.get().handlers.destroy_sticky;
    sticky_element.find('.delete_link').click(handler);
  };


  return {
      create_sticky: function(){
            var url = $('#stickies').attr('data-create-sticky-url');
            $.post(url, null, function(response_json) { 
                  TSP.get().builders.sticky(response_json).place_on("#stickies");
                }, "json");
           },
      sticky:function(options){
              var sticky_element=function(options){
                var sticky_el = $("<div class='sticky' data-delete-url='"+options.delete_url+"' data-update-url='"+options.update_url+"'><div class='header'>"+options.id+"<a class='delete_link'>x</a></div><div class='body'><div class='editable'>"+options.content+"</div></div><div class='footer'></div></div>");
                attach_handlers(sticky_el);
                return sticky_el;
              };


              var new_sticky = {left: options.left, top: options.top, content: options.content, update_url: options.update_url, id: options.id, delete_url: options.delete_url};
              new_sticky.place_on = function(container){
                var sticky_el = sticky_element(this);
                $(container).append(sticky_el);
                sticky_el.animate({left: this.left, top: this.top},'slow');
                return sticky_el;
              };
              return new_sticky;

             }
  };
})();
