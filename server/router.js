const path = require('path');


//Page listeners
var router = function (app) {
    app.get('/', function (req, res) {
    res.status(200).sendFile(path.join(__dirname + "/../client/login-page.html"));
});

//login

app.get('/login-page', function (req, res) {
    res.status(200).sendFile(path.join(__dirname  + "/../client/login-page.html"));
});


//register

app.get('/register-page', function (req, res) {
    res.status(200).sendFile(path.join(__dirname  + "/../client/register-page.html"));
});


}


module.exports= router;