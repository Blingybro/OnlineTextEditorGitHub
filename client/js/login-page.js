//const { get } = require("https");

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
                     
          const checkValue = "LOGIN SUCCESSFUL";
             //alert(returnData.msg);
             console.log(response + " is the return data"); 
             if  (returnData.msg === checkValue){        
                document.getElementById("user-status").innerHTML = "Login successful";
                setupUser(returnData);
             //assignUser(emailValue);                                        
    } 

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
//not currently being used. 
function assignUser(emailValue){
    console.log("The user should now be assigned.");
    console.log("Is the email " + emailValue + "?"); 

    //we have the email, send it back to the database and get 2 things:
    //first thing: userID
    //second thing: display name

 var theLoginEmail = document.getElementById("user-id");
 var assignUserVar = theLoginEmail.value;
console.log("Line 70 is currently running properly");

$.ajax({
    url: databaseURL + "/assign-user-mysql",
    type: 'get',
    data: assignUserVar,
    success: function(response){
        console.log("This is what came back: " + response)
    }



})



    }
    //end of assignUser function


    //start of trial function
function setupUser(userInfo){
    localStorage.setItem("User ID", userInfo.user_id);
    localStorage.setItem("User Email", userInfo.user_email);
    localStorage.setItem("Display Name", userInfo.display_name);
    
    localStorage.getItem("User ID");

    console.log("The info: " + 
        localStorage.getItem("User ID", userInfo.user_id) +
        localStorage.getItem("User Email", userInfo.user_email) + 
        localStorage.getItem("Display Name", userInfo.display_name)

    )
}
    //end of trial function