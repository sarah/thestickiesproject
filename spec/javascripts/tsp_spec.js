require('spec_helper.js', {onload: function(){
    rails_require('tsp');
}});

var Helpers = {};

Helpers.editable_div = function(){
  return $('.sticky .editable');
};

Helpers.sticky_div = function(){
  return $('.sticky');
};

Helpers.get_stage_selector = function(){
  return '#stage';
};

var get_editable_div = Helpers.editable_div;
var get_sticky_div = Helpers.sticky_div;
var get_stage_selector = Helpers.get_stage_selector;


Screw.Unit(function(){
  var mock_sticky = function(tsp){
    var sticky = mock();
    stub(tsp.lookups, 'sticky_from').and_return(sticky);
    stub(sticky, 'update_content');
    return sticky;
  };

  var tsp;
  before(function(){
    tsp  = TSP.get();
    });

  describe("tsp.handlers", function(){

    describe("#destroy_sticky", function(){

      it("calls destroy on sticky", function(){
        var delete_div = {};
        mock_sticky(tsp).should_receive('destroy').exactly(1);
        tsp.handlers.destroy_sticky.apply(delete_div, []);
      });
    });
    describe("#update_sticky_position", function(){
      it("calls update_position on sticky", function(){
        var ui_obj = { position : {
                      left : 15, top: 100 },
                      helper : get_sticky_div()};
        var event_obj = 'unused';

        mock_sticky(tsp).should_receive('update_position').exactly(1).with_arguments({left : 15, top : 100});
        tsp.handlers.update_sticky_position(event_obj, ui_obj);
      });
    });

    describe("#update_sticky_text", function(){
      var sticky;
      before(function(){
        sticky = mock_sticky(tsp);
        });
      it("returns the value passed in", function(){
        var value = tsp.handlers.update_sticky_text.apply(get_editable_div(), ['new text', null]);
        expect(value).to(equal, "new text");
      });

      it("updates the sticky value with the passed value", function(){
        sticky.should_receive('update_content').with_arguments('new content').exactly(1);

        tsp.handlers.update_sticky_text.apply(get_editable_div(), ['new content', null]);
      });
    });

    describe("#update_surface_name", function(){
      var mock_surface = function(tsp){
      var surface = mock();
      stub(tsp.lookups, 'current_surface').and_return(surface);
      stub(surface, 'update_name');
      return surface;
      };

      var surface;
      before(function(){
        surface = mock_surface(tsp);
        });
      it("returns the value passed in", function(){
        var value = tsp.handlers.update_surface_name.apply(get_editable_div(), ['new name', null]);
        expect(value).to(equal, "new name");
      });

      it("updates the surface value with the passed value", function(){
        surface.should_receive('update_name').with_arguments('this name').exactly(1);

        tsp.handlers.update_surface_name.apply(get_editable_div(), ['this name', null]);
      });
    });
  });

  describe("tsp.builders", function(){
    describe("sticky object returned from #sticky", function(){
      var sticky;
      before(function(){
        sticky = TSP.get().builders.sticky({left: 5, top: 10, content: 'my content', update_url: '/update_me', delete_url: '/delete_me'});
      });
      it("contains the properties passed in", function(){
        expect(sticky.left).to(equal, 5);
        expect(sticky.top).to(equal, 10);
        expect(sticky.content).to(equal, 'my content');
        expect(sticky.update_url).to(equal, '/update_me');
        expect(sticky.delete_url).to(equal, '/delete_me');
      });

      it("can draw the sticky in the dom", function(){
        sticky.place_on(get_stage_selector());
        var stage = $(get_stage_selector());

          expect(stage).to(contain_selector, '.sticky');
          var sticky_el = $(get_stage_selector() + ' .sticky');
        $(['.header','.header .delete_link',  
          '.body', 
          '.body .editable', 
          '.footer']).each(function(){
          expect(sticky_el).to(contain_selector, this.toString());
        });

        expect(sticky_el.attr('data-delete-url')).to(equal, '/delete_me');
        expect(sticky_el.attr('data-update-url')).to(equal, '/update_me');
        expect(sticky_el.find(".body .editable").text()).to(equal, 'my content');
      });
    });
  });

  describe("tsp.lookups", function(){
    describe("surface lookups", function() {
      describe("object returned from #current_surface", function() {
        describe("#update_name", function() {
          it("puts the new name to the data-surface-update-name-url", function() {
            var stage_element = $(get_stage_selector());
            var url = stage_element.attr('data-surface-update-name-url');
            var surface = tsp.lookups.current_surface();

            verify_argument_to_jquery_post_when_calling(surface.update_name,[name], function(args){
                expect(args[0]).to(equal, url);
                expect(args[1]["surface[name]"]).to(equal, name);
              });
          });
        });
      });
    });

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
              $(get_stage_selector()).append(sticky_to_destroy);
              sticky = tsp.lookups.sticky_from(sticky_to_destroy);
              });

            it("posts to delete-url", function(){
              verify_argument_to_jquery_post_when_calling(sticky.destroy,null, function(args){
                  expect(args[0]).to(equal, "/delete_me");
                });
            });

            it("removes the sticky element", function(){
              var old$ = $;
              $ = {};
              stub($, 'post');

              sticky.destroy();

              $ = old$;
              expect($(get_stage_selector())).to_not(contain_selector, '#to_remove');
            });
          });

          describe("#update_content", function(){
            it("posts the update to update-url", function(){
              sticky_div.attr('data-update-url', '/dummy_url');
              verify_argument_to_jquery_post_when_calling(sticky.update_content,"hello", function(args){
                  expect(args[0]).to(equal, "/dummy_url");
                });
            });
            
            it("posts the value passed in", function(){
              verify_argument_to_jquery_post_when_calling(sticky.update_content,"hello", function(args){
                  expect(args[1]["sticky[content]"]).to(equal, "hello");
                });
            });
          });

          describe("#update_position", function(){
             it("posts the update to update-url", function(){
              sticky_div.attr('data-update-url', '/dummy_url');
              verify_argument_to_jquery_post_when_calling(sticky.update_position, {left:10, top:20}, function(args){
                  expect(args[0]).to(equal, "/dummy_url");
                });
             });

             it("posts the left and top values", function(){
              verify_argument_to_jquery_post_when_calling(sticky.update_position, {left:10, top:20}, function(args){
                  expect(args[1]["sticky[left]"]).to(equal, 10);
                  expect(args[1]["sticky[top]"]).to(equal, 20);
                });
             });
          });
        });
    });
  });
});
