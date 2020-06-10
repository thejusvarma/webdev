const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//var path = require("path"); 
var Sport = require("./models/sportname");

var port = process.env.PORT | 12345;

//CONNECTION TO DB
/*mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
mongoose.connection.on('error', err => {
    logError(err);
});
*/

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
//app.use(express.static(path.join(__dirname + "public")));


//HOMEROUTE
app.get("/",function(req,res)
{
	/*Sport.find({},function(err,allsports)
    {
        if(err){console.log(err);}
        else{res.render("index.ejs",{sports:allsports});}
    })
    */
   res.render("index.ejs");
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

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`); 
  });
  