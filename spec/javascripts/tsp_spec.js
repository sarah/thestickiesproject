require('spec_helper.js');
rails_require('tsp');

var Helpers = {};

Helpers.editable_div = function(){
  return $('.sticky .editable');
};

var editable_div = Helpers.editable_div;


Screw.Unit(function(){
  var mock_sticky = function(){
    var sticky = mock();
    mock(TSP.Lookups).should_receive('get_sticky').and_return(sticky);
    stub(sticky, 'update_content');
    return sticky;
  };
  describe("TSP.Handlers", function(){
    describe("#update_sticky_text", function(){

      it("returns the value passed in", function(){
        mock_sticky();

        var value = TSP.Handlers.update_sticky_text.apply(editable_div(), ['new text', null]);
        expect(value).to(equal, "new text");
      });

      it("updates the sticky value with the passed value", function(){
        var sticky = mock_sticky();

        sticky.should_receive('update_content').with_arguments('new content').exactly(1);

        TSP.Handlers.update_sticky_text.apply(editable_div(), ['new content', null]);
      });
    });
  });

  describe("TSP.Lookups", function(){
   describe("#get_sticky_parent_for", function(){
    it("retrieves the parent .sticky for the editable tag", function() {
      expect(TSP.Lookups.get_sticky_parent_for(editable_div()).attr('class')).to(equal, 'sticky');
    });
  });
 });

  describe("TSP.get_sticky", function(){

    });
});
