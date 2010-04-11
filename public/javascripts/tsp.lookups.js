/*global $*/
/*global TSP*/
TSP.lookups = (function() {
  var ajax_helpers = TSP.get().helpers.ajax;
  function sticky_behaviors_for(sticky_dom_element) {
      var dom_element = sticky_dom_element;
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
          dom_element.remove();
        }
      };
  }

  return {
      parent_sticky_dom_element_for: function(element){
        return $(element).closest(".sticky");
      },
      actions_on: function(element) {
        var sticky_element = TSP.get().lookups.parent_sticky_dom_element_for(element);
        return sticky_behaviors_for(sticky_element);
      },
      current_surface: function() {
        return this.surface($('#surface'));
      }
  };
}());
