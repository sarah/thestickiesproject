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
   var visited = [];
   movingVisitor.moveMyNeighbors = function(dx,dy,sticky){
     var toVisit = $(sticky.getNeighbors()).filter(function(){
         return visited.indexOf(this.id) === -1;
     });
     $(toVisit).each(function() {
         this.youAreBeingDragged(dx,dy, movingVisitor);
       }).each(function(){visited.push(this.id);});
   };
   return movingVisitor;
};
Screw.Unit(function(){
  describe("Dragging a sticky", function(){
    function expectCalled(object) {
      expect(object.wasFunctionCalled).to(equal, true);
      var expectedArgs = $.makeArray(arguments).splice(1);
      $(expectedArgs).each(function(index, arg){
       expect(object.passedArguments[index]).to(equal, arg);
      });
    }
    function createDouble(id, functionName) {
      var object = {
       wasFunctionCalled: false, 
       passedArguments: [],
       id: id
      };
      object[functionName] = function(){
        this.passedArguments = arguments;
        this.wasFunctionCalled = true; 
        };
      return object;
    }
    describe("Sticky", function() {
      describe("#youAreBeingDragged", function() {
        function createMovingVisitor(id) {  
          return createDouble(id, "moveMyNeighbors");
        };
        function expectNeighborsMoved(visitor, dx, dy, sticky){
          expectCalled(visitor,dx,dy,sticky);
        }
        function returnThis(argument){ 
          return function() { return argument; };
        }
        describe("no MovingVisitor given", function() {
          it("tells a new MoveVisitor to move neighbors", function(){
            var movingVisitor = createMovingVisitor();
            var sticky = createSticky(returnThis(movingVisitor));

            sticky.youAreBeingDragged(10, 100);

            expectNeighborsMoved(movingVisitor, 10, 100, sticky);
          });
        });
        describe("existing MovingVisitor given", function() {
          it("tells that MoveVisitor to move neighbors", function(){
            var movingVisitor = createMovingVisitor();
            var sticky = createSticky($.noop);

            sticky.youAreBeingDragged(10, 100, movingVisitor);

            expectNeighborsMoved(movingVisitor, 10, 100, sticky);
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
          function createNeighbor(id) {
            return createDouble(id, "youAreBeingDragged");
          };
          function expectDragged(neighbor,dx,dy, visitor){
            if(arguments.size > 1) {
              expectCalled(neighbor, dx, dy, visitor);
            }else {
              expectCalled(neighbor);
            }
          }
          function expectNotDragged(neighbor){
            expect(neighbor.wasFunctionCalled).to(equal, false);
          }
          function returnThese() {
            var outerArguments;
            outerArguments = arguments;
            return function(){ return outerArguments; };
          };
        it("does not tell a sticky that was already visited to drag", function(){
          var movingVisitor = createMovingVisitor();

          var stickyNeighborToBoth = createNeighbor(1); 
          var stickyNeighborToFirst =  createNeighbor(2);
          var stickyNeighborToSecond = createNeighbor(3);

          var firstSticky = {};
          firstSticky.getNeighbors = returnThese(stickyNeighborToFirst, stickyNeighborToBoth);

          var secondSticky = {};
          secondSticky.getNeighbors = returnThese(stickyNeighborToSecond, stickyNeighborToBoth);

          movingVisitor.moveMyNeighbors(10,100, firstSticky);
          stickyNeighborToBoth.wasFunctionCalled = false;
          movingVisitor.moveMyNeighbors(10,100, secondSticky);

          expectNotDragged(stickyNeighborToBoth);
          expectDragged(stickyNeighborToFirst);
          expectDragged(stickyNeighborToSecond);
        });

        it("tells the sticky's neighbor to drag", function(){
          var movingVisitor = createMovingVisitor();

          var sticky = {};

          var neighborOne = createNeighbor(1);
          var neighborTwo = createNeighbor(2);
          sticky.getNeighbors = returnThese(neighborOne, neighborTwo);

          movingVisitor.moveMyNeighbors(10,100, sticky);


          expectDragged(neighborOne, 10, 100, movingVisitor);
          expectDragged(neighborTwo, 10, 100, movingVisitor);

        });
      });
    });
  });
});
