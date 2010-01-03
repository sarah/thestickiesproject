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
                           update({"sticky[x]" : position.left, "sticky[y]" : position.top});
                          }
        };
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
                          var left = Math.round(ui.absolutePosition.left);
                          var top = Math.round(ui.absolutePosition.top);
                          var position = { left : left, top : top };
                          var sticky = tsp.lookups.sticky_from(ui.helper);
                          sticky.update_position(position);
                        }
  };

  var tsp = {};
  tsp.handlers = handlers;
  tsp.lookups = lookups;
  return tsp; 
};
