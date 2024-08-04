var theId = localStorage.getItem("User ID");
var room;
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

//put it all together
var dataForGeneration = {
    user_id: user_id,
    session_description: sesh_value,
    number_of_users: 1
};


    $.ajax({    
        url: databaseURL + "/generate-session-mysql",
        
        type: 'post',
        data: dataForGeneration,
        success: function(response){
            
            
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
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

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

form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

socket.on('chat message', function(msg) {
    console.log(msg);
    const item = document.createElement('li');
    item.textContent = msg;

 document.getElementById("user-text-location").innerHTML = msg;

 
   // window.scrollTo(0, document.body.scrollHeight);
    
});

//end of socket stuff