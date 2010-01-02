require('spec_helper.js');
rails_require('tsp');

Screw.Unit(function(){
  describe("TSP.Handlers", function(){
    describe("#update_sticky_text", function(){
      it("returns the value passed in", function(){
        var editable_div = {};
        var sticky = {};
        stub(TSP.Lookups, 'get_sticky_parent_for').and_return(sticky);
        stub(sticky, 'update_content');
        var value = TSP.Handlers.update_sticky_text("new text", null);
        expect(value).to(equal, "new text");
      });

      it("updates the sticky value with the passed value", function(){
        var editable_div = {};
        var sticky = mock();

        stub(TSP.Lookups, 'get_sticky_parent_for').and_return(sticky);
        sticky.should_receive('update_content').with_arguments('new content').exactly(1);

        TSP.Handlers.update_sticky_text.apply(editable_div, ['new content', null]);
      });
    });
  });
});
