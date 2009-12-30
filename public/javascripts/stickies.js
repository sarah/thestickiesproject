function update_sticky_text(value, settings) {
  var stickie = $(this);
  console.log("value " + value + " settings " + settings + " this " ));
  var url = sticky_update_url_for(stickie);
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

$(document).ready(hookup_sticky_editing)
