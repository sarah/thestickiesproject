var spyOn = (function() {
  function createSpyBehaviorsFor(functionName, originalFunction, returnValue) {
    var called, passedArguments;
    called = false;
    passedArguments = [];
    
    obj = {
      wasCalled: function() { return called; },
      passedArguments: function(index) { return passedArguments[index]; },
      reset: function() { this[functionName] = originalFunction; }
    };

    obj[functionName] = function() {
      called = true;
      passedArguments = arguments;
      return returnValue;
    };
    return obj;
  }

  return function(obj, functionName) {
    var returnValue = arguments[2];

    var originalFunction = obj[functionName];

    $.extend(obj, createSpyBehaviorsFor(functionName, originalFunction, returnValue));

    return obj;
  };
}());
