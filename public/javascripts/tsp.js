var TSP = {};

TSP.Handlers = {
  update_sticky_text: function(value, settings){
    var sticky = TSP.Lookups.sticky_from(this);
    sticky.update_content(value);
    return value;
   }
};

TSP.Lookups = {
  sticky_from: function(element){
    var sticky = {};
    sticky.div = element.hasClass('sticky') ? element : element.closest(".sticky");
    return sticky;
   }
};
