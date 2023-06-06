const express = require("express");
const app = express();
const https = require("https");
const ejs = require("ejs");
const bodyParser = require("body-parser");


app.use(express.static("public"));
app.use(bodyParser.urlencoded( {extended : true}));
app.set('view engine', 'ejs');


app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

    var cityName = req.body.cityName;
    var apiID = "53c1870a291e24dac3ecc92219d93d16"
    units = "metric";
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiID+"&units="+units;
    https.get(url, function(response){
        response.on("data", function(data){
            var weatherData = JSON.parse(data);
            var temp = weatherData.main.temp;
            var discription = weatherData.weather[0].description;
            var imgID = weatherData.weather[0].icon;
            var imgurl = "https://openweathermap.org/img/wn/" + imgID + "@2x.png";
            console.log(imgurl);
            res.write("<h1>The temperture in ur city is " + temp + " degree celcious</h1>");
            res.write("<p>The discription of the weather in ur city is " + discription + "</p>");
            res.write("<img src=" + imgurl + ">");
        });

    });
});













app.listen(3000, function(){
    console.log("the server has started running on port 3000");
});