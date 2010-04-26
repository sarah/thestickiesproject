require("spec_helper.js");

Screw.Unit(function(){

  describe("#stub", function(){
    describe("single method", function() {
      var obj;
      before(function() {
        obj = { wasCalled:false, foo: function(){ this.wasCalled = true; } };
      });
      it("prevents the original function from being called", function() {
        Spies.stub(obj, "foo");

        obj.foo();

        expect(obj.wasCalled).to(be_false);
      });
      
      it("can be removed to allow the original function to be called again", function() {
        Spies.stub(obj, "foo");

        obj.removeStub("foo");
      
        obj.foo();
        expect(obj.wasCalled).to(be_true);
      });
    });
  });

  describe("#spyOn", function(){
    var obj;

    before(function() {
      obj = { foo: function() {} };
    });
    describe("single method", function() {
      it("keeps track of the arguments passed", function() {
        obj = Spies.spyOn(obj, "foo");

        obj.foo("argument1", "argument2");

        expect(obj.passedArguments(1)).to(equal, "argument1");
        expect(obj.passedArguments(2)).to(equal, "argument2");
      });

      it("keeps a count of how many arguments passed", function() {
        obj = Spies.spyOn(obj, "foo");

        obj.foo("argument1", "argument2");
        
        expect(obj.countOfPassedArguments()).to(equal, 2);
      });

      it("returns the desired value", function() {
        var returnValue;

        obj = Spies.spyOn(obj, "foo", "returnValue");

        returnValue = obj.foo();

        expect(returnValue).to(equal, "returnValue");

      });

      it("tells if method was not called", function() {
        obj = Spies.spyOn(obj, "foo");

        expect(obj.wasCalled("foo")).to(be_false);
      });

      it("tells if method was called", function() {
        obj = Spies.spyOn(obj, "foo");

        obj.foo();

        expect(obj.wasCalled("foo")).to(be_true);
      });

      it("can stopSpying to restore function", function() {
          var originalCalled;
          originalCalled = false;

          obj.foo = function() { originalCalled = true; };

          obj = Spies.spyOn(obj, "foo");

          obj.stopSpying();

          obj.foo();

          expect(originalCalled).to(be_true);
      });

      describe("can resetSpy to forget previous interactions", function() {
        it("resets to not having been called", function() {
            obj = Spies.spyOn(obj, "foo");

            obj.foo();

            obj.resetSpy();

            expect(obj.wasCalled()).to(be_false);
        });

        it("resets the passedArguments to empty", function() {
            obj = Spies.spyOn(obj, "foo");

            obj.foo("1", "2", "3");

            obj.resetSpy();

            expect(obj.countOfPassedArguments()).to(equal, 0);
        });
      });
    });
  });
});
