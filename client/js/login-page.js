const { get } = require("https");

function loginUser(){
//get email value
var loginEmail = document.getElementById("user-id");
var emailValue = loginEmail.value;


//got it

console.log(emailValue + " is the email value");
//get password value

var loginPassword = document.getElementById("user-password")
var passwordValue = loginPassword.value;
console.log(passwordValue + " is the password value.")

//got password value

var jsonString = {
    pass : passwordValue,
    user_email: emailValue
 }



 $.ajax({    
    url: databaseURL + "/login-user-mysql", 
    
    type: 'get',
    data: jsonString,
    success: function(response){                            
        console.log("Response: " + response);               
         var returnData = JSON.parse(response);             
          
             alert(returnData.msg);                         
             assignUser(emailValue);                                         

        },
        error: function(err){                           
            console.log("An error was passed");                 //change
            console.log(err);
         }
    });
    return false;
;







} //end of function

//start of assignUser Function
function assignUser(emailValue){
    console.log("The user should now be assigned.");
    console.log("Is the email " + emailValue + "?"); 

    //we have the email, send it back to the database and get 2 things:
    //first thing: userID
    //second thing: display name

$.ajax({
    url: databaseURL + "/assign-user-mysql",
    type: 'get',
    data: jsonString,
    success: function(response){
        console.log("This is what came back: " + response)
    }



})



    }
    //end of assignUser function