var rails_require = function(js_file) {
  require("../../public/javascripts/" + js_file + ".js");
}
Screw.Matchers['expect_true'] = function(value){
  this.expect(value).to(this.be_true);
}
Screw.Matchers['expect_called'] = function(obj, func_name, block){
  var got_called = false;
  obj[func_name] = function(x) { got_called = true; }
  block();
  this.expect_true(got_called);
};

var stub_call = function(obj, func, ret){
  var mock = Smoke.Mock(obj);
  mock.should_receive(func).at_least(0, 'times').and_return(ret);
  return mock;
}

rails_require("jquery.jeditable.mini");
rails_require("jquery-ui-1.7.2.custom.min");
