rails_require('tsp');

var Helpers = {};

Helpers.editable_div = function(){
  return $('.sticky .editable');
};

Helpers.sticky_div = function(){
  return $('.sticky');
};

var get_editable_div = Helpers.editable_div;
var get_sticky_div = Helpers.sticky_div;


Screw.Unit(function(){
  var mock_sticky = function(){
    var sticky = mock();
    mock(TSP.Lookups).should_receive('sticky_from').and_return(sticky);
    stub(sticky, 'update_content');
    return sticky;
  };
  describe("TSP.Handlers", function(){
    describe("#update_sticky_text", function(){

      it("returns the value passed in", function(){
        mock_sticky();

        var value = TSP.Handlers.update_sticky_text.apply(get_editable_div(), ['new text', null]);
        expect(value).to(equal, "new text");
      });

      it("updates the sticky value with the passed value", function(){
        mock_sticky().should_receive('update_content').with_arguments('new content').exactly(1);

        TSP.Handlers.update_sticky_text.apply(get_editable_div(), ['new content', null]);
      });
    });
  });

  describe("sticky object returned from TSP.sticky_from", function(){
      it("contains the sticky div it was spawned from", function(){
        var sticky_div = get_sticky_div();
        sticky_div.attr('id', 'foo');

        var sticky = TSP.Lookups.sticky_from(sticky_div);
        expect(sticky.div.attr('id')).to(equal, 'foo');
      });

      it("can generate from a child of the sticky div", function(){
        var sticky_div = get_sticky_div();
        sticky_div.attr('id', 'bar');

        var editable_child_div = sticky_div.find('.editable');

        var sticky = TSP.Lookups.sticky_from(editable_child_div);
        expect(sticky.div.attr('id')).to(equal, 'bar');
      });
    });
});
