

function createSessionDropdown(){
    console.log("Dropdown was clicked.");
    document.getElementById("theDropdown").classList.toggle("show");
}





function buttonClicked(theVariable){
    document.getElementById("testButton").innerHTML="Sessions Loaded.";

console.log(theVariable + " is the variable.");

var theThing = "";

    $.ajax({    
        url: databaseURL + "/sessions-mysql",
        //the url is correct, and errors are going through, which means something else is wrong. 
        type: 'get',
        
        success: function(response){
            console.log("Response retrieved: " + response);
             var returnData = JSON.parse(response);
            theThing += returnData;
             if (returnData.msg === "SUCCESS"){
                 
             } 
    
            },
            error: function(err){
                console.log("An error was passed");
                console.log(err);
             }
        });
        
    
    console.log("Line 32 was run properly.");

        const sessionHandler = ('../../server/database');
        
console.log(theThing + " is the thing.");

    

    var tableHTML = "";

    //the for loop will go here. There will be one session at the start. And it will go until   
                             //const { numberOfSessions } = require('../../server/database');


    tableHTML += "<tr>";
    tableHTML += "<td>" + "English Class" + "</td>";
    tableHTML += "<td>" + "Err Rick" + "</td>";
    tableHTML += "<td>" + "English Class discussion on 5/22" + "</td>";
    tableHTML += "<td>" + "1" + "</td>";
    tableHTML += "<td>" + "10:20 AM" + "</td>";
    tableHTML += "<td>" + "None" + "</td>";
    tableHTML += "<td>" + "<button type='button' class='btn btn-light disabled'>Join</button>" + "</td>";

    tableHTML += "</tr>";

$("#sessionTable").html(tableHTML);









}