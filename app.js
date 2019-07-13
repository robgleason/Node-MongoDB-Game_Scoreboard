
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

// var highscore = [
//     {name: "Tony", score: "0"},
//     {name: "Miranda", score: "1"},
//     {name: "Justin", score: "2"}
// ]


// var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];
// var scores = ["0", "1", "2", "3", "4"];



app.use(bodyParser.urlencoded({extended: true}));


 
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

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
    // res.send("You hit the post route!")
    // get data from form and add to campgrounds array
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

// Pass they data through the res.render call
// {campgrounds:campgrounds}
// {Name we want to give it(Anything we want):Data we're passing in}


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