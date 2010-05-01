require("spec_helper.js");

Screw.Unit(function(){

  describe("#stub", function(){
    describe("multiple objects", function() {
      var objFoo, fooReturn, objBar, barReturn;
      before(function() {
        objFoo = { wasFooBazCalled: false,
                   baz: function() { this.wasFooBazCalled = true; }
                };
        objBar = { wasBarBazCalled: false,
                   baz: function() { this.wasBarBazCalled = true; }
                };
      });

      it("can remove the stub on method with same name", function() {
        objFoo = Spies.stub(objFoo, "baz");
        objBar = Spies.stub(objBar, "baz");

        objFoo.removeStub("baz");

        objFoo.baz();
        objBar.baz();

        expect(objFoo.wasFooBazCalled).to(be_true);
        expect(objBar.wasBarBazCalled).to(be_false);
      });

      it("can stub method on different objects", function() {

        objFoo = Spies.stub(objFoo, "baz", "foo return");
        objBar = Spies.stub(objBar, "baz", "bar return");

        fooReturn = objFoo.baz();
        barReturn = objBar.baz();

        expect(fooReturn).to(equal, "foo return");
        expect(barReturn).to(equal, "bar return");
      });
    });

    describe("multiple method", function() {
      var obj;
      before(function() {
        obj = { wasFooCalled: false, wasBarCalled: false,
                foo: function() { this.wasFooCalled = true; },
                bar: function() { this.wasBarCalled = true; }
              };
      });
      it("can stub one method, leaving the other", function() {
        obj = Spies.stub(obj, "foo");

        obj.foo();
        obj.bar();

        expect(obj.wasFooCalled).to(be_false);
        expect(obj.wasBarCalled).to(be_true);
      });

      it("can stub both methods", function() {
        obj = Spies.stub(obj, "foo");
        obj = Spies.stub(obj, "bar");

        obj.foo();
        obj.bar();

        expect(obj.wasFooCalled).to(be_false);
        expect(obj.wasBarCalled).to(be_false);
      });

      it("can remove the stub from one method, leaving the other stubbed", function() {
          obj = Spies.stub(obj, "foo");
          obj = Spies.stub(obj, "bar");

          obj.removeStub("foo");

          obj.foo();
          obj.bar();

          expect(obj.wasFooCalled).to(be_true);
          expect(obj.wasBarCalled).to(be_false);
      });

      it("can set a separate return value for each function stubbed", function() {
          var fooReturn, barReturn;

          obj = Spies.stub(obj, "foo", "foo return");
          obj = Spies.stub(obj, "bar", "bar return");

          fooReturn = obj.foo();
          barReturn = obj.bar();

          expect(fooReturn).to(equal, "foo return");
          expect(barReturn).to(equal, "bar return");
      });
    });
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

      it("can be told to return a certain value", function() {
        var returnValue;


        Spies.stub(obj, "foo", "return value");

        returnValue = obj.foo();

        expect(returnValue).to(equal, "return value");
      });
    });
  });

  describe("#spyOn", function(){
    describe("multiple objects", function() {
      var obj1, obj2;
      before(function() {
        obj1 = Spies.spyOn({}, "foo");
        obj2 = Spies.spyOn({}, "foo");
      });
      it("keeps track of which object had method called on it", function() {

        obj1.foo();

        expect(obj1.spyFramework.spies.wasCalled("foo")).to(be_true);
        expect(obj2.spyFramework.spies.wasCalled("foo")).to(be_false);
      });

      it("keeps track of the arguments passed to each object", function() {

        obj1.foo("this was obj1");
        obj2.foo("this was obj2");

        expect(obj1.spyFramework.spies.passedArguments(1)).to(equal, "this was obj1");
        expect(obj2.spyFramework.spies.passedArguments(1)).to(equal, "this was obj2");
      });

      describe("stop spying on one object", function() { 
        it("can stop spying on one object", function() {
            var wasCalled;
            wasCalled = false;
            obj1.bar = function() { wasCalled = true; };

            obj1 = Spies.spyOn(obj1, "bar");
            obj1.spyFramework.spies.stopSpying("bar");
            
            obj1.bar();

            expect(wasCalled).to(be_true);
        });

        it("still spies on the other object", function() {
            var wasCalled2, wasCalled1;
            wasCalled1 = false;
            wasCalled2 = false;
            obj1.bar = function() { wasCalled1 = true; };
            obj2.bar = function() { wasCalled2 = true; };

            obj1 = Spies.spyOn(obj1, "bar");
            obj2 = Spies.spyOn(obj2, "bar");
            obj1.spyFramework.spies.stopSpying("bar");
            
            obj2.bar();

            expect(obj2.spyFramework.spies.wasCalled("bar")).to(be_true);

        });
      });
    });
    describe("single object", function() {
      var obj;

      before(function() {
        obj = { foo: function() {} };
      });
      it("keeps track of the arguments passed", function() {
        obj = Spies.spyOn(obj, "foo");

        obj.foo("argument1", "argument2");

        expect(obj.spyFramework.spies.passedArguments(1)).to(equal, "argument1");
        expect(obj.spyFramework.spies.passedArguments(2)).to(equal, "argument2");
      });

      it("keeps a count of how many arguments passed", function() {
        obj = Spies.spyOn(obj, "foo");

        obj.foo("argument1", "argument2");
        
        expect(obj.spyFramework.spies.countOfPassedArguments()).to(equal, 2);
      });

      it("returns the desired value", function() {
        var returnValue;

        obj = Spies.spyOn(obj, "foo", "returnValue");

        returnValue = obj.foo();

        expect(returnValue).to(equal, "returnValue");

      });

      it("tells if method was not called", function() {
        obj = Spies.spyOn(obj, "foo");

        expect(obj.spyFramework.spies.wasCalled("foo")).to(be_false);
      });

      it("tells if method was called", function() {
        obj = Spies.spyOn(obj, "foo");

        obj.foo();

        expect(obj.spyFramework.spies.wasCalled("foo")).to(be_true);
      });

      it("can stopSpying to restore function", function() {
          var originalCalled;
          originalCalled = false;

          obj.foo = function() { originalCalled = true; };

          obj = Spies.spyOn(obj, "foo");

          obj.spyFramework.spies.stopSpying();

          obj.foo();

          expect(originalCalled).to(be_true);
      });

      describe("can resetSpy to forget previous interactions", function() {
        it("resets to not having been called", function() {
            obj = Spies.spyOn(obj, "foo");

            obj.foo();

            obj.spyFramework.spies.resetSpy();

            expect(obj.spyFramework.spies.wasCalled()).to(be_false);
        });

        it("resets the passedArguments to empty", function() {
            obj = Spies.spyOn(obj, "foo");

            obj.foo("1", "2", "3");

            obj.spyFramework.spies.resetSpy();

            expect(obj.spyFramework.spies.countOfPassedArguments()).to(equal, 0);
        });
      });
    });
  });
});
