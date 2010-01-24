TSP.lookups = (function() {
  var json_helpers = (function() {
    var json_post = function(url, method, params) {
      var common_params = {"_method" : method, authenticity_token : AUTH_TOKEN};
      $.extend(common_params, params);
      $.post(url, common_params, null, "json");
    };
    return {
      update : function(update_params){
        var url = this.update_url();
        json_post(url, "put", update_params);
      },

      destroy : function(sticky_element){
        var url = this.delete_url();
        json_post(url, "delete");
      }
    };
  })();

  var sticky = function(sticky_element) {
      var dom_element = sticky_element;
      return {
        update_url: function() {
          return dom_element.attr('data-update-url');
        },
        delete_url: function() {
          return dom_element.attr('data-delete-url');
        },
        update_content:function(content){
          json_helpers.update.apply(this, [{"sticky[content]" : content}]);
        },
        update_position:function(position){
          json_helpers.update.apply(this, [{"sticky[left]" : position.left, "sticky[top]" : position.top}]);
        },
        destroy: function(){
          json_helpers.destroy.apply(this);
          sticky_element.remove();
        }
      };
  };

  return {
      sticky_element_from: function(element){
        return $(element).closest(".sticky");
      },
      sticky_from: function(element) {
        var sticky_element = TSP.lookups.sticky_element_from(element);
        return sticky(sticky_element);
      },
      current_surface: function() {
        return this.surface($('#surface'));
      }
  };
})();
