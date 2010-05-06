var Spies;
if(Spies) {
  throw "The Spies namespace has already been defined by a previously loaded library";
}
Spies = {};
Spies.v2 = {};

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

Spies.v2.stub = function(obj, functionName, returnValue){
  var spy, originalFunction;
  originalFunction = obj[functionName];

  obj[functionName] = function(){ return returnValue; };

  spy = {};
  spy.removeStub = function(){
    obj[functionName] = originalFunction;
  };

  return spy;
};

Spies.v2.spyOn = function(obj, functionName, returnValue) {
  var wasCalled, capturedArgs, originalFunction;
  function initialize() {
    wasCalled = false;
    capturedArgs = [];
  }

  originalFunction = obj[functionName];

  function spyFunction() { 
    capturedArgs = arguments;
    wasCalled = true;
    return returnValue;
  };

  obj[functionName] = spyFunction;

  function resetOriginalFunction() {
    obj[functionName] = originalFunction; 
  }

  initialize();
  return {
    wasCalled: function() {return wasCalled;},
    passedArguments: function(index) {
      if(arguments.length === 0) {
        return capturedArgs;
      } else {
        return capturedArgs[index - 1];
      }
    },
    stopSpying: resetOriginalFunction,
    resetSpy: initialize,
    object: obj,
    spyFunction: spyFunction
  };
};

Spies.spyOn = (function() {
  function createSpyBehaviorsFor(objectToSpyOn, functionName, originalFunction, returnValue) {
    var functionWasCalled, passedArguments, spyBehavior;

    function initialize() {
      functionWasCalled = false;
      passedArguments = [];
    }

    spyBehavior = {
      wasCalled: function() { return functionWasCalled; },
      passedArguments: function(index) { 
        if(arguments.length > 0) { return passedArguments[index-1]; }else{ return passedArguments; }
      },
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
