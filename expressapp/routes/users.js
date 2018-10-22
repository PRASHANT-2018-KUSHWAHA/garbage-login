var express = require('express');
var router = express.Router();
var User = require('../models/user');


/* GET users listing. */
// router.get('/', function(req, res) {
//   res.send('respond with a resource');
// });

router.post('/register',function(req,res,next){
  addToDb(req,res);
})

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

module.exports = router;
