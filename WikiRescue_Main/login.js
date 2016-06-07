	$(document).ready (function() {
				
// CODE BELOW FOR USER REGISTERATION				

		// Firebase Ref
		var userRefernce = new Firebase("https://clikinboos.firebaseio.com/");
					
	
		$(".loginAccount").on("click", function() {

		var loginEmail = $(".emailLogin").val().trim();
		var loginPassword = $(".passwordLogin").val().trim();

		console.log(loginEmail);
		console.log(loginPassword);

		userRefernce.authWithPassword({
			  email    : loginEmail,
			  password : loginPassword
			}, function(error, authData) {
			  if (error) {
			    switch (error.code) {
			      case "INVALID_EMAIL":
			        console.log("The specified user account email is invalid.");
			        break;
			      case "INVALID_PASSWORD":
			        console.log("The specified user account password is incorrect.");
			        break;
			      case "INVALID_USER":
			        console.log("The specified user account does not exist.");
			        break;
			      default:
			        console.log("Error logging user in:", error);
			    }
			  } else {
			    window.location.href = "dogpage.html";
			    console.log("Authenticated successfully with payload:", authData);
			  }
			});
			
			return false; 
		});
		
});
