require("spec_helper.js", {onload: function() {
   rails_require("vendor/spies"); 
}});

Screw.Unit(function(){
  describe("#spyOn", function(){
    describe("single method", function() {
      it("returns the desired value", function() {
        var obj, returnValue;
        obj = { foo: $.noop };

        obj = spyOn(obj, "foo", "returnValue");

        returnValue = obj.foo();

        expect(returnValue).to(equal, "returnValue");

      });

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
