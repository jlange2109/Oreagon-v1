/* (c) Copyright 2017-present, DirectProfile */
function openListDialog() {
    document.getElementById("dropdownList").classList.toggle("show");
}

function openListDialogSecond() {
    document.getElementById("dropdownListSecond").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.list-button')) {

    var dropdowns = document.getElementsByClassName("list-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  if(!event.target.matches('.list-button-blue')) {
    var dropdowns = document.getElementsByClassName("list-content-blue");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
