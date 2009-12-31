require("spec_helper.js");
require("../../public/javascripts/jquery.jeditable.mini.js");
require("../../public/javascripts/jquery-ui-1.7.2.custom.min.js");
require("../../public/javascripts/stickies.js");

Screw.Unit(function(){
  describe("getting information from sticky div", function(){
    it("can get the update url", function(){
      var sticky_div = $("#sticky_23");
      sticky_div.attr('data-update-url', "/stickies/25");
      expect(sticky_update_url_for(sticky_div)).to(equal, "/stickies/25");
    });
  });
  describe("getting the sticky div", function(){
    it("can retrieve it from the .editable element", function(){
      var sticky_editable_div = $("#sticky_23 .editable");
      var sticky_div = parent_sticky(sticky_editable_div);
      expect(sticky_div.attr('id')).to(equal, 'sticky_23');
    });
  });
  describe("getting information from the jquery ui object", function(){
        
    it("can get the position", function(){
      var jquery_ui_object = {"helper":{"0":{"jQuery1262233537241":3},"length":1,"context":{"jQuery1262233537241":3}},"position":{"top":6,"left":246},"absolutePosition":{"top":32.899993896484375,"left":254},"offset":{"top":32.899993896484375,"left":254}};

      var position = get_position_from_ui_object(jquery_ui_object);
      expect(position.left).to(equal, 254);
      expect(position.top).to(equal, 33);
    });
  });
});

