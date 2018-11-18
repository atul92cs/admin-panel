const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');
const userSchema=mongoose.Schema({
   id:mongoose.Schema.Types.ObjectId,
   email:String,
   password:String
});

const User=module.exports=mongoose.model('User',userSchema);

module.exports.hashPassword=(user,callback)=>{
  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(user.password,salt,(err,hash)=>{
      user.password=hash;
      user.save(callback);
    });
  });
}

module.exports.getUserByEmail=(email,callback)=>{
  const query={email:email};
  User.findOne(query,callback);
}
module.exports.comparePassword=(userPassword,hash,callback)=>{
  bcrypt.compare(userPassword,hash,(err,isMatch)=>{
    if(err)throw err;
    callback(null,isMatch);
  });
}
