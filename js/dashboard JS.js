// JavaScript Document


// When the user clicks on the button, open the modal 
function ToggleADM() {
  var modal = document.getElementById("adddata-modal");
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function CloseADM() {
  var modal = document.getElementById("adddata-modal");
  modal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  var modal = document.getElementById("adddata-modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

function ToggleSRM() {
  var modal = document.getElementById("request-modal");
  modal.style.display = "block";
}

function newAccount(){
	document.getElementById("login-div").style.display = "none";
	document.getElementById("register-div").style.display = "block";
	document.getElementById("usName-div").style.display = "none";
	document.getElementById("email_field").value = "";
	document.getElementById("password_field").value = "";
}
function backtoLogin(){
	document.getElementById("login-div").style.display = "block";
	document.getElementById("register-div").style.display = "none";
	document.getElementById("usName-div").style.display = "none";
	document.getElementById("create_email").value = "";
	document.getElementById("create_password").value = "";
	
}
