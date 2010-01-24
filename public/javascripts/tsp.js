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
               var sticky = builders.sticky(response_json)
               sticky.place_on("#stickies");
              }, "json");
         },
    sticky:function(options){
            var sticky_element=function(options){
return $("<div class='sticky' data-delete-url='"+options.delete_url+"' data-update-url='"+options.update_url+"'><div class='header'>"+options.id+"<a class='delete_link'>x</a></div><div class='body'><div class='editable'>"+options.content+"</div></div><div class='footer'></div></div>");
            };

            var new_sticky = {left: options.left, top: options.top, content: options.content, update_url: options.update_url, id: options.id, delete_url: options.delete_url};
            new_sticky.place_on = function(container){
              var sticky_el = sticky_element(this);
              $(container).append(sticky_el);
              sticky_el.animate({left: this.left, top: this.top},'slow');
            };
            return new_sticky;
           }
  };
  var lookups = {
      sticky_element_from: function(element){
        return $(element).closest(".sticky");
      },
      sticky_from: function(element) {
        var sticky_element = lookups.sticky_element_from(element);
        return sticky(sticky_element);
      },
      current_surface: function() {
        return surface($('#surface'));
      }
  };

  var handlers = {
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

  var tsp = {};
  tsp.handlers = handlers;
  tsp.lookups = lookups;
  tsp.builders = builders;
  return tsp; 
};
