var TSP = {};
TSP.get = function() {

  var json_post = function(url, method, params) {
    var common_params = {"_method" : method, authenticity_token : AUTH_TOKEN};
    $.extend(common_params, params);
    $.post(url, common_params, null, "json");
  };

  var update = function(update_params){
    var url = this.update_url();
    json_post(url, "put", update_params);
  };

  var sticky = function(sticky_element) {
      var dom_element = sticky_element;

      var destroy = function(){
        var url = dom_element.attr('data-delete-url');
        json_post(url, "delete");
      };
        
      return {
        update_url: function() {
          return dom_element.attr('data-update-url');
        },
        update_content:function(content){
          update.apply(this, [{"sticky[content]" : content}]);
        },
        update_position:function(position){
          update.apply(this, [{"sticky[left]" : position.left, "sticky[top]" : position.top}]);
        },
        destroy: function(){
          destroy();
          sticky_element.remove();
        }
      };
  };


  var builders = {
    create_sticky: function(){
          var url = $('#stickies').attr('data-create-sticky-url');
          $.post(url, null, function(response_json) { 
                builders.sticky(response_json).place_on("#stickies");
              }, "json");
         },
    sticky:function(options){
            var sticky_element=function(options){
              var sticky_el = $("<div class='sticky' data-delete-url='"+options.delete_url+"' data-update-url='"+options.update_url+"'><div class='header'>"+options.id+"<a class='delete_link'>x</a></div><div class='body'><div class='editable'>"+options.content+"</div></div><div class='footer'></div></div>");
              var handler = TSP.get().handlers.update_sticky_position;
              sticky_el.draggable({ stop: handler, containment: "#stickies" });
              handler = TSP.get().handlers.update_sticky_text;
              var EDITABLE_STICKY_PROPS = { type : 'textarea', onblur : 'submit', event : "dblclick", tooltip : "Double-click to edit", indicator : 'Saving...', placeholder : "Double-click to edit"};
              sticky_el.find('.editable').editable(handler, EDITABLE_STICKY_PROPS);
              handler = TSP.get().handlers.destroy_sticky;
              sticky_el.find('.delete_link').click(handler);
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


  var tsp = {};
  TSP.builders = builders;
  $.extend(tsp, TSP);
  return tsp; 
};
