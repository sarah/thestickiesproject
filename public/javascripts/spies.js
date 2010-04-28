/*global $*/
var Spies;
if(Spies) {
  throw "The Spies namespace has already been defined by a previously loaded library";
}
Spies = {};
Spies.stub = (function() {
  var originalFunctionsPerObject;
  originalFunctionsPerObject = {};

  return function(obj, functionName) {
    var returnValue;
    returnValue = arguments[2];

    if(typeof originalFunctionsPerObject[obj] === 'undefined') {
      originalFunctionsPerObject[obj] = {};
    }

    originalFunctionsPerObject[obj][functionName] = obj[functionName];

    obj[functionName] = function() { return returnValue; };

    obj.removeStub = function(functionName) { obj[functionName] = originalFunctionsPerObject[obj][functionName]; };
    return obj;
  };
}());

Spies.spyOn = (function() {
  function createSpyBehaviorsFor(functionName, originalFunction, returnValue) {
    var functionWasCalled, passedArguments, spyBehavior;

    function initialize() {
      functionWasCalled = false;
      passedArguments = [];
    }

    spyBehavior = {
      wasCalled: function() { return functionWasCalled; },
      passedArguments: function(index) { return passedArguments[index-1]; },
      countOfPassedArguments: function() { return passedArguments.length; },
      stopSpying: function() { this[functionName] = originalFunction; },
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

    $.extend(objectToSpyOn, createSpyBehaviorsFor(functionName, originalFunction, returnValue));

    return objectToSpyOn;
  };
}());
