var express     = require("express");
var  app         = express();
var  bodyParser  = require("body-parser");
const mongoose    = require("mongoose");
var Sport = require("./models/sportname");
var methodOverride = require("method-override");
var passport = require("passport");
var User = require("./models/user");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

//CONNECTION TO DB
mongoose.connect('mongodb://127.0.0.1:27017/sport', {useNewUrlParser: true});
mongoose.connection.on('error', err => {
    logError(err);
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));


app.use(require("express-session")({
	secret: "Sports page",
	resave: false,
	saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//HOMEROUTE
app.get("/",function(req,res)
{
	res.render("index.ejs");
});


//Auth Routes
//show sign up forms
app.get("/register", function(req, res){
	res.render("register");
})
//Handling user sign ups
app.post("/register", function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log()(err);
			res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/");
		})
	})
})


//LOGIN
//Render login form
app.get("/login", function(req, res){
	res.render("login");
})

//Login logic
app.post("/login",passport.authenticate("local",{
	successRedirect: "/",
	failureRedirect: "/login"
}) ,function(req, res){
	
})

app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
})

//Middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

app.post("/",function(req,res)
{	
    Sport.create(req.body.newteam, function (err,newlyCreated)
    {
        if(err){console.log(err);}
        else{res.redirect("/");}
    });
});




//NEWTEAM ROUTE
app.get("/newteam", function(req,res)
{
    res.render("newteam.ejs");
});


//FOOTBALL
app.get("/football",function(req,res)
{   
    Sport.find({sportname:'Football'},function(err,allsports)
    {
        if(err){console.log(err);}
        else{res.render("show.ejs",{sports:allsports});}
    })
});

//CRICKET
app.get("/cricket",function(req,res)
{   
    Sport.find({sportname:'Cricket'},function(err,allsports)
    {
        if(err){console.log(err);}
        else{res.render("show.ejs",{sports:allsports});}
    })
});

//VOLLEYBALL
app.get("/volleyball",function(req,res)
{   
    Sport.find({sportname:'Volleyball'},function(err,allsports)
    {
        if(err){console.log(err);}
        else{res.render("show.ejs",{sports:allsports});}
    })
});

//THROWBALL
app.get("/throwball",function(req,res)
{   
    Sport.find({sportname:'Throwball'},function(err,allsports)
    {
        if(err){console.log(err);}
        else{res.render("show.ejs",{sports:allsports});}
    })
});

//KOKO
app.get("/koko",function(req,res)
{   
    Sport.find({sportname:'Koko'},function(err,allsports)
    {
        if(err){console.log(err);}
        else{res.render("show.ejs",{sports:allsports});}
    })
});

//BASKETBALL
app.get("/basketball",function(req,res)
{   
    Sport.find({sportname:'Basketball'},function(err,allsports)
    {
        if(err){console.log(err);}
        else{res.render("show.ejs",{sports:allsports});}
    })
});

//VIEW ROUTE
app.get("/view/:id",function(req,res)
{
    Sport.findById(req.params.id, function(err,allsports)
    {
        if(err){res.redirect("/football");}
        else{res.render("show2.ejs",{sports: allsports});}
    })
});

//EDIT ROUTE
app.get("/view/:id/edit",isLoggedIn, function(req,res)
{
    Sport.findById(req.params.id, function(err,allsports)
    {
        if(err){res.redirect("/football");}
        else{res.render("newteam2.ejs",{sports: allsports});}
    }) 
});

//UPDATE ROUTES
app.put("/view/:id",isLoggedIn, function(req,res)
{   
    Sport.findByIdAndUpdate(req.params.id, req.body.newteam, function(err,updatedBlog)
    {
        if(err){res.redirect("/football")}
        else{res.redirect("/football");}
    })
});


//DELETE ROUTE  
app.delete("/view/:id",isLoggedIn, function(req,res)
{
   Sport.findByIdAndRemove(req.params.id, function(err)
   {
       if(err){res.redirect("/football");}
       else{res.redirect("/football");}
   })
});

let port = 12346;
app.listen(process.env.PORT | port, process.env.IP, function()
{
    console.log("sports app has started at localhost:" + port);
});
