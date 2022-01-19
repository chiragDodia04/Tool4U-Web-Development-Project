const express = require("express");
const app = express();
const path = require("path")
var nodemailer = require("nodemailer");
const session = require('express-session');
const MogoDBSession = require('connect-mongodb-session')(session)
const bcrypt = require('bcryptjs');
const flash = require('express-flash')

require("passport")

//Models
const RegisterModel= require("./models/Register")
const ContactModel = require("./models/Contact")

//Mongoose
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

//

const store = new MogoDBSession({
  uri:uri,
  collection:"mySessions",
})


//path
const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));

//app.use(function(req,res,next){

  //res.locals.isAutheticated = req.isAutheticated();
  //next();

//})

app.use(flash());
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.set("view engine","hbs")
app.use(session({
  secret: 'key that sign cookie ',
  resave: false,
  saveUninitialized: false,
  store:store,

}))

console.log(path.join(__dirname, "../public"));


const port = process.env.PORT || 9000;

//Middleware:
const isAuth = (req,res,next) =>{
  if(req.session.isAuth){
    next()
  }
  else{
    res.redirect('login');
  }

}

//app.get("/",(req,res) => {

  //  res.sendFile(__dirname + "/index.html");

//})
//GET Index Starting Page
app.get("/",isAuth,(req,res) =>{

    res.sendFile(__dirname + "/index.html");
    
    
})

//Second Page :-
app.get("/home2",isAuth,(req,res) =>{

  res.sendFile(path.join(__dirname, "../public/home2.html"))
 })

//GET Home Page:-
app.get("/home",(req,res) =>{

     req.session.isAuth= true;
    res.sendFile(path.join(__dirname, "../public/home.html"))
})
//GET contact Page:-
app.get("/contact",(req,res) =>{

  
 res.sendFile(path.join(__dirname, "../public/contactus/contact.html"))
})

app.get("/login",(req,res) =>{

    res.sendFile(path.join(__dirname, "../public/login/login.html"))
})




//login


//Stored data of user
app.post("/register",async(req,res) => {

   try {

    //res.send(req.body.password)
    //res.send(req.body.Fullname)
    //res.send(req.body.contact)
    //res.send(req.body.Email)
    const password =req.body.password;
    const cpassword=req.body.Confirmpasswd;

    if(password == cpassword){

      const hashedPassword = await bcrypt.hash(password,12);

        const RegisterUser = new RegisterModel({

            FullName :req.body.FullName,
            Contact :req.body.Contact,
            EmailID:req.body.EmailID,
            password:hashedPassword,
            Confirmpasswd:hashedPassword

        })

        const registered = await RegisterUser.save();
        req.flash('notify', 'Registration is Successfully Done')
        res.redirect("/login")

        
    }else{
        res.send("password not matching")
    }
       

   } catch (error) {
       res.status(400).send(error)
       
   }
})

//Login Check
app.post("/login",async(req,res) =>{
    try {
       
      req.session.isAuth = true;
      console.log( req.session.id);
        const email = req.body.EmailID;
        const password=req.body.password;


       const userEmail =await RegisterModel.findOne({EmailID:email})        
      // if(userEmail.password === password)
       //{
           
      // }else{
        //   res.send("Invalid Login Detailes");
      // }

       const isMatch = await bcrypt.compare(password,userEmail.password);
       console.log(isMatch);
       if(!isMatch){
            return res.redirect("/login");
       }

       req.session.isAuth =true;
       return res.redirect("/home2");

    } catch (error) {
        res.status(400).send("invalid Email")
    }

})


//Email sending API 
app.post("/contact",async(req,res) =>{

  const {message ,email} = req.body;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: '123tool4u@gmail.com',
          pass: 'tool4u@123'
        }
      });
      
      var mailOptions = {
        from: email,
        to: '123tool4u@gmail.com',
        subject: 'Thanks for your valuable Feedback.',
        text: message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      //console.log(req.body.fname);
      //console.log(req.body.lname);
      //console.log(req.body.email);
      //console.log(req.body.message);

        //Stored The Data in DB
            const ContactUser = new ContactModel({
                fname:req.body.fname,
                lname:req.body.lname,
                email:req.body.email,
                message:req.body.message
            })
            const Contactsaved= await ContactUser.save();
            res.redirect("/contact")

})

//Login and Logout Toggle : -
app.post("/logout",(req,res) =>{

    req.session.destroy((err) =>{
      if(err) throw err;
      console.log("session is destroy");
      res.redirect("/home");
    })    
})




app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})