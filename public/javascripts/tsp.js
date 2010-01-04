var TSP = {};
TSP.get = function() {
  var sticky = function(sticky_element) {
        var update = function(update_params){
          var params = {"_method" : "put", authenticity_token : AUTH_TOKEN};
          $.extend(params, update_params);
          var url = sticky_element.attr('data-update-url');
          $.post(url, params, null, "json");
        };

        return {
          update_content:function(content){
                          update({"sticky[content]" : content});
                         },
          update_position:function(position){
                           update({"sticky[left]" : position.left, "sticky[top]" : position.top});
                          }
        };
  };

  var builders = {
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
                   }
  };

  var handlers = {
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
                        }
  };

  var tsp = {};
  tsp.handlers = handlers;
  tsp.lookups = lookups;
  tsp.builders = builders;
  return tsp; 
};
