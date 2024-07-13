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

    console.log("Connected to MySQL");
});


var services  = function(app) {
app.post('/write-record-mysql', function(req, res) {

var data = {                            //confused, but the names have to correlate with the names of the boxes & listener
    bookTitle: req.body.bookTitle,          
    author: req.body.author,
    publisher: req.body.publisher,
    yearPublished: req.body.yearPublished,
    isbn: req.body.isbn
    };

    connection.query("INSERT INTO users SET ?", data, function(err){
        if (err) {
            return res.status(205).send(JSON.stringify ({msg: err}));
            
        } else {
            return res.status(201).send(JSON.stringify({msg: "SUCCESS"}));
        }
    
});
});
};
module.exports = services;