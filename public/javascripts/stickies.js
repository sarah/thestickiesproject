function update_sticky_text(value, settings) {
  console.log("value " + value + " settings " + settings + " this " + this);
  console.log("url " + url );
  var stickie = parent_sticky(this);
  var url = sticky_update_url_for(stickie);
  update_sticky(url, value);
  return value;
}

function update_sticky(url, value){
  $.post(url, {"sticky[content]" : value, '_method' : 'put', authenticity_token : AUTH_TOKEN}, null, "json");
}

function hookup_sticky_editing(){
  $('.sticky .editable').editable(update_sticky_text, { type : 'textarea', onblur : 'submit', event : "dblclick" });
}

function sticky_update_url_for(sticky_div){
  return $(sticky_div).attr('data-update-url');
}

function parent_sticky(sticky_child){
  return $(sticky_child).parent(".sticky");
}

$(document).ready(hookup_sticky_editing);
