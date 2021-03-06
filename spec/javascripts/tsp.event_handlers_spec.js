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

  describe("tsp.event_handlers", function(){
    describe("stickies", function(){
      describe("#destroy", function(){

        it("calls destroy on sticky", function(){
            var delete_div, lookups, action_spy;
            action_spy = Spies.v2.spyOn({}, "destroy");

            lookups = Spies.v2.spyOn(tsp.lookups, "actions_on", action_spy.object);

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

          stickySpy = Spies.v2.spyOn({}, "update_position");
          Spies.v2.stub(tsp.lookups, 'actions_on', stickySpy.object);

          tsp.event_handlers.stickies.update_position(event_obj, ui_obj);

          expect(stickySpy.wasCalled).to(be_true);
          expect(stickySpy.passedArguments(1).left).to(equal, 15);
          expect(stickySpy.passedArguments(1).top).to(equal, 100);
        });
      });

      describe("#update_text", function(){
        var stickySpy;
        before(function(){
          stickySpy = Spies.v2.spyOn({}, "update_content");
          Spies.v2.stub(tsp.lookups, 'actions_on', stickySpy.object);
        });
        it("returns the value passed in", function(){
          var value = tsp.event_handlers.stickies.update_text.apply(get_editable_div(), ['new text', null]);
          expect(value).to(equal, "new text");
        });

        it("updates the sticky value with the passed value", function(){
          tsp.event_handlers.stickies.update_text.apply(get_editable_div(), ['new content', null]);

          expect(stickySpy.wasCalled).to(be_true);
          expect(stickySpy.passedArguments(1)).to(equal, 'new content');
        });
      });
    });
  });
});
