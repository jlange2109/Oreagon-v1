 /*
  * Oreagon.
  *
  * (c) Copyright 2017-present, Oreagon.
  * This software is not intended for the public.
  *
  * ------------------------------------------------------------
  * | This software may not be used, modified or distributed   |
  * | for private or public use. An installation or use of     |
  * | this software is only permitted on Oreagon servers.      |
  * ------------------------------------------------------------
  *
  * Created on 11/24/2017, 11:42 PM (MEZ).
  * Please keep in mind, that you're not allowed to use any parts of this
  * code in private use.
  */

console.log("");

// Requires
express = require('express');
app = express();
mysql = require('mysql');
bodyParser = require('body-parser')
AccountManager = require('./lib/apps/account/init.js')
LanguageManager = require('./lib/apps/language/init.js')
session = require('express-session');
offline = false; // offline mode (true/false)


app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

app.use(function(req, res, next) {
  res.locals.user = req.session.loggedin;
  next();
});

// Our views manager (GET and POST)
vM = require('./viewsManager.js')

// Define our MySQL connection.
db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "oreagon"
});

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Listen the server on port 81
app.listen(81);

// Connect to our database
db.connect(function(err) {
	if(err) {
    offline = true; // activate offline mode
    console.log("\x1b[36mOreagon \x1b[37m=> \x1b[31mCan't connect to database.\x1b[0m")
  } else {
    console.log("\x1b[36mOreagon \x1b[37m=> \x1b[32mConnected to database.\x1b[0m")
  }
});

// Load views
vM.viewsManager();

// Output that we're ready to view the page.
console.log("\x1b[36mOreagon \x1b[37m=> \x1b[32mStarted. \x1b[37m(Version: 0.1-dev)\x1b[0m");
if(offline == true) {
  console.log("\x1b[36mOreagon \x1b[37m=> \x1b[31mOffline mode activated.\x1b[0m")
}
