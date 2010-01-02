var TSP = {};

TSP.Handlers = {
  update_sticky_text: function(value, settings){
    var sticky_div = TSP.Lookups.get_sticky_parent_for(this);
    var sticky = TSP.Lookups.get_sticky(sticky_div);
    sticky.update_content(value);
    return value;
   }
};
TSP.Lookups = {
  get_sticky_parent_for : function(element){
    return element.closest('.sticky');
   }
};
