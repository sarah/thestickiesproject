require("spec_helper.js");
require("../../public/javascripts/jquery.jeditable.mini.js");
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
});

