require("spec_helper.js");

function spyOn(obj, functionName) {
  obj.wasCalled = function() { 
    return this.called;
  };

  obj.called = false;

  var originalFunction = obj[functionName];
  obj.reset = function() {
    this[functionName] = originalFunction;
  };

  obj[functionName] = function() {
    this.called = true;
  };

  return obj;
}
Screw.Unit(function(){
  describe("#spyOn", function(){
    describe("single method", function() {
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

      it("can reset to restore function", function() {
          var obj, originalCalled;
          originalCalled = false;
          obj = { foo: function() { originalCalled = true; } };

          obj = spyOn(obj, "foo");

          obj.reset();

          obj.foo();

          expect(originalCalled).to(equal, true);
      });
    });
  });
});
