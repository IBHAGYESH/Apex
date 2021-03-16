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
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;
const dbname = process.env.DB_NAME;
mongoose.connect("mongodb+srv://"+username+":"+password+"@apexevoting.uci1e.mongodb.net/"+dbname, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);


//*********************************************************ADMIN AREA DB_CONFIG***********************************************************************/
// ADMIN REGISTRATION AND LOGIN 
const adminSchema = new mongoose.Schema({
    fname: {
        type:String,
        required: true},
    lname: {
        type:String,
        required: true},
    username: {
        type:String,
        required: true},
    password: String
});
adminSchema.plugin(passportLocalMongoose);
const Admin = new mongoose.model("Admin", adminSchema);
passport.use(Admin.createStrategy());
passport.serializeUser(function(Admin, done) {
    done(null, Admin);
  });
  
passport.deserializeUser(function(Admin, done) {
    done(null, Admin);
  });

// AADHAR DATA CRUD
const adataSchema = new mongoose.Schema({
    fname: {
        type:String,
        required: true},
    lname: {
        type:String,
        required: true},
    username: {
        type:String,
        required: true},
    dob: {
        type:Date,
        required: true},
    gender: {
        type:String,
        required: true},
    address: {
        type:String,
        required: true},
    pincode: {
        type:Number,
        required: true},
    mobileNumber: {
        type:Number,
        required: true},
    aadharNumber: {
        type:Number,
        required: true}
});
const Adata = new mongoose.model("Adata", adataSchema);
//AREA DB 
const areaSchema = new mongoose.Schema({
    state:String,
    city:{name:String, Constituency:{name:String}} 
    
})
const Area = new mongoose.model("Area", areaSchema);

//*********************************************************ADMIN AREA DB_CONFIG FINISH***********************************************************************/

//*********************************************************PARTY ADMIN AREA DB_CONFIG***********************************************************************/
const partyAdminSchema = new mongoose.Schema({
    fname: {
        type:String,
        required: true},
    lname: {
        type:String,
        required: true},
    username: {
        type:String,
        required: true},
    partyname: {
        type:String,
        required: true},
    partyinfo: {
        type:String,
        required: true},
    partylogo: String,
    password: String
});
partyAdminSchema.plugin(passportLocalMongoose);
const PartyAdmin = new mongoose.model("PartyAdmin", partyAdminSchema);
passport.use(PartyAdmin.createStrategy());
passport.serializeUser(function(PartyAdmin, done) {
    done(null, PartyAdmin);
  });
  
passport.deserializeUser(function(PartyAdmin, done) {
    done(null, PartyAdmin);
  });
//*********************************************************PARTY ADMIN AREA DB_CONFIG FINISH***********************************************************************/

//*********************************************************PARTY MEMBER AREA DB_CONFIG***********************************************************************/
const partyMemberSchema = new mongoose.Schema({
    fname: {
        type:String,
        required: true},
    lname: {
        type:String,
        required: true},
    username: {
        type:String,
        required: true},
    partyname: {
        type:String,
        required: true},
    votes: {
        type:Number,
        required: true},
    verifiedposition:{
        type:Boolean,
        required: true},
    elected:{
        type:Boolean,
        required: true},
    state: String,
    cast: String,
    Constituency:String,
    photo:String,
    partylogo: String,
    password: String
});
partyMemberSchema.plugin(passportLocalMongoose);
const PartyMember = new mongoose.model("PartyMember", partyMemberSchema);
passport.use(PartyMember.createStrategy());
passport.serializeUser(function(PartyMember, done) {
    done(null, PartyMember);
  });
  
passport.deserializeUser(function(PartyMember, done) {
    done(null, PartyMember);
  });
//*********************************************************PARTY MEMBER AREA DB_CONFIG FINISH***********************************************************************/

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











//*********************************************************ADMIN AREA ROUTES START***********************************************************************/
//*********************************************************ADMIN AREA GET ROUTES***********************************************************************/
app.get("/", function(req, res){
    if(req.isAuthenticated()){
        res.render("adminhome");
    }else{
        res.redirect("/adminlogin");
    }
});
app.get("/adminlogin", function(req, res){
    res.render("adminlogin");
});
app.get("/adminreg", function(req, res){
    res.render("adminreg");
});
app.get("/adminhome", function(req, res){
    if(req.isAuthenticated()){
        res.render("adminhome");
    }else{
        res.redirect("/adminlogin");
    }
})
app.get("/adminlogout", function(req, res){
    req.logout();
    res.redirect("/");
  });
app.get("/adata", function(req, res){
    if(req.isAuthenticated()){
        res.render("adata");
    }else{
        res.redirect("/adminlogin");
    }
});
app.get("/newadata", function(req, res){
    if(req.isAuthenticated()){
        res.render("newadata");
    }else{
        res.redirect("/adminlogin");
    }
});
app.get("/getadata", function(req, res){
    Adata.findOne({
        $and :[{aadharNumber:req.body.aadharnumber}, {mobileNumber:req.body.mobilenumber}]
    }, function(err, foundUser){
        if(foundUser){
            res.send(foundUser);
        }else{
            res.status(404).send({ error: "Not Found" });
        }
    });
});
app.get("/userverification", function(req, res){
    if(req.isAuthenticated()){
        User.aggregate([
            { $match : { "regaccepted" : false, "regrejected": false } },
            {
              $lookup:
                {
                  from: "adatas",
                  localField: "username",
                  foreignField: "aadharNumber",
                  as: "userinfo"
                }
           },
           
           { $unwind : "$userinfo" }
         ]).exec(function(err,results){
             if(err) throw err;
             res.render("userverification", {newListItems: results});
            });
        // User.find({regaccepted:false}, function(err, foundItems){
        //     if (foundItems) {
        //         console.log(foundItems);
        //         res.render("userverification", {newListItems: foundItems});
        //     } else {
        //         res.status(404).send({ error: "Not Found" });
        //     }
        //   });
    }else{
        res.redirect("/adminlogin");
    }
});
//*********************************************************ADMIN AREA POST ROUTES***********************************************************************/  
app.post("/adminreg", function(req, res){
    Admin.register({username: req.body.username, fname: req.body.fname, lname: req.body.lname}, req.body.password, function(err){
        if(err){
            console.log(req.body.password);
            console.log(err);
            res.redirect("/adminreg");
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/adminhome");
            })
        }
    } )    
});
app.post("/adminlogin", function(req, res){
    const newAdmin = new Admin({
        username: req.body.username,
        password: req.body.password
    });
    req.logIn(newAdmin, function(err){
        if(err){
            console.log(err);
        }else{
            passport.authenticate("local")(req, res , function(){
                res.redirect("/adminhome");
            })
        }
    })
});
app.post("/newadata", function(req, res){
    const newAdata = new Adata({
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        dob: req.body.dob,
        gender: req.body.gender,
        address: req.body.address,
        pincode: req.body.pincode,
        mobileNumber: req.body.mobilenumber,
        aadharNumber: req.body.aadharnumber
    });
    newAdata.save(function(err){
        if(!err){
            res.redirect("/newadata");
        }else{
            res.status(502).send({ error: "Something went wrong!" });
        }
    });
});
app.post("/regaccept", function(req, res){
    User.updateOne({_id: req.body.accept},{ $set: {regaccepted:true}} ,function(err){
        if(!err){
            res.status(200);
            res.redirect("/userverification")
        }else{
            res.status(502).send({ error: "Something went wrong!" });
        }
    });
});
app.post("/regreject", function(req, res){
    User.updateOne({_id: req.body.reject}, {$set:{regrejected:true }}, {$inc : {regrejectcount : 1}} ,function(err){
        if(!err){
            res.status(200);
            res.redirect("/userverification")
        }else{
            res.status(502).send({ error: "Something went wrong!" });
        }
    });
});
//*********************************************************ADMIN AREA ROUTES FINISH***********************************************************************/




//*********************************************************PARTY ADMIN AREA ROUTES START***********************************************************************/
//*********************************************************PARTY ADMIN AREA GET ROUTES***********************************************************************/
app.get("/partyadminlogin", function(req, res){
    res.render("partyadminlogin");
});
app.get("/partyadminreg", function(req, res){
    res.render("partyadminreg");
});
app.get("/partymemberverification", function(req, res){
    if(req.isAuthenticated()){
        res.render("partymemberverification");
    }else{
        res.redirect("/partyadminlogin");
    }
});
app.get("/partyadminlogout", function(req, res){
    req.logout();
    res.redirect("/partyadminlogin");
  });
//*********************************************************PARTY ADMIN AREA POST ROUTES***********************************************************************/
app.post("/partyadminreg",upload.single("partylogo"), async function(req, res){
    const partyname = req.body.partyname;
    const result = await cloudinary.v2.uploader.upload(req.file.path, {folder:"partylogos/"+partyname+""});
    PartyAdmin.register({username: req.body.username, fname: req.body.fname, lname: req.body.lname, partyname:req.body.partyname, partyinfo:req.body.partyinfo, partylogo:result.secure_url}, req.body.password, function(err){
        if(err){
            console.log(err);
            res.redirect("/partyadminreg");
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/partymemberverification");
            });
        }
    });    
});
app.post("/partyadminlogin", function(req, res){
    const newPartyAdmin = new PartyAdmin({
        username: req.body.username,
        password: req.body.password
    });
    req.logIn(newPartyAdmin, function(err){
        if(err){
            console.log(err);
            res.status(401).send({ error: "Not Authorized" });
        }else{
            passport.authenticate("local")(req, res , function(){
                res.redirect("/partymemberverification");
            })
        }
    })
});
//*********************************************************PARTY ADMIN AREA ROUTES FINISH***********************************************************************/

//*********************************************************PARTY MEMBER AREA ROUTES START***********************************************************************/
//*********************************************************PARTY MEMBER AREA GET ROUTES***********************************************************************/
app.get("/partymemberreg", function(req, res){
    res.render("partymemberreg");
});
app.get("/partymemberlogin", function(req, res){
    res.render("partymemberlogin");
});
app.get("/partymemberhome", function(req, res){
    if(req.isAuthenticated()){
        res.render("partymemberhome");
    }else{
        res.redirect("/partymemberlogin");
    }
})
app.get("/partymemberlogout", function(req, res){
    req.logout();
    res.redirect("/");
  });
//*********************************************************PARTY MEMBER AREA POST ROUTES***********************************************************************/

//*********************************************************PARTY MEMBER AREA ROUTES FINISH***********************************************************************/

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