/* (c) Copyright 2017-present, DirectProfile */

function createDialog(title, text, cancel_button, button, button_href) {
  if(typeof variable == 'undefined') {
    document.write('<div class="dp_dialog_window" id="dialog" style="display:none;"><div class="dp_dialog_title">' + title +'</div><div class="dp_dialog_message">' + text +'</div><div class="dp_dialog_container"><a onclick="cancelDialog()" class="dp_dialog_button">' + cancel_button + '</a></div></div>');
  } else {
    document.write('<div class="dp_dialog_window" id="dialog" style="display:none;"><div class="dp_dialog_title">' + title +'</div><div class="dp_dialog_message">' + text +'</div><div class="dp_dialog_container"><a href="'+ button_href +'" class="dp_dialog_button">' + button +'</a><a onclick="cancelDialog()" class="dp_dialog_button">' + cancel_button + '</a></div></div>');
  }
  document.getElementById('dialog').style.display='block';
  document.getElementsByClassName('dp').style.opacity='1.0';
}
function cancelDialog() {
  document.getElementById('dialog').style.display='none';
  document.getElementById('dp').style.opacity='1.0';
}
function createAlert(content) {
  window.alert(content);
}


