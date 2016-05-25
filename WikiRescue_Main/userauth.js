$("#formValidate").validate({
        rules: {
            first_name: {
                required: true,
                minlength: 2
            },
            last_name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email:true
            },
            password: {
				required: true,
				minlength: 7
			},
			cpassword: {
				required: true,
				minlength: 7,
				equalTo: "#password"
			},
        },
});            
			
// Firebase link
var url ='https://project-3404913783788705038.firebaseio.com/'
var dataRef = new Firebase(url);
// Capture Button Click
$("#newUser").on("click", function() {
    // Code in the logic for storing and retrieving the new user. 
    first_name = $('#firstNameInput').val().trim();
    last_name = $('#lastNameInput').val().trim();
    email = $('#emailInput').val().trim();
    password = $('#passwordInput').val().trim();
    
    // Code for the push
    dataRef.push({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        dateAdded: Firebase.ServerValue.TIMESTAMP
    });
    // Don't refresh the page!
    return false;
});

//Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.on("child_added", function(childSnapshot) {
    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().first_name);
    console.log(childSnapshot.val().last_name);
    console.log(childSnapshot.val().email);
    console.log(childSnapshot.val().password);
  
    // full list of items to the well    
    $('#memberList').append("<div class='well'><span id='email'> "+childSnapshot.val().name+" </span><span id='email'> "+childSnapshot.val().email+" </span><span id='age'> "+childSnapshot.val().age+" </span><span id='comment'> "+childSnapshot.val().comment+" </span></div>")
  

// Handle the errors
}, function(errorObject){
    //console.log("Errors handled: " + errorObject.code)
});

dataRef.orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
    // Change the HTML to reflect
    $("#namedisplay").html(snapshot.val().name);
    $("#emaildisplay").html(snapshot.val().email);
    $("#agedisplay").html(snapshot.val().age);
    $("#commentdisplay").html(snapshot.val().comment);
})

