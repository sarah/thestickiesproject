TSP.lookups = (function() {

  var ajax_helpers = TSP.get().ajax_helpers;

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
          ajax_helpers.update.apply(this, [{"sticky[content]" : content}]);
        },
        update_position:function(position){
          ajax_helpers.update.apply(this, [{"sticky[left]" : position.left, "sticky[top]" : position.top}]);
        },
        destroy: function(){
          ajax_helpers.destroy.apply(this);
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
