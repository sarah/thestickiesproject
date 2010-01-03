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

var get_editable_div = Helpers.editable_div;
var get_sticky_div = Helpers.sticky_div;


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
  });

  describe("tsp.lookups", function(){
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
