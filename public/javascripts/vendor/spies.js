function spyOn(obj, functionName) {
  var returnValue = arguments[2];

  obj.wasCalled = function() { 
    return this.called;
  };

  obj.called = false;

  var originalFunction = obj[functionName];
  obj.reset = function() {
    this[functionName] = originalFunction;
  };

  obj[functionName] = function() {
    this.called = true;
    return returnValue;
  };

  return obj;
}
