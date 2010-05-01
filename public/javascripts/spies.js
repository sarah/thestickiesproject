var Spies;
if(Spies) {
  throw "The Spies namespace has already been defined by a previously loaded library";
}
Spies = {};
Spies.stub = (function() {
  return function(obj, functionName) {
    var returnValue;
    returnValue = arguments[2];

    if(!obj.spyFramework) {
      obj.spyFramework = {};
    }

    if(!obj.spyFramework.stubs) {
      obj.spyFramework.stubs = {};
    }

    obj.spyFramework.stubs[functionName] = obj[functionName];

    obj[functionName] = function() { return returnValue; };

    obj.removeStub = function(functionName) { obj[functionName] = obj.spyFramework.stubs[functionName]; };
    return obj;
  };
}());

Spies.spyOn = (function() {
  function createSpyBehaviorsFor(objectToSpyOn, functionName, originalFunction, returnValue) {
    var functionWasCalled, passedArguments, spyBehavior;

    function initialize() {
      functionWasCalled = false;
      passedArguments = [];
    }

    spyBehavior = {
      wasCalled: function() { return functionWasCalled; },
      passedArguments: function(index) { return passedArguments[index-1]; },
      countOfPassedArguments: function() { return passedArguments.length; },
      stopSpying: function() { objectToSpyOn[functionName] = originalFunction; },
      resetSpy: initialize
    };

    spyBehavior[functionName] = function() {
      functionWasCalled = true;
      passedArguments = arguments;
      return returnValue;
    };

    spyBehavior.resetSpy();

    return spyBehavior;
  }

  return function(objectToSpyOn, functionName) {
    var returnValue = arguments[2];

    var originalFunction = objectToSpyOn[functionName];

    var spyBehaviors = createSpyBehaviorsFor(objectToSpyOn, functionName, originalFunction, returnValue);

    objectToSpyOn.spyFramework = { spies: spyBehaviors };

    objectToSpyOn[functionName] = spyBehaviors[functionName];
    return objectToSpyOn;
  };
}());
