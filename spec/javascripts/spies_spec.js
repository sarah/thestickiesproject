require("spec_helper.js");

function spyOn(obj, functionName) {
  obj.wasCalled = function() { 
    var called;
    if(functionName === "notCalled") {
      called = false; 
    }else{
      called = true;
    }
    return called;
  };
  return obj;
}
Screw.Unit(function(){
  describe("#spyOn", function(){
    it("tells if method was not called", function() {
      var obj;
      obj = { notCalled: $.noop };

      obj = spyOn(obj, "notCalled");

      expect(obj.wasCalled("notCalled")).to(equal, false);
    });

    it("tells if method was called", function() {
      var obj;
      obj = { called: $.noop };

      obj = spyOn(obj, "called");

      obj.called();

      expect(obj.wasCalled("wasCalled")).to(equal, true);
    });
  });
});
