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
        function expectNeighborsMoved(visitor, dx, dy, sticky){
          expect(visitor.wasCalled("moveMyNeighbors")).to(equal, true);
          expect(visitor.passedArguments(1)).to(equal, dx);
          expect(visitor.passedArguments(2)).to(equal, dy);
          expect(visitor.passedArguments(3)).to(equal, sticky);
        }
        function functionThatReturns(argument){ 
          return function() { return argument; };
        }
        describe("using spies.js", function() {
          describe("no MovingVisitor given", function() {
            it("tells a new MoveVisitor to move neighbors", function(){
              var movingVisitor;
              movingVisitor = Spies.spyOn({}, "moveMyNeighbors");

              var sticky = createSticky(functionThatReturns(movingVisitor));

              sticky.youAreBeingDragged(10, 100);
              expectNeighborsMoved(movingVisitor, 10, 100, sticky);
            });
          });

          describe("existing MovingVisitor given", function() {
            it("tells that MovingVisitor to move neighbors", function(){
              var movingVisitor;
              movingVisitor = Spies.spyOn({}, "moveMyNeighbors");

              var sticky = createSticky($.noop);
              sticky.youAreBeingDragged(10, 100, movingVisitor);

              expectNeighborsMoved(movingVisitor, 10, 100, sticky);
            });
          });
        });
      });
      describe("#getMyNeighbors", function() {
        it("returns the neighbors from the 'neighbor lookup' function", function() {
          var neighbors = {foo: 1};
          var spy = Spies.spyOn({}, "getMyNeighbors", neighbors);

          var sticky = createSticky($.noop, spy.getMyNeighbors);
          var resulting_neighbors = sticky.getNeighbors();

          expect(resulting_neighbors).to(equal, neighbors);
          expect(spy.passedArguments(1)).to(equal, sticky);
        });
      });
    });
    describe("MovingVisitor", function() {
      describe("using spies.js", function() {
        describe("#moveMyNeighbors", function() {
          function expectDragged(neighbor, dx, dy, visitor) {
            expect(neighbor.wasCalled("youAreBeingDragged")).to(equal, true);
            expect(neighbor.passedArguments(1)).to(equal, dx);
            expect(neighbor.passedArguments(2)).to(equal, dy);
            expect(neighbor.passedArguments(3)).to(equal, visitor);
          }
          function returnThese() {
            var outerArguments;
            outerArguments = arguments;
            return function(){ return outerArguments; };
          };
          it("does not tell a sticky that was already visited to drag", function(){
            var movingVisitor = createMovingVisitor();

            var stickyNeighborToBoth, stickyNeighborToFirst,
                stickyNeighborToSecond;
            stickyNeighborToBoth = Spies.spyOn({id: 3}, "youAreBeingDragged");
            
            stickyNeighborToFirst = Spies.spyOn({id: 1}, "youAreBeingDragged");
            stickyNeighborToSecond = Spies.spyOn({id: 2}, "youAreBeingDragged");

            var firstSticky = {};
            firstSticky.getNeighbors = returnThese(stickyNeighborToFirst, stickyNeighborToBoth);

            var secondSticky = {};
            secondSticky.getNeighbors = returnThese(stickyNeighborToSecond, stickyNeighborToBoth);


            movingVisitor.moveMyNeighbors(10,100, firstSticky);
            stickyNeighborToBoth.resetSpy();
            movingVisitor.moveMyNeighbors(10,100, secondSticky);

            expectDragged(stickyNeighborToFirst, 10, 100, movingVisitor);
            expectDragged(stickyNeighborToSecond, 10, 100, movingVisitor);
            expect(stickyNeighborToBoth.wasCalled("youAreBeingDragged")).to(equal, false);
          });
          it("tells the sticky's neighbor to drag", function(){
            var movingVisitor = createMovingVisitor();

            var sticky = {};

            var neighborOne = Spies.spyOn({id: 1}, "youAreBeingDragged");
            var neighborTwo = Spies.spyOn({id: 2}, "youAreBeingDragged");

            sticky.getNeighbors = returnThese(neighborOne, neighborTwo);

            movingVisitor.moveMyNeighbors(10,100, sticky);

            expectDragged(neighborOne, 10, 100, movingVisitor);
            expectDragged(neighborTwo, 10, 100, movingVisitor);
          });
        });
      });
    });
  });
});
