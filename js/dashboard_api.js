// JavaScript Document


//user permission

/*window.onload = firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
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
  
  */

var api_token;
var upload_token;

function cookieCheck(){
	var a = Cookies.get('usname');
	var b = Cookies.get('uspass');
	api_token = Cookies.get('ustoken');
	console.log(a);
	console.log(b);
	console.log(api_token);
	if(a != null && b != null && api_token != null){
	 $.ajax({
		 url: usLogin(a,b),
		 success: function(){
			 userInfoLoad();
		 }
	 });
	 
		console.log("ready");
		
  } else{console.log("hold on");}
}



function usLogin(user, password){
		$.ajax({
    url: 'https://131.155.21.235/api/v1/login',
    type: 'POST',
    data: {
        'username': user,
        'password': password,
    },
    headers: {
        'api-key': '12345'
    },
    success: function (result) {
        console.log(result);
		$( "#mtdCard" ).load(window.location.href + "#mtdCard" );
					var blkstr = [];
			$.each(result, function(idx2,val2) {                    
  				var str = val2;
				blkstr.push(str);
			});
			api_token = blkstr[1];
		setCookie(user, password, api_token);
		document.getElementById("userAccount").innerHTML = blkstr[2] + " " +blkstr[3];
		document.getElementById("loginUser").style.display = "block";
		document.getElementById("unLogin").style.display = "none";
    },
    error: function (error) {
		 console.log(error);
         window.alert("oops... something went wrong, please try it again!");
    }
});
}

function setCookie(user, psword, token){
	Cookies.set('usname', user);
	Cookies.set('uspass', psword);
	Cookies.set('ustoken', token);
	console.log(user + "||" + psword);
}

function removeCookie(){
	Cookies.remove('usname');
	Cookies.remove('uspass');
	Cookies.remove('ustoken');
}


function loginCheck(){
	var userEmail = document.getElementById("email_field").value;
	var userPss = document.getElementById("password_field").value;
	
	$.ajax({
    url: 'https://131.155.21.235/api/v1/login',
    type: 'POST',
    data: {
        'username': userEmail,
        'password': userPss,
    },
    headers: {
        'api-key': '12345'
    },
    success: function (result) {
        console.log(result);
		$( "#mtdCard" ).load(window.location.href + " #mtdCard" );
					var blkstr = [];
			$.each(result, function(idx2,val2) {                    
  				var str = val2;
				blkstr.push(str);
			});
			console.log(blkstr[1]);
			api_token = blkstr[1];
			setCookie(userEmail, userPss, api_token);
		document.getElementById("userAccount").innerHTML = blkstr[2] + " " +blkstr[3];
		userInfoLoad();
		document.getElementById("loginUser").style.display = "block";
		document.getElementById("unLogin").style.display = "none";
    },
    error: function (error) {
         console.log(error);
		 window.alert("oops... something went wrong, please try it again!");
    }
});

}

// add a new user
function createAccount(){
	var newEmail = document.getElementById("create_email").value;
	var newPss = document.getElementById("create_password").value;
	var rePss = document.getElementById("re_password").value;
	var newfsNm = document.getElementById("create_fsName").value;
	var newlsNm = document.getElementById("create_lsName").value;
	
	$.ajax({
    	url: ' https://131.155.21.235/api/v1/user/register',
		type: 'POST',
    	data: {
        	'email': newEmail,
			'first_name': newfsNm,
			'last_name': newlsNm,
        	'password': newPss,
			're_password': rePss
		},
    	headers: {
			'api-key': '12345'
		},
		success: function (result) {
			window.alert("Congratulations! A new VDC account is in.");
			console.log(result);
			usLogin(newEmail, newPss);
			userInfoLoad();
		},
		error: function (error) {
			console.error(error);
			window.alert("oops... something went wrong, please try it again!");
		}
	});
	
}


// logout from the current user
function logoutCheck(){
	$.ajax({
    url: 'https://131.155.21.235/api/v1/logout',
    type: 'GET',
    headers: {
        'api-key': '12345'
    },
    success: function (result) {
        console.log(result);
		document.getElementById("loginUser").style.display = "none";
		document.getElementById("unLogin").style.display = "block";
		document.getElementById("email_field").value = "";
		document.getElementById("password_field").value = "";
		document.getElementById("create_email").value = "";
		document.getElementById("create_password").value = "";
		document.getElementById("re_password").value = "";
		document.getElementById("create_fsName").value = "";
		document.getElementById("create_lsName").value = "";
		document.getElementById("login-div").style.display = "block";
		document.getElementById("register-div").style.display = "none";
		removeCookie();
    },
    error: function (error) {
        console.error(error);
		window.alert("oops... something went wrong, please try it again!");
    }
});
}

// load user 
function userInfoLoad(){
	$.ajax({
    url: 'https://131.155.21.235/api/v1/datasets',
    type: 'GET',
    headers: {
        'api-key': '12345',
		'api-token': api_token
    },
    success: function (result) {
		var secondKey = Object.keys(result)[1];
		//console.log(result[secondKey]);
		var dataID = result[secondKey];
		var dataKey = Object.keys(dataID)[0];
		var dataSM = dataID[dataKey];
		let html = "";
		dataSM.forEach(function(element){
			$.ajax({
				url: 'https://131.155.21.235/api/v1/datasets/' + element, 
				type: 'GET',
    headers: {
        'api-key': '12345',
        'api-token': api_token
    },
    success: function (allDatasets) {
        var datasetKey = Object.keys(allDatasets)[1];
		console.log(allDatasets[datasetKey]);
		var sgDataset = allDatasets[datasetKey];  
		//0 dataset ID; 1 title; 2 type; 3 target; 4 description; 5 keywords; 6 doi; 7 relation; 8 organization;
		//9 remarks; 10 license; 11 creation date; 12 start date; 13 end date; (14 data: 1 time; 2 name; 3 description) 14 owner; 15 project ID;
		var n = Object.keys(sgDataset);
		var d = new Date(sgDataset[n[13]]);
		var d2 = new Date(sgDataset[n[11]]);
		var d1 = new Date(sgDataset[n[12]]);
		var stDate = d1.getDate() + "-" + (d1.getMonth()+1) + "-" + d1.getFullYear();
		var edDate = d.getDate() + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
		var ulDate = d2.getDate() + "-" + (d2.getMonth()+1) + "-" + d2.getFullYear();
		var dlInfo;
		var li;
		if (sgDataset[n[16]] == null || sgDataset[n[16]].length == 0){
			dlInfo = "no dataset uploaded yet...";
			 li = `        								
				<div class="metadata-card">
					<div class="collapsible">
						<img class="metaFig" src= ${"images/" + sgDataset[n[9]] + ".png"} height="27" alt="">
						<img class="metaFig" src= ${"images/" + sgDataset[n[8]] + ".png"} height="27" alt="">
						<img class="metaFig" src= ${"images/"+ sgDataset[n[2]] +".png"} height="27" alt="">
					</div>
					<div class="metadata-content"> 
						<div class="data-title">
							<img src= ${"images/" + sgDataset[n[5]] + ".png"} width="48" alt="">
							<h4>${sgDataset[n[1]]}</h4>
						</div>
						<div class="metadata-dsc" id="metadata-description5">
							<b>Description:</b><br>${sgDataset[n[4]]}<br><br>
							<b>Dataset owner:</b><br>${sgDataset[n[7]]}<br><br>
							<b>Time period covered:</b><br>${stDate + " to " + edDate}<br><br>
							<b>Created by:</b><br>${sgDataset[n[14]] + " on " + ulDate} <br><br>							
							<b>Original resource/unique identifier:</b><br><a href= ${sgDataset[n[6]]} target="_blank">${sgDataset[n[6]]}</a><br><br>
							<p>${dlInfo}</p>		
						</div>
						<div class="metadata-link">
							<button id=${"btn" + sgDataset[n[0]]} onClick="ToggleSRM(${sgDataset[n[0]]})">Upload file(s)</button>
						</div>
					</div>
				</div>
			`;
		} else {
			dlInfo = sgDataset[n[16]].length + " dataset(s) have been uploaded";
			 li = `        								
				<div class="metadata-card">
					<div class="collapsible">
						<img class="metaFig" src= ${"images/" + sgDataset[n[9]] + ".png"} height="27" alt="">
						<img class="metaFig" src= ${"images/" + sgDataset[n[8]] + ".png"} height="27" alt="">
						<img class="metaFig" src= ${"images/"+ sgDataset[n[2]] +".png"} height="27" alt="">
					</div>
					<div class="metadata-content"> 
						<div class="data-title">
							<img src= ${"images/" + sgDataset[n[5]] + ".png"} width="48" alt="">
							<h4>${sgDataset[n[1]]}</h4>
						</div>
						<div class="metadata-dsc" id="metadata-description5">
							<b>Description:</b><br>${sgDataset[n[4]]}<br><br>
							<b>Dataset owner:</b><br>${sgDataset[n[7]]}<br><br>
							<b>Time period covered:</b><br>${stDate + " to " + edDate}<br><br>
							<b>Created by:</b><br>${sgDataset[n[14]] + " on " + ulDate} <br><br>							
							<b>Original resource/unique identifier:</b><br><a href= ${sgDataset[n[6]]} target="_blank">${sgDataset[n[6]]}</a><br><br>
							<p>${dlInfo}</p>
						</div>
						<div class="metadata-link">
							<button onClick = "ToggleDLM(${sgDataset[n[0]]})">Download file(s)</button>
							<button id=${"btn" + sgDataset[n[0]]} onClick="ToggleSRM(${sgDataset[n[0]]})">Upload file(s)</button>
						</div>
					</div>
				</div>
			`;
		}
	html += li;
	document.querySelector(".metadata-container").innerHTML = html;	
    },
    error: function (error) {
        console.error(error);
    }
});
				
			
		});
		
    },
    error: function (error) {
        console.error(error);
    }
});

}


// upload metadata
function UploadMD(){
	var mdContext = document.getElementById("data-aspect-add").value;
	var mdTitle = document.getElementById("MDtitle").value;
	var mdMeans = document.getElementById("data-type-add").value;
	var mdActivity = document.getElementById("data-context-add").value;
	var mdTimeC = $('#mdTc').datepicker({ dateFormat: 'yy-mm-dd' }).val();
	var mdTimef = $( '#mdTf' ).datepicker({ dateFormat: 'yy-mm-dd' }).val();
	var mdPermi = document.getElementById("dtacselect").value;
	var mdRel = document.getElementById("MDorg").value;
	var mdDesc = document.getElementById("mdDes").value;
	var mdExtLink = document.getElementById("mdEL").value;
	
	$.ajax({
    url: 'https://131.155.21.235/api/v1/datasets/add',
    type: 'POST',
    data: {
        'project_id': '', // id of project this dataset will be linked to, can be empty if there is only project for this user
		'dataset_name': mdTitle,
        'dataset_type': mdContext, // or 'COMPLETE'
        'target_object': '', // for LINKED datasets
        'description': mdDesc, // max 1000 characters
        'start-date': mdTimeC +' 12:12:12', // format: yyyy-MM-dd HH:mm:ss
        'end-date': mdTimef +' 12:12:12', // format: yyyy-MM-dd HH:mm:ss
        'isPublic': mdPermi, // or false
        'keywords': mdActivity, // comma-separated, max 255 characters
        'doi': mdExtLink, // the digital object identifier of this dataset, if available
        'relation': mdRel, // refer to a related dataset, publication or journal article
        'organization': mdMeans, // organizations involved in this project / dataset creation
        'remarks': mdPermi // max 1000 characters
        
		/*'dataset_name': mdTitle,
        'dataset_type': 'LINKED', // or 'COMPLETE'
        'target_object': mdExtLink, // for LINKED datasets
        'description': mdDesc, // max 1000 characters
        'start-date': mdTimeC, // format: yyyy-MM-dd HH:mm:ss
        'end-date': d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear(), // format: yyyy-MM-dd HH:mm:ss
        'isPublic': true, // or false
        'keywords': mdContext, // comma-separated, max 255 characters
        'doi': mdMeans, // the digital object identifier of this dataset, if available
        'relation': mdActivity, // refer to a related dataset, publication or journal article
        'organization': 'TU/e ID, Fontys, UMCU', // organizations involved in this project / dataset creation
        'remarks': mdDesc // max 1000 characters
		*/
    },
    headers: {
        'api-key': '12345',
		'api-token': api_token
    },
    success: function (result) {
        console.log(result);
		var modal = document.getElementById("adddata-modal");
		modal.style.display = "none";
		userInfoLoad();
    },
    error: function (error) {
        console.error(error);
    }
});
	
}

//
function ToggleSRM(ULdata) {
  var modal = document.getElementById("request-modal");
  modal.style.display = "block";
  upload_token = ULdata;
  document.getElementById("UDTitle").innerHTML = upload_token;
}


//
function ToggleDLM(DLdata){
	var modal = document.getElementById("download-modal");
	modal.style.display = "block";
	
	$.ajax({
    url: 'https://131.155.21.235/api/v1/datasets/' + DLdata, // 17 is the id of the dataset
    type: 'GET',
    headers: {
        'api-key': '12345',
        'api-token': api_token
    },
    success: function (data) {
		var datasetKey = Object.keys(data)[1];
		var sgDataset = data[datasetKey];  
		//0 dataset ID; 1 title; 2 type; 3 target; 4 description; 5 keywords; 6 doi; 7 relation; 8 organization;
		//9 remarks; 10 license; 11 creation date; 12 start date; 13 end date; (14 data: 1 time; 2 name; 3 description) 14 owner; 15 project ID;
		var n = Object.keys(sgDataset);
		var d = sgDataset[n[16]];
		var table = document.querySelector(".DLTable");
		var i;
		var html = `<thead>
						<tr>
							<th>File name</th>
							<th>Description</th>
							<th>Uploaded at</th>
							<th>Download via</th>
						</tr>
					</thead>`;
		for(i=0; i < d.length; i++){
			var f = d[i][Object.keys(d[i])[1]];
	    	var fStr = DLdata + '-' + i;
			console.log(fStr);
			var des = d[i][Object.keys(d[i])[2]];
			var t = new Date(d[i][Object.keys(d[i])[0]]);
			var date = t.getDate() + "-" + (t.getMonth()+1) + "-" + t.getFullYear();
	  var li = `
		<tbody>
   			<tr>
       			<td id="${fStr}">${f}</td>
      			<td>${des}</td>
       			<td>${date}</td>
				<td><button onClick="DLfile(${DLdata}, ${i})">download</button></td>
   		    </tr>		
		</tbody>
	  `;		
	  html += li;
	  table.innerHTML = html;	
		}
    },
    error: function (error) {
        console.error(error);
    }
});
	
}

//download data
function DLfile(projectID, flID){
	var p = projectID + '-' + flID;
	var x = document.getElementById(p).innerHTML;
	console.log(x);
	$.ajax({
	// 17 is the id of the dataset, filename the name of the file to download
    url: 'https://131.155.21.235/api/v1/datasets/download/' + projectID + '/' + x, 
    type: 'GET',
	xhrFields: {
            responseType: 'blob'
        },
    headers: {
        'api-key': '12345',
        'api-token': api_token
    },
    success: function (data) {
       var a = document.createElement('a');
            var url = window.URL.createObjectURL(data);
            a.href = url;
            a.download = 'myfile';
            document.body.append(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
    },
    error: function (error) {
        console.error(error);
    }
});
	
}

function CloseDLM(){
	var modal = document.getElementById("download-modal");
	modal.style.display = "none";
}

var uploadState = function(){
	document.getElementById("ulstate").innerHTML = "uploading...";
	document.getElementById('submitBtn').disabled = true;
	document.getElementById('files').disabled = true;
	document.getElementById('description').disabled = true;
	document.getElementById('participant').disabled = true;
};

//upload file
$('#submitBtn').click(function(e) {
			var form_data = new FormData($('#uploadDTFiles')[0]);
			$.ajax({
				url: 'https://131.155.21.235/api/v1/datasets/upload/' + upload_token,
				type: 'POST',
				data: form_data,
				contentType: false,
				processData: false,
				headers: {
					'api-key': '12345',
					'api-token': api_token
				}})
				.always(document.getElementById("ulstate").innerHTML = "uploading...")
				.done(function (result) {
					console.log(result);
					document.getElementById("ulstate").innerHTML = "done!";
					document.getElementById("description").value = "";
  					document.getElementById("files").value = "";

				})
				.fail(function (error) {
					console.error(error);
					document.getElementById("ulstate").innerHTML = "failed uploading the file.";
				
				});

			e.preventDefault();
			return false;
});


// When the user clicks on <span> (x), close the modal
function CloseSRM() {
  var modal = document.getElementById("request-modal");
  modal.style.display = "none";
  document.getElementById("description").value = "";
  document.getElementById("files").value = "";
  document.getElementById("ulstate").innerHTML = "";
}

//download file
$('#dlBtn').click(function(){
	$.ajax({
	// 17 is the id of the dataset, filename the name of the file to download
    url: 'https://131.155.21.235/api/v1/datasets/download/25/test.txt', 
    type: 'GET',
	xhrFields: {
            responseType: 'text'
        },
    headers: {
        'api-key': '12345',
        'api-token': api_token
    },
    success: function (data) {
       var a = document.createElement('a');
            var url = window.URL.createObjectURL(data);
            a.href = url;
            a.download = 'myfile';
            document.body.append(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
    },
    error: function (error) {
        console.error(error);
    }
});
});


