$(document).ready (function() {

		
					// Firebase Ref
							var userRefernce = new Firebase("https://clikinboos.firebaseio.com/");
					
					// Pull object from object in crestrNewUser function if valid parameters are entered.. once var receives object push to firebase in function
							var newUser = [];
						
					// Upon login, if user parameter === user data object from firebase, pull info to app to use as users account
							var existingUser = [];
							
					// Function begins to create a new user
						
							$("#createAccount").on("click", function() {
								
								$("#alertUser").empty();
						
								function createNewUser() {
							
							// Pulls registration data from input form
							
									var enterFirstName = $("#getFirstName").val().trim();
									var enterLastName = $("#getLastName").val().trim();
									var enterEmail = $("#getEmail").val().trim();
									var enterEmailConfirm = $("#getEmailConfirm").val().trim();
									var enterPassword = $("#getPassword").val().trim();
									var enterPasswordConfirm = $("#getPasswordConfirm").val().trim();
					
					//  Function inside of createNewUser function to determine if value was entered into required fields
							
								function detectEmptyInput() {		
									if ( enterFirstName === "" || enterLastName === "" || enterEmail === "" || 
									enterEmailConfirm === "" || enterPassword === "" || enterPasswordConfirm === "" ) { 
										$("#alertUser").append("Please complete registration form.");
									} else {
					// Function inside of detectEmptyInput function to determine if what user entered in fields is valid and matches
										function registrationMatchToProceed() {
										if ( enterEmail !== enterEmailConfirm && enterPassword !== enterPasswordConfirm ) {
												$("#alertUser").append("Neither the re-entered email or password matched. Please try again.");
										} else if ( enterEmail !== enterEmailConfirm && enterPassword === enterPasswordConfirm ) {
												$("#alertUser").append("Emails did not match. Please try again.");
										} else if ( enterEmail === enterEmailConfirm && enterPassword !== enterPasswordConfirm ) {
												$("#alertUser").append("Passwords did not match. Please try again.");
										} else if ( enterEmail === enterEmailConfirm && enterPassword === enterPasswordConfirm ) {
											
					// Creates user on Firebase with email and password
					
											userRefernce.createUser({
												email: enterEmail,
												password: enterPassword
												}, function(error, userData) {
												  if (error) {
												    switch (error.code) {
												      case "EMAIL_TAKEN":
												        console.log("The new user account cannot be created because the email is already in use.");
												        break;
												      case "INVALID_EMAIL":
												        console.log("The specified email is not a valid email.");
												        break;
												      default:
												        console.log("Error creating user:", error);
												    }
												  } else {
												    console.log("Successfully created user account with uid:", userData.uid);
	
														function authHandler(error, authData) {
															  if (error) {
															    console.log("Login Failed!", error);
															  } else {
															    console.log("Authenticated successfully with payload:", authData);
															  }
															} userRefernce.authWithPassword({
																  email    : enterEmail,
																  password : enterPassword
																}, authHandler);
													
														var isNewUser = true;
															
															userRefernce.onAuth(function(authData) {
															  if (authData && isNewUser) {
															    // save the user's profile into the database so we can list users,
															    // use them in Security and Firebase Rules, and show profiles
															    userRefernce.child("users").child(authData.uid).set({
															      provider: authData.provider,
															      name: [{
															      	first: enterFirstName,
															      	last: enterLastName
															      }]
															    }); 
															  }
															});
															
															function getName(authData) {
															  switch(authData.provider) {
															     case 'password':
															       return authData.password.email.replace(/@.*/, '');
															  }
															}
												  }
												});
										}
									} 
					// Function for RegistrationtoMatchProceed function is run
									registrationMatchToProceed();
									}
								}
					// function for detectEmptyInput is run
									detectEmptyInput();
									
								}
						
								createNewUser();
								return false;
							});
				});
				
				// Cleat AlertUser div on Reset
							$("#resetRegistrationForm").on("click", function() {
								$("#alertUser").empty();
							})
		