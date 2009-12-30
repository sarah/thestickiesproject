function update_sticky_text(value, settings) {
  stickie = $(this);
  console.log("value " + value + " settings " + settings + " this " + stickie.attr('data-sticky-id'));
  console.log(sticky_id_for(stickie));
  var id = stickie.attr('data-sticky-id');
  var url = "/stickies/" + id;
  console.log("url " + url );
  // jQuery.post(url, {content : value, method : 'put'});
  return value;
}

function hookup_sticky_editing(){
  $('.sticky .editable').editable(update_sticky_text, { type : 'textarea', onblur : 'submit' });
}

function sticky_update_url_for(sticky_div){
  return sticky_div.attr('data-update-url');
}

function sticky_id_for(div) {
  return div.attr('data-sticky-id');
}

$(document).ready(hookup_sticky_editing)
