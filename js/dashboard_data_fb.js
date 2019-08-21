// JavaScript Document


//user permission

window.onload = firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    firebase.auth().onAuthStateChanged(function(user){
	if (user) {
    // User is signed in.
		document.getElementById("email_field").value = "";
		document.getElementById("password_field").value = "";
		document.getElementById("create_email").value = "";
		document.getElementById("create_password").value = "";
		
	if (user.displayName != null){
		document.getElementById("loginUser").style.display = "block";
		document.getElementById("unLogin").style.display = "none";	
		userInfoLoad();
	} else{
		document.getElementById("loginUser").style.display = "none";
		document.getElementById("unLogin").style.display = "block";
		document.getElementById("login-div").style.display = "none";
		document.getElementById("register-div").style.display = "none";
		document.getElementById("usName-div").style.display = "block";
		var email_id = user.email;
		document.getElementById("creUN").innerHTML = email_id + " has been registered at VDC successfully !<br>Now set a username and login to the platform.";
	}
	
  } else {
    // No user is signed in.
	document.getElementById("loginUser").style.display = "none";
	document.getElementById("unLogin").style.display = "block";
	document.getElementById("login-div").style.display = "block";
	document.getElementById("register-div").style.display = "none";
	document.getElementById("usName-div").style.display = "none";
  }
});
	console.log("done");
    // New sign-in will be persisted with session persistence.
  });

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
}



function setUName(){
	var user = firebase.auth().currentUser;
	var newNam = document.getElementById("create_user_name").value;
	user.updateProfile({
		
  		displayName: newNam
		
	}).then(function() {
  	// Update successful.
	document.getElementById("loginUser").style.display = "block";
	document.getElementById("unLogin").style.display = "none";
	document.getElementById("create_user_name").value = "";
	userInfoLoad();
	}).catch(function(error) {
	// An error happened.
	});
	
	
}





	

function logoutCheck(){
	firebase.auth().signOut();
}


function userInfoLoad(){
	var user = firebase.auth().currentUser;
	if (user) {
  	// User is signed in.
		if (user != null){
			var email_id = user.displayName;
			document.getElementById("userAccount").innerHTML = email_id;
			user.providerData.forEach(function (profile) {
				console.log("Sign-in provider: " + profile.providerId);
				console.log("  Provider-specific UID: " + profile.uid);
    			console.log("  Name: " + profile.displayName);
				console.log("  Email: " + profile.email);
				console.log("  Photo URL: " + profile.photoURL);
				loadMDcard();
				
				
					});
		} else {
  	// No user is signed in.
		}
	}
}
//get data
function loadMDcard(){
	
	firebase.firestore().collection("MetaData").get().then((querySnapshot) => {
		let html = "";
    	querySnapshot.forEach((doc) => {
			var metaData = doc.data();
			console.log(doc.id, " => ", metaData);
			var li = `
				<div class="metadata-card">
					<div class="collapsible">
						<img class="metaFig" src= ${"images/" + metaData.permission + ".png"} height="27" alt="">
						<img class="metaFig" src= ${"images/means_" + metaData.means + ".png"} height="27" alt="">
						<img class="metaFig" src= ${"images/context_" + metaData.context + ".png"} height="27" alt="">
					</div>
					<div class="metadata-content"> 
						<div class="data-title">
							<img src= ${"images/activity_" + metaData.activity + ".png"} width="48" alt="">
							<h4>${metaData.timeC}<br>${metaData.title}</h4>
						</div>
						<div class="metadata-dsc" id="metadata-description5">
							<b>Description:</b><br>${metaData.description}<br><br>
							<b>Owner:</b><br>${metaData.owner}<br><br>
							<b>Size:</b><br>${metaData.size} <br><br>
							<b>time upload:</b><br>${metaData.timeU}
						</div>
						<div class="metadata-link">
							<button onClick="ToggleSRM()">ask for data access</button>
						</div>
					</div>
				</div>
			`;
			html += li;
			document.querySelector(".metadata-container").innerHTML = html;
								
    	});			
	});
}

// upload metadata
function UploadMD(){
	var mdOwner = firebase.auth().currentUser.displayName;
	var mdContext = document.getElementById("data-aspect-add").value;
	var mdTitle = document.getElementById("MDtitle").value;
	var mdMeans = document.getElementById("data-type-add").value;
	var mdActivity = document.getElementById("data-context-add").value;
	var mdTimeC = document.getElementById("mdTc").value;
	var mdPermi = document.getElementById("dtacselect").value;
	var d = new Date();
	var mdDesc = document.getElementById("mdDes").value;
	var mdExtLink = document.getElementById("mdEL").value;
	
	firebase.firestore().collection("MetaData").doc().set({
		activity: mdActivity,
		context: mdContext,
		description: mdDesc,
		link: mdExtLink,
		means: mdMeans,
		owner: mdOwner,
		permission: mdPermi,
		size: "unkown",
		timeC: mdTimeC,
		timeU: d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear(),
		title: mdTitle
		
	}).then(function(){
		console.log("Document successfully written!");
		var modal = document.getElementById("adddata-modal");
		modal.style.display = "none";
		loadMDcard();
	}).catch(function(error){
		console.error("Error adding document: ", error);
	});
}
