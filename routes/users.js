var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../database/models/users');

var userRouter = express.Router();


// Register
userRouter.get('/', function(req, res){
	console.log("😀");
});

// // Login
userRouter.get('/login', function(req, res){
	res.render('login');
});

// Register User
userRouter.post('/register', function(req, res, err){
	console.log("🤪🤪:" + req +" , " + res);
  var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	// req.checkBody('name', 'Name is required').notEmpty();
	// req.checkBody('email', 'Email is required').notEmpty();
	// req.checkBody('email', 'Email is not valid').isEmail();
	// req.checkBody('username', 'Username is required').notEmpty();
	// req.checkBody('password', 'Password is required').notEmpty();
	// req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  console.log("Register User Name:" + name,password,email,username);

	// var errors = req.validationErrors();

	if(!req.body.name){
		res.render('register',
			"Error in user router post"
		);
	} else {
		var userProps = {
			name: name,
			email: email,
			username: username,
			password: password
		};

		User.createUser(userProps, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		// req.flash('success_msg', 'You are registered and can now login');

		// res.redirect('/users/login');
	}
});


userRouter.post('/login',
  // passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login'})
  function(req, res) {
    console.log("REACHING THE LOGIN");

    res.redirect('/');
});

userRouter.get('/logout', function(req, res){
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/users/login');
});

module.exports = userRouter;