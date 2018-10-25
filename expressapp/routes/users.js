var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

var name = "";


////////////////////////////////////////////////////////////////////////////////////////
/**
 * for registration
 */
router.post('/register',function(req,res,next){
  addToDb(req,res);
});

////////////////////////////////////////////////////////////////////////////////////////
/**
 * for adding to mongodb
 */
// saving mondodb data using async function
async function addToDb(req,res){

  var  user = new User({
   email:req.body.email,
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

////////////////////////////////////////////////////////////////////////////////////////
/**
 * for login
 */
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
////////////////////////////////////////////////////////////////////////////////////////
/**
 * for user home 
 */
router.get("/home",isValidUser,function(req,res,next){
  console.log(req.user);
  return res.status(200).json(req.user);  //req.user is a deserialize function will work which we define in passport and it will attached the user 
});
////////////////////////////////////////////////////////////////////////////////////////
/**
 * for logout
 */
router.get('/logout',isValidUser,function(req,res,next){
  req.logout();  // provided by passport.js
  return res.status(200).json({message: 'Logout success' });
})
/////////////////////////////////////////////////////////////////////////////////////////
/**
 * for reset password
 */
router.post('/resetPassword',isValidEmail, function(req, res, next) {
   reset(req,res);
   console.log("pkppkp");
   if(err){
    return res.status(501).json(err);
   }
   return res.status(200).json( {message: 'Reset password success '});
});

function reset(req,res){

  return new Promise((resolve,reject)=>{
    User.findOneAndUpdate({'email': req.body.email },{ $set: { password: User.hashPassword(req.body.newPassword) }})
        .exec()
      
      .then((data)=>{
        console.log("from reset function");
        
        console.log(data);
        if(data){
            resolve(data)
        }else{
          reject(err)
        }
      }).catch('error');
    });
    
  }
 

/////////////////////////////////////////////////////////////////////////////////////////
/**
 * for forgot user name
 */
const nodemailer = require('nodemailer');
router.post('/forgotUsername',isValidEmail, function(req, res, next) {
        
        nodemailer.createTestAccount((err, account) => {
           
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 25,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'pktestmail55@gmail.com', // generated ethereal user
                    pass: '7597419907' // generated ethereal password
                }
            });

            let mailOptions = {
                from: '"Fred Foo 👻" <pktestmail55@gmail.com>', // sender address
                to: req.body.email, // list of receivers
                subject: 'Username ✔', // Subject line
                text: "user name",// plain text body
                html: '<b>we can understand that everyone makes mistakes of we  help you to remember your User Name:  </b></br>'+
                name               
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', req.body.email);
                console.log('username: %s', name);
                
            });
        });
        return res.status(200).json({message: 'mail sended success' });  
    });
    

////////////////////////////////////////////////////////////////////////////////////////
/**
 * validations functions
 */

//validation function with the help of passport 
function isValidUser(req,res,next){
  
  if(req.isAuthenticated()) next(); // isAuthenticated is a function provided by passport.js
  else return res.status(401).json({message: 'Unauthorised Request'});
}

//validation function for email
function isValidEmail(req,res,next){
  
  return new Promise((resolve, reject) => {
    console.log("pk");
    User.find({'email': req.body.email })
        .exec()
        .then((data) => {
            if (data && data.length > 0) {
              name = data[0].username;
              console.log(data);
              console.log(data[0].username);
    
                resolve(data);
                next();
            }else{
                console.log("email is not register")
                reject();
            }
        }).catch('error')
})
}



module.exports = router;
