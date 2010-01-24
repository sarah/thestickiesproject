require('spec_helper.js', {onload: function(){
    rails_require('tsp');
    rails_require('tsp.lookups');
}});

var Helpers = {};

Helpers.editable_div = function(){
  return $('.sticky .editable');
};

Helpers.sticky_div = function(){
  return $('.sticky');
};

Helpers.get_surface_selector = function(){
  return '#surface';
};


Helpers.get_stickies_selector = function(){
  return "#stickies";
}

Helpers.stickies_div = function() {
  return $(Helpers.get_stickies_selector());
};

var get_editable_div = Helpers.editable_div;
var get_sticky_div = Helpers.sticky_div;
var get_stickies_div = Helpers.stickies_div;
var get_stickies_selector = Helpers.get_stickies_selector;
var get_surface_selector = Helpers.get_surface_selector;

Screw.Unit(function(){
  var tsp;
  before(function(){
    tsp  = TSP.get();
    });

  describe("tsp.lookups", function(){

    describe("sticky lookups", function() {
      var sticky_div;
      var editable_div;
      before(function(){
        sticky_div = $('.sticky');
        editable_div = $('.sticky .body .editable');
      });

      describe("#sticky_element_from", function(){
        it("returns sticky element when passed child element", function(){
          var div = tsp.lookups.sticky_element_from(editable_div);
          expect_true(div.hasClass('sticky'));
        });

        it("returns sticky element when passed sticky element ", function(){
          var div = tsp.lookups.sticky_element_from(sticky_div);
          expect_true(div.hasClass('sticky'));
        });
      });
      
      describe("sticky object returned from #sticky_from", function(){
          before(function(){
            sticky = tsp.lookups.sticky_from(editable_div);
          });
          describe("#destroy", function(){
            before(function(){
              sticky_to_destroy = $("<div id='to_remove' class='sticky' data-delete-url='/delete_me'></div>");
              $(get_surface_selector()).append(sticky_to_destroy);
              sticky = tsp.lookups.sticky_from(sticky_to_destroy);
              });

            it("posts to delete-url", function(){
              verify_argument_to_jquery_post_when_calling(sticky, 'destroy',null, function(args){
                  expect(args[0]).to(equal, "/delete_me");
                });
            });

            it("specifies method delete", function(){
              verify_argument_to_jquery_post_when_calling(sticky,'destroy',null, function(args){
                  expect(args[1]["_method"]).to(equal, "delete");
                });
            });

            it("removes the sticky element", function(){
              var old$ = $;
              $ = {};
              stub($, 'post');
              stub($, 'extend');

              sticky.destroy();

              $ = old$;
              expect($(get_surface_selector())).to_not(contain_selector, '#to_remove');
            });
          });

          describe("#update_content", function(){
            it("posts the update to update-url", function(){
              sticky_div.attr('data-update-url', '/dummy_url');
              verify_argument_to_jquery_post_when_calling(sticky,'update_content',"hello", function(args){
                  expect(args[0]).to(equal, "/dummy_url");
                });
            });
            
            it("specifies the method as put", function(){
            sticky_div.attr('data-update-url', '/dummy_url');
              verify_argument_to_jquery_post_when_calling(sticky,'update_content',"hello", function(args){
                expect(args[1]["_method"]).to(equal, "put");
              });
            });

            it("posts the value passed in", function(){
              verify_argument_to_jquery_post_when_calling(sticky,'update_content',"hello", function(args){
                  expect(args[1]["sticky[content]"]).to(equal, "hello");
                });
            });
          });

          describe("#update_position", function(){
             it("posts the update to update-url", function(){
              sticky_div.attr('data-update-url', '/dummy_url');
              verify_argument_to_jquery_post_when_calling(sticky,'update_position', {left:10, top:20}, function(args){
                  expect(args[0]).to(equal, "/dummy_url");
                });
             });

             it("specifies the method as put", function(){
              sticky_div.attr('data-update-url', '/dummy_url');
              verify_argument_to_jquery_post_when_calling(sticky,'update_position', {left:10, top:20}, function(args){
                  expect(args[1]["_method"]).to(equal, "put");
                });
             });

             it("posts the left and top values", function(){
              verify_argument_to_jquery_post_when_calling(sticky,'update_position', {left:10, top:20}, function(args){
                  expect(args[1]["sticky[left]"]).to(equal, 10);
                  expect(args[1]["sticky[top]"]).to(equal, 20);
                });
             });
          });
        });
    });
  });
});
