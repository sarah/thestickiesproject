require('spec_helper.js', {onload: function(){
    rails_require('stickies');
}});

Screw.Unit(function(){

  describe("#sticky_update_url_for", function(){

    it("can get the update url", function(){
      var sticky_div = $("#sticky_23");
      sticky_div.attr('data-update-url', "/stickies/25");
      expect(sticky_update_url_for(sticky_div)).to(equal, "/stickies/25");
    });
  });

  describe("#parent_sticky", function(){
    it("returns the sticky_div for the editable", function(){
      var sticky_editable_div = $("#sticky_23 .editable");
      var sticky_div = parent_sticky(sticky_editable_div);
      expect(sticky_div.attr('id')).to(equal, 'sticky_23');
    });

    it("returns the sticky_div for the delete_sticky_link", function(){
      var sticky_delete_link = $("#sticky_23 .delete_sticky_link" );
      var sticky_div = parent_sticky(sticky_delete_link);
      expect(sticky_div.attr("id")).to(equal, 'sticky_23');
    });
  });

  describe("getting information from the jquery ui object", function(){
        
    it("can get the position", function(){
      var jquery_ui_object = {"helper":{"0":{"jQuery1262233537241":3},"length":1,"context":{"jQuery1262233537241":3}},"position":{"top":6,"left":246},"absolutePosition":{"top":32.899993896484375,"left":254},"offset":{"top":32.899993896484375,"left":254}};

      var position = get_position_from_ui_object(jquery_ui_object);
      expect(position.left).to(equal, 254);
      expect(position.top).to(equal, 33);
    });
  });

  describe("#old_update_sticky_text", function(){
    
    before(function(){
      this.sticky_update_url_for = function(x) { return null; }
      this.parent_sticky = function(x) { return null; }
      this.update_sticky = function(x) { return null; }
    });

    it("returns the value passed in", function(){
      var value = old_update_sticky_text("foo", null);
      expect(value).to(equal, "foo");
    });

    it("calls #parent_sticky", function(){
      expect_called(this, 'parent_sticky', function(){
        old_update_sticky_text("foo", null);
      });
    });

    it("calls #sticky_update_url_for", function(){
      expect_called(this, 'sticky_update_url_for', function(){
        old_update_sticky_text("foo", null);
      });
    });

    it("calls #update_sticky", function(){
      expect_called(this, 'update_sticky', function(){
        old_update_sticky_text("foo", null);
      });
    });
  });


});

