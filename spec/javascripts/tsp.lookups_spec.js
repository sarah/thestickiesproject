require('spec_helper.js', {onload: function(){
    rails_require('tsp');
    rails_require('tsp.helpers.ajax');
    rails_require('tsp.lookups');
}});

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

      describe("#parent_sticky_dom_element_for", function(){
        it("returns sticky element when passed child element", function(){
          var div = tsp.lookups.parent_sticky_dom_element_for(editable_div);
          expect_true(div.hasClass('sticky'));
        });

        it("returns sticky element when passed sticky element ", function(){
          var div = tsp.lookups.parent_sticky_dom_element_for(sticky_div);
          expect_true(div.hasClass('sticky'));
        });
      });
      
      describe("actions returned from #actions_on", function(){
          before(function(){
            sticky = tsp.lookups.actions_on(editable_div);
          });
          describe("#destroy", function(){
            before(function(){
              sticky_to_destroy = $("<div id='to_remove' class='sticky' data-delete-url='/delete_me'></div>");
              $(get_surface_selector()).append(sticky_to_destroy);
              sticky = tsp.lookups.actions_on(sticky_to_destroy);
              });

            it("posts to delete-url", function(){
              verify_argument_to_jquery_post_when_calling(sticky, 'destroy',null, function(spy){
                  expect(spy.passedArguments(1)).to(equal, "/delete_me");
                });
            });

            it("specifies method delete", function(){
              verify_argument_to_jquery_post_when_calling(sticky,'destroy',null, function(spy){
                  expect(spy.passedArguments(2)["_method"]).to(equal, "delete");
                });
            });

            it("removes the sticky element", function(){
              var postSpy, extendSpy;
              postSpy = Spies.v2.stub($, 'post');
              extendSpy = Spies.v2.stub($, 'extend');

              try {
                sticky.destroy();
              }finally{
                postSpy.removeStub();
                extendSpy.removeStub();
              }
              expect($(get_surface_selector())).to_not(contain_selector, '#to_remove');
            });
          });

          describe("#update_content", function(){
            it("posts the update to update-url", function(){
              sticky_div.attr('data-update-url', '/dummy_url');
              verify_argument_to_jquery_post_when_calling(sticky,'update_content',"hello", function(spy){
                  expect(spy.passedArguments(1)).to(equal, "/dummy_url");
                });
            });
            
            it("specifies the method as put", function(){
            sticky_div.attr('data-update-url', '/dummy_url');
              verify_argument_to_jquery_post_when_calling(sticky,'update_content',"hello", function(spy){
                expect(spy.passedArguments(2)["_method"]).to(equal, "put");
              });
            });

            it("posts the value passed in", function(){
              verify_argument_to_jquery_post_when_calling(sticky,'update_content',"hello", function(spy){
                  expect(spy.passedArguments(2)["sticky[content]"]).to(equal, "hello");
                });
            });
          });

          describe("#update_position", function(){
             it("posts the update to update-url", function(){
              sticky_div.attr('data-update-url', '/dummy_url');
              verify_argument_to_jquery_post_when_calling(sticky,'update_position', {left:10, top:20}, function(spy){
                  expect(spy.passedArguments(1)).to(equal, "/dummy_url");
                });
             });

             it("specifies the method as put", function(){
              sticky_div.attr('data-update-url', '/dummy_url');
              verify_argument_to_jquery_post_when_calling(sticky,'update_position', {left:10, top:20}, function(spy){
                  expect(spy.passedArguments(2)["_method"]).to(equal, "put");
                });
             });

             it("posts the left and top values", function(){
              verify_argument_to_jquery_post_when_calling(sticky,'update_position', {left:10, top:20}, function(spy){
                  var data = spy.passedArguments(2);
                  expect(data["sticky[left]"]).to(equal, 10);
                  expect(data["sticky[top]"]).to(equal, 20);
                });
             });
          });
        });
    });
  });
});
