require('spec_helper.js', {onload: function(){
    rails_require('tsp');
}});

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
  var mock_sticky = function(tsp){
    var sticky = mock();
    stub(tsp.lookups, 'sticky_from').and_return(sticky);
    stub(sticky, 'update_content');
    return sticky;
  };
  var tsp;
  before(function(){
    tsp  = get_tsp();
    });
  describe("tsp.handlers", function(){
    describe("#update_sticky_text", function(){
      var sticky;
      before(function(){
        sticky = mock_sticky(tsp);
        });
      it("returns the value passed in", function(){
        var value = tsp.handlers.update_sticky_text.apply(get_editable_div(), ['new text', null]);
        expect(value).to(equal, "new text");
      });

      it("updates the sticky value with the passed value", function(){
        sticky.should_receive('update_content').with_arguments('new content').exactly(1);

        tsp.handlers.update_sticky_text.apply(get_editable_div(), ['new content', null]);
      });
    });
  });

  describe("tsp.lookups", function(){
    describe("sticky object returned from #sticky_from", function(){
        var sticky;
        before(function(){
          sticky = tsp.lookups.sticky_from();

          });
        describe("#update_content", function(){
          it("can be called", function(){
            sticky.update_content();
          });
        });
      });
  });
});
