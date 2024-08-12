//import mysql from 'mysql2'

//import dotenv from 'dotenv'
//dotenv.config()

//Bah, just gotta comment it all out
// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password:process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE

// })


// mysql.createPool({
//     host: '127.0.0.1',
//     user: 'root',
//     password:'12345',
//     database: '296project'
// }).promise()

// async function getUser(){
//     const [rows] = await pool.query("SELECT * FROM user")
//     return rows
// }
// const user = await getUser()
// console.log(user)


const mysql = require('mysql');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '12345',
    database: '296project'
});

connection.connect((err) => {
    if(err) throw err;

    console.log("Connected to MySQL.");
});


var services  = function(app) {
//experimental stuff
app.use(express.static('public'));

//socket logic
//socket logic is not used here.
io.on('connection', (socket) => {
    console.log('A user connected');
    console.log('database.js was triggered.');

    // Handle incoming messages
    socket.on('chat message', (msg) => {
        // Save message to the database
        const query = 'INSERT INTO text (content) VALUES (?)';
        db.query(query, [msg], (err) => {
            if (err) {
                console.error('Error saving message to the database:', err);
                return;
            }
            // Broadcast the message to all clients
            io.emit('chat message', msg);
        });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});


//end of experimental stuff

app.post('/register-user-mysql', function(req, res) {

var data = {     
    
    //confused, but the names have to correlate with the names of the boxes & listener
    pass : req.body.pass,
    display_name: req.body.display_name,
    user_email: req.body.user_email


    };

    connection.query("INSERT INTO user SET ?", data, function(err){
        if (err) {
            console.log("error occured when sending in stuff into database");
            console.log(err);
            return res.status(205).send(JSON.stringify({msg: err}));
            
        } else {
            return res.status(201).send(JSON.stringify({msg: "SUCCESS"}));
        }
    
});

//adding in second connection.query statement here
connection.query("INSERT INTO host SET ?", data, function(err){
    if (err) {
        console.log("error occured when sending in stuff into database");
        console.log(err);
        return res.status(205).send(JSON.stringify({msg: err}));
        
    } else {
        console.log("Line 118 in database.js was run");
        
      
      
      //  return res.status(201).send(JSON.stringify({msg: "SUCCESS"}));
        
    }

});
//end of second statement

}); //end of register-user


//start of login-user

app.get('/login-user-mysql', function(req, res){
    var data = {
        pass : req.body.pass,
         user_email: req.body.user_email
    };
    var password = req.query.pass
    var email = req.query.user_email

connection.query("SELECT * FROM user WHERE user_email = ? AND pass = ?", [email, password], function(err, results, fields){
    
        
    if (err){
        console.log("error in database.js"); 
        console.log(err);
        return res.status(209).send(JSON.stringify({msg: err}));
    } else if (results.length >0){

        const user = results[0];
        console.log(user + " is the value of the user" )
        console.log(user.display_name);
        const response = {
            msg: "LOGIN SUCCESSFUL",
            user_id : user.user_id,
            user_email : user.user_email,
            display_name: user.display_name
        };



        
        return res.status(200).send(JSON.stringify(response
            
        ));
        
        
    } else{
        return res.status(201).send(JSON.stringify({msg:"Invalid entry" }))
    }



});


})
//end of login-user

//start of sessions
app.get('/sessions-mysql', function(req, res){
    connection.query("SELECT * FROM session", function(err, results, fields) {
        if (err) {
            console.log("Error querying database:", err);
            return res.status(500).send(JSON.stringify({ msg: "Database error" }));
        }
        
        const numberOfSessions = results.length;
        console.log(numberOfSessions + " is the number of sessions");
        console.log( results[0].session_description + " is the description of the first session");
        
        
        
        const responseInfo = [];

        for (let i = 0; i <results.length; i++){
            const user = results[i]; 
            const response = {
                session_id : user.session_description,
                user_id : user.user_id,
                session_description : user.session_description
            }
            responseInfo.push(response);
        }

        
///can be used for debugging                         //console.log(responseInfo[0].session_description + " is the session description");
        return res.status(200).send(JSON.stringify({responseInfo})); 
       // return res.status(200).send(responseInfo);        
            //testing out return functions
            

    });

})  
//end of sessions

//start of generate session

app.post('/generate-session-mysql', function(req, res){


var data = {
    user_id: req.body.user_id,
    session_description: req.body.session_description,
    number_of_users: req.body.number_of_users,
    room_id: req.body.room_id
};

connection.query("INSERT INTO session SET ?", data, function(err){
    if (err){
        console.log("error occured when making new session in database.");
        console.log(err);
        return res.status(205).send(JSON.stringify({msg: err}));
        
    } else{
        return res.status(201).send(JSON.stringify({msg: "SUCCESS"}));
    }
});


}); //end of generate session







//start of assign user
app.get("/assign-user-mysql", function(req, res){
    var email = req.query.user_email
    connection.query("SELECT * FROM user WHERE user_email = ?", [email], function(err, results, fields){
        if (err){
            console.log("error in the database.");
            console.log(err);
        } else if (results.length = 0){
            return res.status(201).send(JSON.stringify({msg:"Nothing was returned, glitch in querying." }));
        } else {
            console.log()
          //  localStorage.setItem("login-userID", );
            
        }
    })
})

//end of assign user


//start of display session details
app.get("display-session-details", function (req, res){



    connection.query("SELECT * from session WHERE ")
})

//end of display session details

//start of get session-id mysql

app.get('/get-session-id-mysql', function (req, res){



var sessionID = req.query.room_id

connection.query("SELECT * from session WHERE room_id = ? ", [sessionID], function(err, results, fields){
    
    if (err){
        console.log("error in database.js");
        console.log(err);
        return res.status(209).send(JSON.stringify({msg: err}));
    } else if (results.length > 0){
        console.log("ONLY ONE RESULT RETURNED, SOMETHING's RIGHT");
        const firstResult = results[0];
        
        const response = {
            session_id: firstResult.session_id,
            user_id: firstResult.user_id,
            session_description: firstResult.session_description,
            number_of_users: firstResult.number_of_users,
            room_id: firstResult.room_id
        }
        
return res.status(200).send(JSON.stringify(response));

    }


})

})






//start of joinSession
app.get("/join-session-mysql", function (req, res){
    var it = req.query.room_id;
console.log("Line 279 in database.js without error");
    
connection.query("SELECT * FROM session WHERE room_id = ?", it, function(err, results, fields){

if (err){   
    console.log("Something went wrong.");
    console.log(err)
    return res.status(209).send(JSON.stringify({msg: err}));
} else if (results.length > 0){
    console.log("Number of results with the room ID of " + it +  ": " + results.length)
    const firstResult = results[0];
        
        const response = {
            session_id: firstResult.session_id,
            user_id: firstResult.user_id,
            session_description: firstResult.session_description,
            number_of_users: firstResult.number_of_users,
            room_id: firstResult.room_id
        }





    return res.status(200).send(JSON.stringify(response));


} else if (results.length === 0 ){
    console.log("No results found. Invalid room ID");
}
console.log("joinSession is finished ");
return results;

})


})

//start of save-text
app.post("/save-text-mysql",function(req, res){
    var data = {
          session_id  : req.body.session_id,
           text : req.body.text, 
           user_id : req.body.user_id
    }

connection.query("INSERT INTO text SET ?", data, function(err){

if (err){
    console.log("error occured when saving text to database");
    console.log(err);
    return res.status(205).send(JSON.stringify({msg: err}));

} else{
    return res.status(201).send(JSON.stringify({msg: "SUCCESS"}));
}

})

}) //end of save text


app.post('/increase-numberOfUsers-mysql', function(req, res){
    var thing = req.body.room_id;
    console.log("Bababooey." + thing);


connection.query("UPDATE session SET number_of_users = 1 + number_of_users WHERE room_id = ?", thing, function(err){
    
})



})



}; //end of services 


module.exports = services;


