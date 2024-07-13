const  express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();

app.use(cors());

app.use((req, res, next) => {
res.header('Access-Control-Allow-Orgin', '*'  );
next();
});


app.unsubscribe(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/client", express.static(path.resolve(__dirname + '/../client/')))



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
server = app.listen(port, function(err){
    if (err) throw err;

    console.log("Listening on Port: " + port);
})