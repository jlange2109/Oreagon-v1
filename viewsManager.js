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
 * Created on 12/30/2017, 3:29 PM (MEZ).
 * Please keep in mind, that you're not allowed to use parts of this
 * code in private use.
 */

exports.viewsManager = function() {
	app.use("/css",express.static(__dirname + "/views/css"));
	var urlencodedParser = bodyParser.urlencoded({ extended: false });

	app.get('/', function(req, res) {
		printRequest(req, "Request", "/")
		languageChecker(req)

		if(offline == 1) {
				res.render('pages/offline', {
					lang: lang
				});
		} else {
			if (isLoggedIn(req)) {
				user = 1;

				var sql = "SELECT * FROM Accounts WHERE AccountID='"+ req.session.userid + "'";
	    		db.query(sql, function (err, result) {
	      			var profile =  result[0];

					res.render('pages/index', {
						lang: lang,
						profile: profile
					});
	    		});
			} else {
				res.render('pages/index', {
					lang: lang
				});
			}
		}
	});

	app.get('/profile', function(req, res) {
		languageChecker(req)
		printRequest(req, "Request", "/profile")
		if (isLoggedIn(req)) {
			user = 1;
			own_profile = 1;
			var sql = "SELECT * FROM Accounts WHERE AccountID='"+ req.session.userid + "'";
    		db.query(sql, function (err, result) {
      			var profile =  result[0];

				res.render('pages/profile', {
					lang: lang,
					profile: profile
				});
    		});
		} else {
			res.redirect('/login')
		}
	});

	app.get('/login', function(req, res) {
		printRequest(req, "Request", "/login")
	    res.render('pages/login');

	});

	app.get('/about', function(req, res) {

		languageChecker(req);
		printRequest(req, "Request", "/about")
		if (isLoggedIn(req)) {
			user = 1;

			var sql = "SELECT * FROM Accounts WHERE AccountID='"+ req.session.userid + "'";
    		db.query(sql, function (err, result) {
      			var profile =  result[0];

				res.render('pages/about', {
					lang: lang,
					profile: profile
				});
    		});
		} else {
			res.render('pages/about');
		}

	});

	app.get('/terms', function(req, res) {
		printRequest(req, "Request", "/terms")
		languageChecker(req);
		if (isLoggedIn(req)) {
			user = 1;

			var sql = "SELECT * FROM Accounts WHERE AccountID='"+ req.session.userid + "'";
    		db.query(sql, function (err, result) {
      			var profile =  result[0];

				res.render('pages/terms/index', {
					lang: lang,
					profile: profile
				});
    		});
		} else {
			res.render('pages/terms/index');
		}

	});

	app.get('/privacy', function(req, res) {
		printRequest(req, "Request", "/privacy")
		languageChecker(req);
		if (isLoggedIn(req)) {
			user = 1;

			var sql = "SELECT * FROM Accounts WHERE AccountID='"+ req.session.userid + "'";
    		db.query(sql, function (err, result) {
      			var profile =  result[0];

				res.render('pages/privacy/index', {
					lang: lang,
					profile: profile
				});
    		});
		} else {
			res.render('pages/privacy/index');
		}

	});

	app.get('/signup', function(req, res) {
		printRequest(req, "Request", "/signup")
	    res.render('pages/register');
	});

	app.get('/logout', function(req, res) {
		printRequest(req, "Request", "/logout")
	    req.session.loggedin = 0;
	    res.redirect('http://localhost');
	});

	app.post('/login', urlencodedParser, function(req, res) {
		printRequest(req, "Post", "/login")
		AccountManager.Login(res, req, req.body.email, req.body.password)
	});

	app.post('/register', urlencodedParser, function(req, res) {
		printRequest(req, "Post", "/signup")
		AccountManager.Register(res, req, req.body.email, req.body.password)
	});

	app.get('/profile/:id', function(req, res) {

 		var profile_id = req.param('id')
 		console.log("\x1b[36mOreagon \x1b[37m=> \x1b[32mRequest: /profile/" + profile_id +" \x1b[32m,\x1b[36m Date: " + getDateTime())
 		languageChecker(req)
 		own_profile = 0

		if (isLoggedIn(req)) {
			user = 1;
		}

		if(profile_id == req.session.userid) {
			own_profile = 1;
		}

		var sql = "SELECT * FROM Accounts WHERE AccountID='"+ profile_id + "'";
		db.query(sql, function(err, results) {
    		numRows = results.length;
    		if(numRows == 1) {
    			db.query(sql, function (err, result) {
	      			var profile =  result[0];

					res.render('pages/profile', {
						lang: lang,
						profile: profile
					});
	    		});
    		} else {
    			res.redirect('/not_found')
    		}
		});
	});

	/* Developers */
	app.get('/developers', function(req, res){
		printRequest(req, "Request", "/developers")
		languageChecker(req)

  		if (isLoggedIn(req)) {
			user = 1;

			var sql = "SELECT * FROM Accounts WHERE AccountID='"+ req.session.userid + "'";
    		db.query(sql, function (err, result) {
      			var profile =  result[0];

				res.render('pages/developers/index', {
					lang: lang,
					profile: profile
				});
    		});
		} else {
			res.render('pages/developers/index');
		}
	});

	app.get('*', function(req, res){
		languageChecker(req)
		printRequest(req, "Request", "/404")
  		if (isLoggedIn(req)) {
			user = 1;

			var sql = "SELECT * FROM Accounts WHERE AccountID='"+ req.session.userid + "'";
    		db.query(sql, function (err, result) {
      			var profile =  result[0];

				res.render('pages/not_found', {
					lang: lang,
					profile: profile
				});
    		});
		} else {
			res.render('pages/not_found');
		}
	});


	function languageChecker(req) {
		if(req.acceptsLanguages('en-gb')) {
			var lang = LanguageManager.getEnglishGBLanguagePhrases()
		} else if(req.acceptsLanguages('en-us')) {
			var lang = LanguageManager.getEnglishUSLanguagePhrases()
		} else if(req.acceptsLanguages('zh-cn')) {
			var lang = LanguageManager.getMandarinLanguagePhrases()
		} else if(req.acceptsLanguages('de-de')) {
			var lang = LanguageManager.getGermanLanguagePhrases()
		} else if(req.acceptsLanguages('fr-fr')) {
			var lang = LanguageManager.getFrenchLanguagePhrases()
		} else if(req.acceptsLanguages('es-es')) {
			var lang = LanguageManager.getSpanishLanguagePhrases()
		} else {
			var lang = LanguageManager.getEnglishLanguagePhrases()
		}
	}

	function isLoggedIn(req) {
		if(req.session.loggedin == 1) {
			return true;
		} else {
			return false;
		}
	}

	function getDateTime() {

	    var date = new Date();

	    var hour = date.getHours();
	    hour = (hour < 10 ? "0" : "") + hour;

	    var min  = date.getMinutes();
	    min = (min < 10 ? "0" : "") + min;

	    var sec  = date.getSeconds();
	    sec = (sec < 10 ? "0" : "") + sec;

	    var year = date.getFullYear();

	    var month = date.getMonth() + 1;
	    month = (month < 10 ? "0" : "") + month;

	    var day  = date.getDate();
	    day = (day < 10 ? "0" : "") + day;

	    return month + "/" + day + "/" + year + " " + hour + ":" + min + ":" + sec;

	}


	function printRequest(req, type, url) {
		var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
		console.log("\x1b[36mOreagon \x1b[37m=> \x1b[32m"+ type +": "+ url +" \x1b[32m,\x1b[36m Date: " + getDateTime() + ", IP: " + ip + "\x1b[0m")
	}
}
