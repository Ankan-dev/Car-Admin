const Mongoose=require('mongoose');

const userSchema=Mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    }
});

const UserModel=Mongoose.model("UserModel",userSchema);

module.exports=UserModel;