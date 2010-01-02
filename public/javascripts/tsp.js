var get_tsp = function() {
  var tsp = {};
  tsp.lookups = {
      sticky_from:function(){
                  
                    return{update_content:function(){}};
                  } 
  };
  tsp.handlers = {
    update_sticky_text: function(value, settings){
                          var sticky = tsp.lookups.sticky_from();
                          sticky.update_content(value);
                          return value;
                        }
  };
  return tsp; 
};
