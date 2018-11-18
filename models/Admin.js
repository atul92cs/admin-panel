const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const adminSchema=mongoose.Schema({
  id:mongoose.Schema.Types.ObjectId,
  username:String,
  password:String
});

const Admin=module.exports=mongoose.model('Admin',adminSchema);

module.exports.hashPassword=(admin,callback)=>{
  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(user.password,salt,(err,hash)=>{
      admin.password=hash;
      admin.save(callback);
    });
  });
}

module.exports.getAdminbyUsername=(username,callback)=>{
  const query={username:username};
  Admin.findOne(query,callback);

}

module.exports.comparePassword=(adminPassword,hash,callback)=>{
  bcrypt.compare(adminPassword,hash,(err,isMatch)=>{
    if(err)throw err;
    callback(null,isMatch);
  });
}
