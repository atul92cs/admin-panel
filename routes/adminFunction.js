const Admin=require('../models/Admin');
const express=require('express');
const router=express.router();
const localStrategy=require('passport-local').Strategy;
const passport=require('passport');
passport.use(new localStrategy((username,password,done)=>{
  Admin.getAdminbyUsername(username,(err,admin)=>{
    if (err) throw err;
    if(!user) {
      return done(null,false);
    }
    Admin.comparePassword(password,admin.password,(err,isMatch)=>{
      if(err)throw err;
      if(isMatch)
      {
        return done(null,user);
      }
      else {
        return done(null,false);
      }
    });
  });
}));
router.post('/admin/login',passport.authenticate('local',{
  successRedirect:'/panel',
  failureRedirect:'/admin/login'
}),(req,res)=>{
  res.redirect('/panel');
});
router.get('/logout',(req,res)=>{
  req.logout();
  res.redirect('/admin/login');
});
module.exports = router;
