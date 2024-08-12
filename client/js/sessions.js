var theId = localStorage.getItem("User ID");
var room;
var theUserEmail = localStorage.getItem("User Email");
var theDisplayName = localStorage.getItem("Display Name");
var activeSessionID;

nameDisplay();
function joinSessionDropdown(){
    console.log("Dropdown was clicked.");
    document.getElementById("theDropdown").classList.toggle("show");
}

function generateSessionDropdown(){
    console.log("Second dropdown was clicked.");
    document.getElementById("generateSessionDropdown").classList.toggle("show");
}



function buttonClicked(){
    //placeholder
    
console.log("The button for the date & room was triggered.")
    var date = new Date();
    
    
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();

    room = theId + minutes + seconds + milliseconds;

    console.log("Room ID: " + room);

    socket.emit("join", JSON.stringify({room: room}));
    
console.log(room + " is the room ID.");


 


//retrieving information about session and host

//get session description
var session_description = document.getElementById('session_description_box');
var sesh_value = session_description.value;
//get user id
var user_id = theId;

//display values before putting it into database
document.getElementById("displaySessionIDDisplay").innerHTML = room;
// document.getElementById().innerHMTL = e;
// document.getElementById().innerHMTL = e;
// document.getElementById().innerHMTL =e ;
// document.getElementById().innerHMTL =e ;

//put it all together
var dataForGeneration = {
    user_id: user_id,
    session_description: sesh_value,
    number_of_users: 1,
    room_id: room
};


    $.ajax({    
        url: databaseURL + "/generate-session-mysql",
        
        type: 'post',
        data: dataForGeneration,
        success: function(response){
            
            console.log("The response from generate-session: " + response)
             var returnData = JSON.parse(response);
             
            
            
             if (returnData.msg === "SUCCESS"){
                 
             } 
    generateSessions(response);
            },
            error: function(err){
                console.log("An error was passed");
                console.log(err);
             }
        });
        //end of ajax file
    
    console.log("Line 32 was run properly.");

        const sessionHandler = ('../../server/database');
        

        getSessionID();
    
//division of functions.
    }
    //start of generateSessions
function generateSessions(sessionInfo){
    console.log("generateSessions function was triggered.");

    var tableHTML = "";

    //the for loop will go here. There will be one session at the start. And it will go until   
                             //const { numberOfSessions } = require('../../server/database');


    tableHTML += "<tr>";
    tableHTML += "<td>" + sessionInfo.session_description + "</td>";
    tableHTML += "<td>" + "Err Rick" + "</td>";
    tableHTML += "<td>" + "English Class discussion on 5/22" + "</td>";
    tableHTML += "<td>" + "1" + "</td>";
    tableHTML += "<td>" + "10:20 AM" + "</td>";
    tableHTML += "<td>" + "None" + "</td>";
    tableHTML += "<td>" + "<button type='button' id ='myBtn' class='btn btn-light' onclick = 'displayModal()'>Join</button>" + "</td>";

    tableHTML += "</tr>";

$("#sessionTable").html(tableHTML);


}
//end of generate sessions






//end of button clicked


//start of nameDisplay

function nameDisplay(){

    console.log("Name display function was triggered");
var currentUser = localStorage.getItem("Display Name")

    document.getElementById("login-name-display").innerHTML= currentUser;
}
//end of name display

//start of join session button
function joinSession(){
    var userRoomID = document.getElementById("join-session-ID").value;
    
    console.log("Join session was clicked, with the ID of " + userRoomID);

    var theString = {
        room_id: userRoomID
    }

//start of ajax

$.ajax({
    url: databaseURL + "/join-session-mysql",
    type: 'get',
    data: theString,
    success: function(response){
        
        console.log("Response received: " + response)
        var theReturnData = JSON.parse(response);
        document.getElementById("displaySessionIDDisplay").innerHTML =theReturnData.room_id;
        room = theReturnData.room_id
        activeSessionID = theReturnData.session_id
        document.getElementById("host_id_display").innerHTML = theReturnData.user_id;
        //number of users needs to be updated. how do we do it?
        //call to a function that will update the numberOfUsers in the current session
        //send over the identifier (room_id) and be add 1 to the numberOfUsers
        increaseNumberOfUsers(theReturnData.room_id);
        document.getElementById("numberOfUsers").innerHTML = theReturnData.number_of_users;
        document.getElementById("sessionDescriptionDisplay").innerHTML = theReturnData.session_description ;
        displayModal();
        loadText(activeSessionID);
    },
    error: function (err){
        console.log("An error occured.");
        console.log(err);
    }
});


//end of ajax
getSessionID();

    joinTheRoom();
    socket.emit("join", JSON.stringify({room: userRoomID}));
 //   displayModal();
}

//start of saveText function

function saveText(toBeUsed){
    
    var backToString = JSON.parse(toBeUsed);
    console.log("First part:" + backToString.text);

$.ajax({
url: databaseURL + "/save-text-mysql",
type: 'post',
data: backToString,
sucess: function(response){
    console.log("The text was properly saved. Yippie" + response);
    var returnData = JSON.parse(response);
}, 
error: function(err){
    console.log("Error saving text to database.");
    console.log(err);
}


})


}
//end of saveText function


//start of getSessionID function

function getSessionID(){
var theCurrentRoom = document.getElementById("displaySessionIDDisplay").innerHTML;
console.log("getSessionID was triggered, and the room is " + theCurrentRoom);
var theData = {
    room_id: theCurrentRoom
}
//now: We query the database, and get the right thing returned

$.ajax({
    url: databaseURL + "/get-session-id-mysql",
    type: 'get',
    data: theData,
    success: function(response){
        console.log("Success. Response: " + response)
            var theReturnData = JSON.parse(response);
            activeSessionID = theReturnData.session_id;
            //lines to display the correct information about session
            document.getElementById("displaySessionIDDisplay").innerHTML = room;
            document.getElementById("host_id_display").innerHTML = theReturnData.user_id;
            document.getElementById("numberOfUsers").innerHTML = theReturnData.number_of_users;
            document.getElementById("sessionDescriptionDisplay").innerHTML = theReturnData.session_description ;
 

        


    },
    error: function (err){
        console.log("An error happened.");
        console.log(err);
    }
})

}
//end of getSessionID






//start of log out button

function logOut(){
    console.log("The button to log out was clicked");
    
    localStorage.setItem("User ID", "" );
    localStorage.setItem("User Email", "" );
    localStorage.setItem("Display Name", "" );
    location.assign(databaseURL);
    room = ''
    activeSessionID = ''
    console.log("Is this triggered?");
    alert("Logged out successfully");
}
//end of log out button


//start of increaseNumberOfUsers function

function increaseNumberOfUsers(room_id){

var the_room_id = {
    room_id: room_id
}

$.ajax({
    url: databaseURL + "/increase-numberOfUsers-mysql",
    type: 'post',
    data: the_room_id,
    success: function(response){
        console.log("Success. It went through. " + response);
    }

})



}
//end of increaseNumberOfUsers function

//start of decreaseNumberOfUsers function

function decreaseNumberOfUsers(room_id){

var the_room_id = {
    room_id: room
}
$.ajax({
    url: databaseURL + "/decrease-numberOfUsers-mysql",
    type: 'post',
    data: the_room_id,
    success: function(response){
        console.log("Leaving was successful.")
    }
})
}

//end of decreaseNumberOfUsers function

//start of modal stuff

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function displayModal() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    decreaseNumberOfUsers(room);
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
//hidden/removed
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

//end of modal stuff


//start of socket stuff

// const socket = io.connect("localhost:4000");
const socket = io(databaseURL, {
    withCredenitials: true,
    extraHeaders: {
        "my-custom-header" : "abcd"
    }
})
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
var theHTML = "";
var userSpecificInfo = {
    user_id:theId,
    user_email: theUserEmail,
    display_name: theDisplayName


}

//start of joinTheRoom
function joinTheRoom(){
    
    socket.on("connection", (socket) => {
        socket.join(room);
        console.log(room + " was joined.");
console.log("Uh oh");
    })
}

//end of joinTheRoom


//start of loadText
function loadText(activeSessionID){
    console.log("The text should be loading in now...");
    var currentSession = activeSessionID;
    var jsonString = {
        session_id: currentSession
    }
    $.ajax({
        url: databaseURL + "/load-text-mysql",
        type: 'get', 
        data: jsonString,
        success: function(response){
            console.log("It went through." + response)
           it = JSON.parse(response)
            convertUserText(it)



        }
    })
}
//end of loadText

//start of convert userText
function convertUserText(response){
    console.log("Converting in progress");
console.log(response);

$.ajax({
    url: databaseURL + "/convert-userText-mysql",
    type: 'get',
    data: response,
    success: function(response){
        console.log("Eureka" + response)
    }
    
})



}

//end of convert user-text

form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (input.value) {

        var dataForSaving = {
            session_id: activeSessionID,
            text: input.value,
            userName: theDisplayName,
            user_id: theId
        }

        var toBeSent= JSON.stringify(dataForSaving);
            saveText(toBeSent);


        //here is where I do it
        var sentData = {
            message: input.value,
            userName: theDisplayName
            
        }
        socket.emit('chat-message', sentData); 
        //original line above
        //socket.to(room).emit('chat-message', sentData);
        input.value = '';
    }
});

socket.on('chat_message', function(msg) {

    const item = document.createElement('li');
    item.textContent = msg;
    
 document.getElementById("user-text-location").innerHTML += msg.message;

 theHTML += "<div id = 'userBox'>" +
  "<p id = 'userBoxUsername'>   " + msg.userName +  "</p>" + 
  "<p id = 'userBoxText' class='whiteText'>" + 
  msg.message + 
 "</p>" +
 "</div>"
 $("#user-text-location").html(theHTML);

 
   // window.scrollTo(0, document.body.scrollHeight);
    
});

//end of socket stuff