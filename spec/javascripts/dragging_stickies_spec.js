require('spec_helper.js', {onload: function(){
}});
var createSticky = function(createMovingVisitor, neighborLookup){
  var sticky = {};
  sticky.youAreBeingDragged = function(dx, dy, movingVisitor) {
   if(!movingVisitor) {
     movingVisitor = createMovingVisitor();
   }
   movingVisitor.moveMyNeighbors(dx,dy, sticky); 
  };
  sticky.getNeighbors = function() { return neighborLookup(sticky); };
  return sticky;
};
var createMovingVisitor = function(){
   var movingVisitor = {};
   movingVisitor.moveMyNeighbors = function(dx,dy,sticky){
     $(sticky.getNeighbors()).each(function() {
         this.youAreBeingDragged(dx,dy, movingVisitor);
       });
   };
   return movingVisitor;
};
Screw.Unit(function(){
  describe("Dragging a sticky", function(){
    describe("Sticky", function() {
      describe("#youAreBeingDragged", function() {
        describe("no MovingVisitor given", function() {
          it("tells a new MoveVisitor to move neighbors", function(){
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
            expect(__args_moveMyNeighbors[2]).to(equal, sticky);
          });
        });
        describe("existing MovingVisitor given", function() {
          it("tells that MoveVisitor to move neighbors", function(){
            var __called_moveMyNeighbors = false;
            var movingVisitor = {
              moveMyNeighbors: function() { __args_moveMyNeighbors = arguments; __called_moveMyNeighbors = true; }
            };
            var sticky = createSticky($.noop);

            var dx = 10;
            var dy = 100;
            sticky.youAreBeingDragged(dx, dy, movingVisitor);

            expect(__called_moveMyNeighbors).to(equal, true);
            expect(__args_moveMyNeighbors[0]).to(equal, dx);
            expect(__args_moveMyNeighbors[1]).to(equal, dy);
            expect(__args_moveMyNeighbors[2]).to(equal, sticky);
          });
        });
      });
      describe("#getMyNeighbors", function() {
        it("returns the neighbors from the 'neighbor lookup' function", function() {
          var neighbors = {};
          var __args_getMyNeighbors;
          var getMyNeighbors = function() { __args_getMyNeighbors = arguments; return neighbors; };

          var sticky = createSticky($.noop, getMyNeighbors);

          var resulting_neighbors = sticky.getNeighbors();

          expect(resulting_neighbors).to(equal, neighbors);
          expect(__args_getMyNeighbors[0]).to(equal, sticky);
        });
      });
    });
    describe("MovingVisitor", function() {
      describe("#moveMyNeighbors", function() {
        it("tells the sticky's neighbor to drag", function(){
          var movingVisitor = createMovingVisitor();

          var sticky = {};

          var createNeighbor = function() {
            return {
              __args_wasToldToDrag : [],
              wasToldToDrag: false,
              youAreBeingDragged: function() { this.__args_wasToldToDrag = arguments; this.wasToldToDrag = true; }
            };
          };
          var neighbors = [createNeighbor(), createNeighbor()];
          sticky.getNeighbors = function(){
            return neighbors;
          };

          movingVisitor.moveMyNeighbors(10,100, sticky);

          expect(neighbors[0].wasToldToDrag).to(equal, true);
          expect(neighbors[0].__args_wasToldToDrag[0]).to(equal, 10);
          expect(neighbors[0].__args_wasToldToDrag[1]).to(equal, 100);
          expect(neighbors[0].__args_wasToldToDrag[2]).to(equal, movingVisitor);

          expect(neighbors[1].wasToldToDrag).to(equal, true);
          expect(neighbors[1].__args_wasToldToDrag[0]).to(equal, 10);
          expect(neighbors[1].__args_wasToldToDrag[1]).to(equal, 100);
          expect(neighbors[1].__args_wasToldToDrag[2]).to(equal, movingVisitor);
        });
      });
    });
  });
});
