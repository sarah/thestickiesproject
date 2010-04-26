/*global $*/
var Spies = {};
Spies.stub = function(obj, functionName) {
  var originalFunction, returnValue;
  returnValue = arguments[2];
  originalFunction = obj[functionName];

  obj[functionName] = function() { return returnValue; };

  obj.removeStub = function() { this[functionName] = originalFunction; };
  return obj;
};

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
