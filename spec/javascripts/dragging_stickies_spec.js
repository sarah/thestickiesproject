require('spec_helper.js', {onload: function(){
}});
var createSticky = function(createMovingVisitor){
  var sticky = {};
  sticky.youAreBeingDragged = function(dx, dy) {
   createMovingVisitor().moveMyNeighbors(dx,dy); 
  };

  return sticky;
};
var createMovingVisitor = function(){
   var movingVisitor = {};
   movingVisitor.moveMyNeighbors = function(dx,dy,sticky){
     var neighbors = sticky.getNeighbors();
     neighbors[0].youAreBeingDragged();
     neighbors[1].youAreBeingDragged();
   };

   return movingVisitor;
};
Screw.Unit(function(){
  describe("Dragging a sticky", function(){
    describe("Sticky", function() {
      describe("#youAreBeingDragged", function() {
        it("tells the MoveVisitor to move neighbors", function(){
          var __called_moveMyNeighbors = false;
          var movingVisitor = {
            moveMyNeighbors: function() { __args_moveMyNeighbors = arguments; __called_moveMyNeighbors = true; }
          };
          var createMovingVisitor = function() {  return movingVisitor; };
          var sticky = createSticky(createMovingVisitor);

          var dx = 10;
          var dy = 100;
          sticky.youAreBeingDragged(dx, dy);

          expect(__called_moveMyNeighbors).to(equal, true);
          expect(__args_moveMyNeighbors[0]).to(equal, dx);
          expect(__args_moveMyNeighbors[1]).to(equal, dy);
        });
      });
    });
    describe("MovingVisitor", function() {
      describe("#moveMyNeighbors", function() {
        it("tells the sticky's neighbor to drag", function(){
          var movingVisitor = createMovingVisitor();

          var sticky = {};
          var neighbor1 = {
            wasToldToDrag: false,
            youAreBeingDragged: function() { this.wasToldToDrag = true; }
          };
          var neighbor2 = {
            wasToldToDrag: false,
            youAreBeingDragged: function() { this.wasToldToDrag = true; }
          };

          var neighbors = [neighbor1, neighbor2];
          sticky.getNeighbors = function(){
            return neighbors;
          };

          movingVisitor.moveMyNeighbors(10,100, sticky);

          expect(neighbors[0].wasToldToDrag).to(equal, true);
          expect(neighbors[1].wasToldToDrag).to(equal, true);
        });
      });
    });
  });
});
