
//Uh, event listener or something



function registerUser(){
  
///get email address
var email = document.getElementById('r-user-email');
var emailValue = email.value;

//got email address

//get password

    var password = document.getElementById('r-user-password');
    var passwordValue = password.value;
     

//got password
//get displayName

    var name = document.getElementById('r-username');
    var nameValue = name.value;

    //got display name

//combining it all into one
var jsonString = {
   pass : passwordValue,
   display_name: nameValue,
   user_email: emailValue

}
;

    $.ajax({    
    url: databaseURL + "/register-user-mysql",
    //the url is correct, and errors are going through, which means something else is wrong. 
    type: 'post',
    data: jsonString,
    success: function(response){
        console.log("Response: " + response);
         var returnData = JSON.parse(response);
         if (returnData.msg === "SUCCESS"){
             alert("Account successfully made.")
         } else {
             alert(returnData.msg);
             }

        },
        error: function(err){
            console.log("An error was passed");
            console.log(err);
         }
    });
    return false;
;



}//end of function




