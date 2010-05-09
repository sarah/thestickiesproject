require("spec_helper.js", {onload: function() {
  rails_require("tsp");
  rails_require("tsp.builders");
  rails_require("tsp.event_handlers");
  require('vendor/spies.js');
  require('vendor/jquery.simulate.js');
}});

Screw.Unit(function(){
  describe("DraggingFeature", function(){
    var surface, tsp_builders;
    before(function() {
      tsp_builders = TSP.get().builders;
      surface = $('#surface_template');
    });

    function create_sticky(id,left,top){
      var sticky;
      sticky = tsp_builders.create_sticky_dom_element({id: id, left:left, top:top});
      sticky.place_on(surface);
      return sticky;
    }
    
    describe("Moving a group together", function() {
      var sticky, stickyElement;
      before(function(){
        sticky = create_sticky(5,20,30);

        stickyElement = $(surface.find("#sticky_5")); 
      });

      describe("one neighbor", function() {
        var neighborSticky, neighborStickyElement;
        before(function() {
          neighborSticky = tsp_builders.create_sticky_dom_element(
            {id: 7, left:25, top: 30}
          );
          neighborSticky.place_on(surface);
          
          neighborStickyElement = $(surface.find("#sticky_7"));
        });

        it("dragging the sticky moves its one neighbor", function() {
          stickyElement.simulate("drag", {
            dx:10,
            dy:10
          });

          expect(neighborStickyElement.position().left).to(equal, 35);
          expect(neighborStickyElement.position().top).to(equal, 40);
        });
      });
    });

    describe("How to use the system", function() {
      var sticky, stickyElement;
      before(function(){
        sticky = create_sticky(5,20,30);

        stickyElement = $(surface.find("#sticky_5")); 
      });

      after(function() {
        stickyElement.remove();
      });

      it("Placing a new sticky on the surface", function(){
        expect(sticky.id).to(equal, 5);

        expect(stickyElement.attr("id")).to(equal, "sticky_5");
      });

      it("Triggering drag for a sticky", function() {
        var dragStartSpy, dragSpy;

        dragStartSpy = Spies.spyOn("dragStartHandler");

        dragSpy = Spies.spyOn("draggingHandler");

        stickyElement.bind("dragstart", dragStartSpy.spyFunction);
        stickyElement.bind("drag", dragSpy.spyFunction);

        stickyElement.simulate("drag", {
          dx:10,
          dy:10
        });

        expect(dragStartSpy.wasCalled()).to(be_true);
        expect(dragSpy.wasCalled()).to(be_true);

        expect(stickyElement.position().left).to(equal, 30);
        expect(stickyElement.position().top).to(equal, 40);
      });
    });
  });
});
