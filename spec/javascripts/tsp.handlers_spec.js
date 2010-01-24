require('spec_helper.js', {onload: function(){
    rails_require('tsp');
    rails_require('tsp.lookups');
    rails_require('tsp.handlers');
}});

Screw.Unit(function(){
  var mock_sticky = function(tsp){
    var sticky = mock();
    stub(tsp.lookups, 'sticky_from').and_return(sticky);
    stub(tsp.builders, 'create_sticky').and_return(sticky);
    stub(tsp.builders, 'sticky').and_return(sticky);
    stub(sticky, 'update_content');
    stub(sticky, 'place_on');
    return sticky;
  };

  var tsp;
  before(function(){
    tsp  = TSP.get();
    });

  describe("tsp.handlers", function(){

    describe("#destroy_sticky", function(){

      it("calls destroy on sticky", function(){
        var delete_div = {};
        mock_sticky(tsp).should_receive('destroy').exactly(1);
        tsp.handlers.destroy_sticky.apply(delete_div, []);
      });
    });

    describe("#create_sticky", function(){
      it("places created sticky on #stickies", function(){
        tsp.handlers.create_sticky();
      });
    });

    describe("#update_sticky_position", function(){
      it("calls update_position on sticky", function(){
        var ui_obj = { position : {
                      left : 15, top: 100 },
                      helper : get_sticky_div()};
        var event_obj = 'unused';

        mock_sticky(tsp).should_receive('update_position').exactly(1).with_arguments({left : 15, top : 100});
        tsp.handlers.update_sticky_position(event_obj, ui_obj);
      });
    });

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

    describe("#update_surface_name", function(){
      var mock_surface = function(tsp){
      var surface = mock();
      stub(tsp.lookups, 'current_surface').and_return(surface);
      stub(surface, 'update_name');
      return surface;
      };

      var surface;
      before(function(){
        surface = mock_surface(tsp);
        });
      it("returns the value passed in", function(){
        var value = tsp.handlers.update_surface_name.apply(get_editable_div(), ['new name', null]);
        expect(value).to(equal, "new name");
      });

      it("updates the surface value with the passed value", function(){
        surface.should_receive('update_name').with_arguments('this name').exactly(1);

        tsp.handlers.update_surface_name.apply(get_editable_div(), ['this name', null]);
      });
    });
  });
});
