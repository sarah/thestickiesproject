require('spec_helper.js', {onload: function(){
    rails_require('tsp');
    rails_require('tsp.builders');
    rails_require('tsp.helpers.ajax');
    rails_require('tsp.lookups');
    rails_require('tsp.event_handlers');
}});

Screw.Unit(function(){
  var tsp;
  before(function(){
    tsp  = TSP.get();
  });

  var mock_sticky = function(tsp){
    var sticky = mock();
    Spies.stub(tsp.lookups, 'actions_on', sticky);
    Spies.stub(sticky, 'update_content');
    return sticky;
  };

  describe("tsp.event_handlers", function(){
    describe("stickies", function(){
      describe("#destroy", function(){

        it("calls destroy on sticky", function(){
            var delete_div, lookups, action_spy;
            action_spy = Spies.spyOn({}, "destroy");

            lookups = Spies.spyOn(tsp.lookups, "actions_on", action_spy);

            tsp.event_handlers.stickies.destroy.apply(delete_div, []);
            lookups.stopSpying();

            expect(action_spy.wasCalled("destroy")).to(equal, true);
        });
      });


      describe("#update_position", function(){
        it("calls update_position on sticky", function(){
          var ui_obj = { offset : {
                        left : 15, top: 100 },
                        helper : get_sticky_div()};
          var event_obj = 'unused';

          mock_sticky(tsp).should_receive('update_position').exactly(1).with_arguments({left : 15, top : 100});
          tsp.event_handlers.stickies.update_position(event_obj, ui_obj);
        });
      });

      describe("#update_text", function(){
        var sticky;
        before(function(){
          sticky = mock_sticky(tsp);
          });
        it("returns the value passed in", function(){
          var value = tsp.event_handlers.stickies.update_text.apply(get_editable_div(), ['new text', null]);
          expect(value).to(equal, "new text");
        });

        it("updates the sticky value with the passed value", function(){
          sticky.should_receive('update_content').with_arguments('new content').exactly(1);

          tsp.event_handlers.stickies.update_text.apply(get_editable_div(), ['new content', null]);
        });
      });
    });
  });
});
