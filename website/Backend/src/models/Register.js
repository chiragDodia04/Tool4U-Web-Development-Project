const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    FullName : {type:String , required:true},
    Contact : {type:Number , required:true,unique:true},
    EmailID:{type:String , required:true,unique:true},
    password:{type:String , required:true},
    Confirmpasswd:{type:String , required:true}

})

//now we create collection

const Register = mongoose.model("Register",userSchema);
module.exports = Register;

