require('spec_helper.js', {onload: function(){
    rails_require('vendor/spies');
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
    function createSpy(id, functionName) {
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
        function expectNeighborsMoved_spies(visitor, dx, dy, sticky){
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
              movingVisitor = spyOn({}, "moveMyNeighbors");

              var sticky = createSticky(functionThatReturns(movingVisitor));

              sticky.youAreBeingDragged(10, 100);
              expectNeighborsMoved_spies(movingVisitor, 10, 100, sticky);
            });
          });

          describe("existing MovingVisitor given", function() {
            it("tells that MoveVisitor to move neighbors", function(){
              var movingVisitor;
              movingVisitor = spyOn({}, "moveMyNeighbors");

              var sticky = createSticky($.noop);

              sticky.youAreBeingDragged(10, 100, movingVisitor);

              expectNeighborsMoved_spies(movingVisitor, 10, 100, sticky);
            });
          });
        });
      });
      describe("#getMyNeighbors", function() {
        it("returns the neighbors from the 'neighbor lookup' function", function() {
          var neighbors = {foo: 1};
          var spy = spyOn({}, "getMyNeighbors", neighbors);

          var sticky = createSticky($.noop, spy.getMyNeighbors);

          var resulting_neighbors = sticky.getNeighbors();

          expect(resulting_neighbors).to(equal, neighbors);
          expect(spy.passedArguments(1)).to(equal, sticky);
        });
      });
    });
    describe("MovingVisitor", function() {
      describe("#moveMyNeighbors", function() {
          function createNeighbor(id) {
            return createSpy(id, "youAreBeingDragged");
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
