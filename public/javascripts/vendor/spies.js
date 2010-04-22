function spyOn(obj, functionName) {
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
  };

  return obj;
}
