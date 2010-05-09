require('spec_helper.js');
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
   var visited = [];
   movingVisitor.moveMyNeighbors = function(dx,dy,sticky){
     var toVisit = $(sticky.getNeighbors()).filter(function(){
         return visited.indexOf(this.id) === -1;
     });
     $(toVisit).each(function(){visited.push(this.id)}).each(function() { this.youAreBeingDragged(dx,dy, movingVisitor); });
   };
   return movingVisitor;
};
Screw.Unit(function(){
  describe("Dragging a sticky", function(){
    describe("Sticky", function() {
      describe("#youAreBeingDragged", function() {
        function expectNeighborsMoved(visitorSpy, dx, dy, sticky){
          expect(visitorSpy.wasCalled()).to(equal, true);
          expect(visitorSpy.passedArguments(1)).to(equal, dx);
          expect(visitorSpy.passedArguments(2)).to(equal, dy);
          expect(visitorSpy.passedArguments(3)).to(equal, sticky);
        }
        function functionThatReturns(argument){ 
          return function() { return argument; };
        }
        describe("no MovingVisitor given", function() {
          it("tells a new MoveVisitor to move neighbors", function(){
            var visitorSpy;
            visitorSpy = Spies.v2.spyOn({}, "moveMyNeighbors");

            var sticky = createSticky(functionThatReturns(visitorSpy.object));

            sticky.youAreBeingDragged(10, 100);
            expectNeighborsMoved(visitorSpy, 10, 100, sticky);
          });
        });

        describe("existing MovingVisitor given", function() {
          it("tells that MovingVisitor to move neighbors", function(){
            var visitorSpy;
            visitorSpy = Spies.v2.spyOn({}, "moveMyNeighbors");

            var sticky = createSticky($.noop);
            sticky.youAreBeingDragged(10, 100, visitorSpy.object);

            expectNeighborsMoved(visitorSpy, 10, 100, sticky);
          });
        });
      });
      describe("#getMyNeighbors", function() {
        it("returns the neighbors from the 'neighbor lookup' function", function() {
          var neighbors, spy, sticky, resulting_neighbors;
          neighbors = {foo: 1};
          spy = Spies.v2.spyOn("getMyNeighbors", neighbors);

          sticky = createSticky($.noop, spy.spyFunction);
          resulting_neighbors = sticky.getNeighbors();

          expect(resulting_neighbors).to(equal, neighbors);
          expect(spy.passedArguments(1)).to(equal, sticky);
        });
      });
    });
    describe("MovingVisitor", function() {
      describe("#moveMyNeighbors", function() {
        function expectDragged(neighborSpy, dx, dy, visitor) {
          expect(neighborSpy.wasCalled()).to(equal, true);
          expect(neighborSpy.passedArguments(1)).to(equal, dx);
          expect(neighborSpy.passedArguments(2)).to(equal, dy);
          expect(neighborSpy.passedArguments(3)).to(equal, visitor);
        }
        function returnThese() {
          var outerArguments;
          outerArguments = arguments;
          return function(){ return outerArguments; };
        };
        it("does not tell a sticky that was already visited to drag", function(){
          var stickyNeighborToBothSpy, stickyNeighborToFirstSpy, stickyNeighborToSecondSpy, movingVisitor;

          stickyNeighborToBothSpy = Spies.v2.spyOn({id: 3}, "youAreBeingDragged");
          
          stickyNeighborToFirstSpy = Spies.v2.spyOn({id: 1}, "youAreBeingDragged");
          stickyNeighborToSecondSpy = Spies.v2.spyOn({id: 2}, "youAreBeingDragged");

          var firstSticky = {};
          firstSticky.getNeighbors = returnThese(stickyNeighborToFirstSpy.object, stickyNeighborToBothSpy.object);

          var secondSticky = {};
          secondSticky.getNeighbors = returnThese(stickyNeighborToSecondSpy.object, stickyNeighborToBothSpy.object);

          movingVisitor = createMovingVisitor();

          movingVisitor.moveMyNeighbors(10,100, firstSticky);
          stickyNeighborToBothSpy.resetSpy();
          movingVisitor.moveMyNeighbors(10,100, secondSticky);

          expectDragged(stickyNeighborToFirstSpy, 10, 100, movingVisitor);
          expectDragged(stickyNeighborToSecondSpy, 10, 100, movingVisitor);

          expect(stickyNeighborToBothSpy.wasCalled()).to(equal, false);
        });
        it("tells the sticky's neighbor to drag", function(){
          var neighbor1Spy, neighbor2Spy, movingVisitor, sticky;

          movingVisitor = createMovingVisitor();
          sticky = {};

          neighbor1Spy = Spies.v2.spyOn({id: 1}, "youAreBeingDragged");
          neighbor2Spy = Spies.v2.spyOn({id: 2}, "youAreBeingDragged");

          sticky.getNeighbors = returnThese(neighbor1Spy.object, neighbor2Spy.object);

          movingVisitor.moveMyNeighbors(10,100, sticky);

          expectDragged(neighbor1Spy, 10, 100, movingVisitor);
          expectDragged(neighbor2Spy, 10, 100, movingVisitor);
        });
      });
    });
  });
});
