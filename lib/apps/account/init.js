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
  * Created on 11/24/2017, 11:42 AM (MEZ).
  * Please keep in mind, that you're not allowed to use parts of this
  * code in private use.
  */


  exports.Login = function Login(res, req, Email, Password) {
    var sql = "SELECT * FROM Accounts WHERE Email='"+ Email + "' AND Password='"+ Password + "'";
    var query = db.query(sql, function(err, result) {
      if(result.length == 1) {
        var user_sql = "SELECT AccountID FROM Accounts WHERE Email='"+ Email + "'";
        db.query(user_sql, function (err, result) {
          var userid = result[0].AccountID;
          req.session.loggedin = 1;
          req.session.userid = userid;
          console.log(userid);
          res.redirect('/');
          return true;
        });
      } else {
        res.redirect('/login');
        return false;
      }
    });
  }

  exports.Register = function Register(res, req, Email, Password) {
    var sql = "INSERT INTO Accounts WHERE Email='"+ Email + "' AND Password='"+ Password + "'";
    var query = db.query(sql, function(err, result) {
      if(result.length == 1) {
        req.session.loggedin = 1;
        res.redirect('http://localhost');
        return true;
      } else {
        res.redirect('http://localhost/login');
        return false;
      }
    });
  }

  exports.GetProfileInfo = function GetProfileInfo(ID) {
    var sql = "SELECT * FROM Accounts WHERE AccountID='"+ ID + "'";
    db.query(sql, function (err, result) {
      Email =  result[0].Email;
    });
  }

  exports.loadProfile = function loadProfile(ID) {

    var result = this.GetProfileInfo(1);

    return profile = {
          Email: result.Email
    };
  }
