require('spec_helper.js');
rails_require('tsp');

Screw.Unit(function(){
  describe("TSP.Handlers", function(){
    describe("#update_sticky_text", function(){



      it("returns the value passed in", function(){
        var editable_div = {};
        var sticky = {};

        stub_call(TSP.Lookups, 'get_sticky_parent_for', sticky);
        stub_call(sticky, 'update_content');

        var value = TSP.Handlers.update_sticky_text("new text", null);
        expect(value).to(equal, "new text");
      });

      it("updates the sticky value with the passed value", function(){
        var editable_div = {};
        var sticky = mock();
        stub_call(TSP.Lookups, 'get_sticky_parent_for', sticky);

        sticky.should_receive('update_content').with_arguments('new content').exactly(1);

        TSP.Handlers.update_sticky_text.apply(editable_div, ['new content', null]);
      });
    });
  });

  describe("TSP.Lookups", function(){
   describe("#get_sticky_parent_for", function(){
    it("retrieves the parent .sticky for the editable tag", function() {
      var editable_div = $('.sticky .editable');
      expect(TSP.Lookups.get_sticky_parent_for(editable_div).attr('class')).to(equal, 'sticky');
    });
  });
 });
});
