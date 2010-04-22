require("spec_helper.js", {onload: function() {
   rails_require("vendor/spies"); 
}});

function noop() { }

Screw.Unit(function(){
  describe("#spyOn", function(){
    describe("single method", function() {
      it("keeps track of the arguments passed", function() {
        var obj;

        obj = { foo: noop };

        obj = Spies.spyOn(obj, "foo");

        obj.foo("argument1", "argument2");

        expect(obj.passedArguments(1)).to(equal, "argument1");
        expect(obj.passedArguments(2)).to(equal, "argument2");
      });

      it("keeps a count of how many arguments passed", function() {
        var obj;

        obj = { foo: noop };

        obj = Spies.spyOn(obj, "foo");

        obj.foo("argument1", "argument2");

        expect(obj.countOfPassedArguments()).to(equal, 2);
      });

      it("returns the desired value", function() {
        var obj, returnValue;
        obj = { foo: noop };

        obj = Spies.spyOn(obj, "foo", "returnValue");

        returnValue = obj.foo();

        expect(returnValue).to(equal, "returnValue");

      });

      it("tells if method was not called", function() {
        var obj;
        obj = { notCalled: noop };

        obj = Spies.spyOn(obj, "notCalled");

        expect(obj.wasCalled("notCalled")).to(equal, false);
      });

      it("tells if method was called", function() {
        var obj;
        obj = { called: noop };

        obj = Spies.spyOn(obj, "called");

        obj.called();

        expect(obj.wasCalled("wasCalled")).to(equal, true);
      });

      it("can stopSpying to restore function", function() {
          var obj, originalCalled;
          originalCalled = false;
          obj = { foo: function() { originalCalled = true; } };

          obj = Spies.spyOn(obj, "foo");

          obj.stopSpying();

          obj.foo();

          expect(originalCalled).to(equal, true);
      });

      describe("#resetSpy", function() {
        it("resets to not having been called", function() {
            var obj;

            obj = { foo: function() { } };

            obj = Spies.spyOn(obj, "foo");

            obj.foo();

            obj.resetSpy();

            expect(obj.wasCalled()).to(equal, false);
        });

        it("resets the passedArguments to empty", function() {
            var obj;

            obj = { foo: function() { } };

            obj = Spies.spyOn(obj, "foo");

            obj.foo("1", "2", "3");

            obj.resetSpy();

            expect(obj.countOfPassedArguments()).to(equal, 0);
        });
      });
    });
  });
});
