TSP.ajax_helpers = (function() {
  var ajax_post = function(url, method, params) {
    var common_params = {"_method" : method, authenticity_token : AUTH_TOKEN};
    $.extend(common_params, params);
    $.post(url, common_params, null, "json");
  };
  return {
    update : function(update_params){
      ajax_post(this.update_url(), "put", update_params);
    },

    destroy : function(sticky_element){
      ajax_post(this.delete_url(), "delete");
    }
  };
})();

