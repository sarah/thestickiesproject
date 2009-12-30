function update_sticky_text(value, settings) {
  console.log("value " + value + " settings " + settings + " this " + $(this).attr('data-sticky-id'));
  var id = $(this).attr('data-sticky-id');
  var url = "/stickies/" + id;
  console.log("url " + url );
  jQuery.post(url, {content : value, method : 'put'});
  return value;
}

function hookup_sticky_editing(){
  $('.sticky .editable').editable(update_sticky_text, { type : 'textarea', onblur : 'submit' });
}

$(document).ready(hookup_sticky_editing)
