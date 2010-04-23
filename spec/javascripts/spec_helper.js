var rails_require = function(js_file) {
  require("../../public/javascripts/" + js_file + ".js");
}
Screw.Matchers['expect_true'] = function(value){
  this.expect(value).to(this.be_true);
}

rails_require("vendor/jquery.jeditable.mini");
rails_require("vendor/jquery-ui-1.7.2.custom.min");
rails_require("spies");

AUTH_TOKEN = "dummy_token";
var verify_argument_to_jquery_post_when_calling = function(binding_object, method_to_call, arg_to_method_under_test, block){
  var old_post = $.post;
  var delivered_args;
  $.post = function() {
    delivered_args = arguments;
  };
  binding_object[method_to_call](arg_to_method_under_test);
  $.post = old_post;
  block(delivered_args);
};

function verify_argument_to_jquery_post_when_calling_spies(binding_object, method_to_call, arg_to_method_under_test, block){
  var jquerySpy;
  jquerySpy = Spies.spyOn($, "post");
  try {
    binding_object[method_to_call](arg_to_method_under_test);
  } finally {
    jquerySpy.stopSpying();
  }
  block(jquerySpy);
};
require('helpers.js');
