var express     = require("express");
var  app         = express();
var  bodyParser  = require("body-parser");
const mongoose    = require("mongoose");
var path = require("path"); 
var Sport = require("./models/sportname");

//CONNECTION TO DB
mongoose.connect('mongodb://127.0.0.1:27017/sport', {useNewUrlParser: true});
mongoose.connection.on('error', err => {
    logError(err);
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname + "public")));


//HOMEROUTE
app.get("/",function(req,res)
{
	Sport.find({},function(err,allsports)
    {
        if(err){console.log(err);}
        else{res.render("index.ejs",{sports:allsports});}
    })
});

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
        else{console.log(allsports);
            res.render("show.ejs",{sports:allsports});}
    })
});

let port = 12346;
app.listen(process.env.PORT | port, process.env.IP, function()
{
    console.log("sports app has started at localhost:" + port);
});
