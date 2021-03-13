require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const cloudinary = require("cloudinary");

require("./cloudinary");
const upload = require("./multer");




const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://admin-bhagyesh:test123@apexevoting.uci1e.mongodb.net/ApexEvoting", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);



//*********************************************************USERS DB_CONFIG**********************************************************************************/
const userSchema = new mongoose.Schema({
    username: {
        type:Number,
        required: true},
    regaccepted: {
        type:Boolean,
        required: true},
    regrejected: {
        type:Boolean,
        required: true},
    accountverified: {
        type:Boolean,
        required: true},
    regrejectcount: {
        type:Number,
        required: true},
    votecasted: {
        type:Boolean,
        required: true},
    profileimage: String,
    aadharfrontimage: String,
    aadharbackimage: String,
    password: String
});
userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(function(User, done) {
    done(null, User);
  });
  
passport.deserializeUser(function(User, done) {
    done(null, User);
  });
//*********************************************************USERS DB_CONFIG FINISH**********************************************************************************/












//*********************************************************USERS ROUTES START***********************************************************************/
//*********************************************************USERS GET ROUTES**************************************************************************/
app.get("/userlogout", function(req, res){
    req.logout();
    res.redirect("/userlogin");
  });
//*********************************************************USERS POST ROUTES**************************************************************************/
app.post("/userreg",upload.fields([{name:"profileimage", maxCount: 1}, {name:"aadharfrontimage", maxCount: 1},{name:"aadharbackimage", maxCount: 1}]), async function(req, res){
    const verify = req.body.accountverified;
    const rejectCount = req.body.regrejectcount;
    const aadharnumber = req.body.username;
        if(verify === "false" || rejectCount>3){
            res.status(401).send({ error: "Not Authorized" });
    }else{
        const pimg = req.files["profileimage"][0].path;
        const afimg = req.files["aadharfrontimage"][0].path;
        const abimg = req.files["aadharbackimage"][0].path;
        const pimgupload = await cloudinary.v2.uploader.upload(pimg, {folder:"users/"+aadharnumber+""});
        const afimgupload = await cloudinary.v2.uploader.upload(afimg, {folder:"users/"+aadharnumber+""});
        const abimgupload = await cloudinary.v2.uploader.upload(abimg, {folder:"users/"+aadharnumber+""});
        User.register({username: req.body.username, regaccepted: false, regrejected: false, accountverified:true, regrejectcount:0, votecasted:false, profileimage: pimgupload.secure_url, aadharfrontimage: afimgupload.secure_url, aadharbackimage: abimgupload.secure_url}, req.body.password, function(err){
            if(err){
                console.log(err);
                res.status(502).send({ error: "Something went wrong!" });
            }else{
                passport.authenticate("local")(req, res, function(){
                    res.send("Successfully registered");
                });
            }
        });
    }    
});
app.post("/userlogin", function(req, res){
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.logIn(newUser, function(err){
        if(err){
            console.log(err);
            res.status(401).send({ error: "Not Authorized" });
        }else{
            passport.authenticate("local")(req, res , function(){
                res.send("Successfully logged in");
            })
        }
    })
});
//*********************************************************USERS ROUTES FINISH***********************************************************************/






app.listen(process.env.PORT || 5000, function() {
    console.log("Server started on port 5000");
  });