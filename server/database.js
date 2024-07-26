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
        return res.status(200).send(JSON.stringify({msg: "LOGIN SUCCESSFUL" }));
        
    } else{
        return res.status(201).send(JSON.stringify({msg:"Invalid email or password." }))
    }



});


})
//end of login-user

//start of sessions
app.get('/sessions-mysql', function(req, res){
    connection.query("SELECT COUNT(*) AS sessionCount FROM session", function(err, results, fields) {
        if (err) {
            console.log("Error querying database:", err);
            return res.status(500).send(JSON.stringify({ msg: "Database error" }));
        }

        const numberOfSessions = results[0].sessionCount;
        console.log("Number of sessions created: " + numberOfSessions);
        module.exports = {numberOfSessions: numberOfSessions};          //added line
        return res.status(200).send(JSON.stringify({ numberOfSessions: numberOfSessions })); 
                 
            //testing out return functions
            

    });

})  
//end of sessions

//start of assign user
app.get("/assign-user-mysql")

//end of assign user


}; //end of services 


module.exports = services;


