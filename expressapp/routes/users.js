var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

/* GET users listing. */
// router.get('/', function(req, res) {
//   res.send('respond with a resource');
// });

router.post('/register',function(req,res,next){
  addToDb(req,res);
});

// saving mondodb data using async function
async function addToDb(req,res){

  var  user = new User({
   email:req.body .email,
   username:req.body.username,
   password:User.hashPassword(req.body.password),
   creation_dt:Date.now()
  });

  try{
    doc = await user.save();
    return res.status(201).json(doc);
  }
  catch(err){
    return res.status(501).json(err);
  }
}


// custom callback from passport.js website

router.post('/login',function(req,res,next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { res.status(501).json(err); }
      return res.status(200).json( {message: 'login success '});
    });
  })(req, res, next);   
});

router.get("/home",isValidUser,function(req,res,next){
  console.log(req.user);
  return res.status(200).json(req.user);  //req.user is a deserialize function will work which we define in passport and it will attached the user 
});

router.get('/logout',isValidUser,function(req,res,next){
  req.logout();  // provided by passport.js
  return res.status(200).json({message: 'Logout success' });
})

//validation function with the help of passport 
function isValidUser(req,res,next){
  
  if(req.isAuthenticated()) next(); // isAuthenticated is a function provided by passport.js
  else return res.status(401).json({message: 'Unauthorised Request'});
}

module.exports = router;
