// JavaScript Document

function myFunction() {
  var x = document.getElementById("metadata-description");
  if (x.style.display === "block") {
    x.style.display = "none";
	document.getElementById("metadata-img").style.display = "none";
	document.getElementById("btnTitle").innerHTML = "+";
  } else {
    x.style.display = "block";
	document.getElementById("metadata-img").style.display = "block";
	document.getElementById("btnTitle").innerHTML = "-";
  }
}

function myFunction1() {
  var x = document.getElementById("metadata-description1");
  if (x.style.display === "block") {
    x.style.display = "none";
	document.getElementById("metadata-img1").style.display = "none";
	document.getElementById("btnTitle1").innerHTML = "+";
  } else {
    x.style.display = "block";
	document.getElementById("metadata-img1").style.display = "block";
	document.getElementById("btnTitle1").innerHTML = "-";
  }
}

function myFunction2() {
  var x = document.getElementById("metadata-description2");
  if (x.style.display === "block") {
    x.style.display = "none";
	document.getElementById("metadata-img2").style.display = "none";
	document.getElementById("btnTitle2").innerHTML = "+";
  } else {
    x.style.display = "block";
	document.getElementById("metadata-img2").style.display = "block";
	document.getElementById("btnTitle2").innerHTML = "-";
  }
}

function myFunction3() {
  var x = document.getElementById("metadata-description3");
  if (x.style.display === "block") {
    x.style.display = "none";
	document.getElementById("metadata-img3").style.display = "none";
	document.getElementById("btnTitle3").innerHTML = "+";
  } else {
    x.style.display = "block";
	document.getElementById("metadata-img3").style.display = "block";
	document.getElementById("btnTitle3").innerHTML = "-";
  }
}

function myFunction4() {
  var x = document.getElementById("metadata-description4");
  if (x.style.display === "block") {
    x.style.display = "none";
	document.getElementById("metadata-img4").style.display = "none";
	document.getElementById("btnTitle4").innerHTML = "+";
  } else {
    x.style.display = "block";
	document.getElementById("metadata-img4").style.display = "block";
	document.getElementById("btnTitle4").innerHTML = "-";
  }
}

function myFunction5() {
  var x = document.getElementById("metadata-description5");
  if (x.style.display === "block") {
    x.style.display = "none";
	document.getElementById("metadata-img5").style.display = "none";
	document.getElementById("btnTitle5").innerHTML = "+";
  } else {
    x.style.display = "block";
	document.getElementById("metadata-img5").style.display = "block";
	document.getElementById("btnTitle5").innerHTML = "-";
  }
}




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
	var modal2 = document.getElementById("request-modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
 if (event.target === modal2) {
    modal2.style.display = "none";
  }
};

function ToggleSRM() {
  var modal = document.getElementById("request-modal");
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function CloseSRM() {
  var modal = document.getElementById("request-modal");
  modal.style.display = "none";
}

function loginCheck(){
	var userEmail = document.getElementById("email_field").value;
	var userPss = document.getElementById("password_field").value;
	
	firebase.auth().signInWithEmailAndPassword(userEmail, userPss).catch(function(error) {
		// Handle Errors here.
  		var errorCode = error.code;
		var errorMessage = error.message;
		window.alert("Error : " + errorMessage);
  		// ...
	});
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
	window.location.href = "index_dsb_user.html";
    // ...
  } else {
    // User is signed out.
    // ...
  }
});
}

function createAccount(){
	var newEmail = document.getElementById("create_email").value;
	var newPss = document.getElementById("create_password").value;
	
	firebase.auth().createUserWithEmailAndPassword(newEmail, newPss).catch(function(error) {
		// Handle Errors here.
  		var errorCode = error.code;
		var errorMessage = error.message;
		window.alert("Error : " + errorMessage);
  		// ...
	});
  	firebase.auth().onAuthStateChanged(function(user) {
  		if (user) {
    	// User is signed in.
			window.location.href = "index_dsb_user.html";
    	// ...
  		} else {
    	// User is signed out.
    	// ...
  		}
	});
}

function newAccount(){
	document.getElementById("login-div").style.display = "none";
	document.getElementById("register-div").style.display = "block";
}
function backtoLogin(){
	document.getElementById("login-div").style.display = "block";
	document.getElementById("register-div").style.display = "none";
}

function userInfoLoad(){
	var user = firebase.auth().currentUser;
	if (user) {
  	// User is signed in.
		if (user != null){
			var email_id = user.email;
			document.getElementById("userAccount").innerHTML = email_id;
		}
	} else {
  	// No user is signed in.
}
}
window.onload = function(){userInfoLoad()};

function logoutCheck(){
	firebase.auth().signOut();
	window.location.href = "index.html";

}

//get data
firebase.firestore().collection.('MetaData').get().then(snapshot =>{
	console.log(snapshot.docs);
});


