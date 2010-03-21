require('spec_helper.js', {onload: function(){
}});
var createSticky = function(createMovingVisitor){
  var sticky = {};
  sticky.youAreBeingDragged = function(dx, dy) {
   createMovingVisitor().moveMyNeighbors(dx,dy); 
  };

  return sticky;
};
Screw.Unit(function(){
  describe("Dragging a sticky", function(){
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
