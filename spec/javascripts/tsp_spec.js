require("spec_helper.js");
rails_require('tsp');

Screw.Unit(function(){
  describe("TSP", function(){
    describe("#update_sticky_text_handler", function(){
      it("returns the value passed in", function(){
        var value = TSP.update_sticky_text_handler("new text", null);
        expect(value).to(equal, "new text");
      });
    });
  });
});
