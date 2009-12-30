require("spec_helper.js");
require("../../public/javascripts/jquery.jeditable.mini.js");
require("../../public/javascripts/stickies.js");

Screw.Unit(function(){
  describe("getting information from sticky div", function(){
    it("can get the update url", function(){
      sticky_div = $("#sticky_23");
      sticky_div.attr('data-update-url', "/stickies/25");
      expect(sticky_update_url_for(sticky_div)).to(equal, "/stickies/25");
    });
  });
});

