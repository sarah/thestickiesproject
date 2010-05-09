var rails_require = function(js_file) {
  require("../../public/javascripts/" + js_file + ".js");
}
Screw.Matchers['expect_true'] = function(value){
  this.expect(value).to(this.be_true);
}

rails_require("vendor/jquery.jeditable.mini");
rails_require("vendor/jquery-ui-1.7.2.custom.min");
require("vendor/spies.js");

AUTH_TOKEN = "dummy_token";

function verify_argument_to_jquery_post_when_calling(binding_object, method_to_call, arg_to_method_under_test, block){
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
