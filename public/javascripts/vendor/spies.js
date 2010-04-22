var spyOn = (function() {
  function createSpyBehaviorsFor(functionName, originalFunction, returnValue) {
    var functionWasCalled, passedArguments;
    functionWasCalled = false;
    passedArguments = [];
    
    spyBehavior = {
      wasCalled: function() { return functionWasCalled; },
      passedArguments: function(index) { return passedArguments[index]; },
      stopSpying: function() { this[functionName] = originalFunction; }
    };

    spyBehavior[functionName] = function() {
      functionWasCalled = true;
      passedArguments = arguments;
      return returnValue;
    };
    return spyBehavior;
  }

  return function(objectToSpyOn, functionName) {
    var returnValue = arguments[2];

    var originalFunction = objectToSpyOn[functionName];

    $.extend(objectToSpyOn, createSpyBehaviorsFor(functionName, originalFunction, returnValue));

    return objectToSpyOn;
  };
}());
