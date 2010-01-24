require('spec_helper.js', {onload: function(){
    rails_require('tsp');
    rails_require('tsp.lookups');
    rails_require('tsp.handlers');
}});

Screw.Unit(function(){
  var tsp;
  before(function(){
    tsp  = TSP.get();
  });

  var mock_sticky = function(tsp){
    var sticky = mock();
    stub(tsp.builders, 'sticky').and_return(sticky);
    return sticky;
  };


  describe("tsp.builders", function(){
    describe("#create_sticky", function(){
      it("posts to the create-sticky-url", function(){
        var url = get_stickies_div().attr('data-create-sticky-url');
        verify_argument_to_jquery_post_when_calling(tsp.builders, 'create_sticky',null, function(args){
          expect(args[0]).to(equal, url);
          });
      });
      describe("function for successful post", function(){
        it("calls place_on for new sticky", function(){
          var url = get_stickies_div().attr('data-create-sticky-url');
          verify_argument_to_jquery_post_when_calling(tsp.builders, 'create_sticky',null, function(args){
              mock_sticky(tsp).should_receive('place_on').exactly(1).with_arguments(get_stickies_selector());
              args[2]({left:10,top:15});
            });
        });
      });
    });

    describe("sticky object returned from #sticky", function(){
      var sticky;
      before(function(){
        sticky = TSP.get().builders.sticky({left: 5, top: 10, content: 'my content', update_url: '/update_me', delete_url: '/delete_me'});
      });
      after(function(){
        get_stickies_div().empty();
        });
      it("contains the properties passed in", function(){
        expect(sticky.left).to(equal, 5);
        expect(sticky.top).to(equal, 10);
        expect(sticky.content).to(equal, 'my content');
        expect(sticky.update_url).to(equal, '/update_me');
        expect(sticky.delete_url).to(equal, '/delete_me');
      });

      it("can draw the sticky in the dom", function(){
        sticky.place_on(get_stickies_selector());
        var stickies = get_stickies_div();
        expect(stickies).to(contain_selector, '.sticky');
          
        var sticky_el = stickies.find('.sticky');
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

});
