const mongoose = require("mongoose")

const uri ="mongodb+srv://Ankush:Ankush01@tool4u.iwfay.mongodb.net/Tool4u?retryWrites=true&w=majority"
mongoose.connect(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => {
  console.log("MongoDB Connected…")
})
.catch(err => console.log(err))

//create Schema

const userSchema ={
  FullName : String,
  Contact :Number,
  EmailID:String,
  password:String,
  ConfirmPasswd:String
}

const User = mongoose.model("User",userSchema);
