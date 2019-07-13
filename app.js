
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose =require("mongoose");

mongoose.connect("mongodb://localhost/space_rocks");


//Schema Setup
var scoreSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Scoreboard = mongoose.model("Scoreboard", scoreSchema);





app.use(bodyParser.urlencoded({extended: true}));


 


app.set("view engine", "ejs");

//Landing Page
app.get("/", function(req, res){
    res.render("spacerocks");
});

app.get("/scoreboard", function(req, res){
    // Get all campgrounds from db
    Scoreboard.find({}, function(err, allscoreboards){
        if(err){
            console.log(err);
        } else {
        res.render("scoreboard",{scoreboards:allscoreboards});

        }
    });
});

app.post("/scoreboard", function(req, res){
 
    var name = req.body.name;
    var image= req.body.image;
    var newScoreboard = {name: name, image: image}
    // Create a new campground and save to DB
    Scoreboard.create(newScoreboard, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/scoreboard");
        }
    });
    
});




app.get("/scoreboard/new", function(req, res){
    res.render("new.ejs");
});
//this will show the form that sends the data to the post route








app.get("/cat", function(req, res){
    res.send("Hi Kat!");
});

app.get("*", function(req, res){
    res.send("You are a star!!!");
});

 
app.listen(3000, function(){
    console.log("Server has started!!!");
})