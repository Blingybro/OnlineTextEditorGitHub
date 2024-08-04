const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');


//adding stuff in
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const http = require('http');
const {Server} = require('socket.io');
//end of adding stuff in

const app = express();
app.use(cors());

app.use((req, res, next) => {
res.header('Access-Control-Allow-Orgin', '*'  );
next();
});


const sessionStore = new MySQLStore({
    host: '127.0.0.1',
    user: 'root',
    password: '12345',
    database: '296project'
}) ;

app.use(session({
    secret: 'the_secret_key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));


//also added above line
const socketServer = http.createServer(app);


const io = new Server(socketServer, {
    cors: {
         origin: ["http://localhost:4000", "http://localhost", "127.0.0.1" ], 
                allowedHeaders: ["my-custom-header"],

                credentials: true
    }
});




app.unsubscribe(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/client", express.static(path.resolve(__dirname + '/../client/')))


//new line
//app.use(express.static('public'));



//Make the server
var server;
var port = 4000;
//different way to change the port using OR statements
/*
var port = process.env.PORT || process.env.NODE_PORT \\ 50000:;
*/

//Page listerners
var router = require('./router.js')
router(app);
//service listeners

var services = require('./database.js')
services(app);
//Listen
server = socketServer.listen(port, function(err){
    if (err) throw err;

    console.log("Listening on Port: " + port);
});







//socket logic

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on("join", function(dataIn) {
        var data = JSON.parse(dataIn);
        socket.join(data.room);
    })
    // Handle incoming messages
    socket.on('chat message', (msg) => {
        // Save message to the database
        const query = 'INSERT INTO text (content) VALUES (?)';
        // db.query(query, [msg], (err) => {       //fix this
        //     if (err) {
        //         console.error('Error saving message to the database:', err);
        //         return;
        //     }
        //     Broadcast the message to all clients
        //     io.emit('chat message', msg);
        // });
        console.log("Text was entered in from user");
        io.emit('chat message', msg);
        //sends information over to everyone connected to socket
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});