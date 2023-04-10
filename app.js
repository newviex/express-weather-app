const express = require('express');
const https = require('https');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/public/index.html");
});// end of app.get method

app.post("/",function(req,res){
    //console.log(req.body.cityName);
    
   const query = req.body.cityName;
   const api = "<put your api key here>";
   const units = "metric";
   const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + api;

    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const icon = weatherData.weather[0].icon;
            console.log(icon);
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            
            res.setHeader("Content-tytpe", "text/html");
           
            res.write("<img src=" + imageURL + ">");
    
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius</h1>");
            res.write("<p>The weather is currently " + weatherDescription + " </p>");
            res.send();
        }); // end of response.on method
        
    }); // end of  https.get method
   
        
});


app.listen(3000, function(){
    console.log('Server is running on port 3000');
});

/*

  //const url = 'https://api.openweathermap.org/data/2.5/weather?q=Manila&units=metric&appid=<put your apikey here>';
   //const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=<put your apikey here>";
   const query = "New York";
   const api = "<put your apikey here>";
   const units = "metric";
   const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + api;

    https.get(url,function(response){
        //console.log(response);
        console.log(response.statusCode);
        response.on("data", function(data){
            // console.log(data);
            const weatherData = JSON.parse(data);
            const icon = weatherData.weather[0].icon;
            console.log(icon);
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            //const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            // store the icon value into a const variable called icon
            // Coding solution
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            //res.send("<h1>The temperature in Manila is " + temp + " </h1>degrees Celsius");
            res.write("<img src=" + imageURL + ">");
            //res.write( ' <img src= " ' + imageURL +  '">');
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius</h1>");
            res.write("<p>The weather is currently " + weatherDescription + " </p>");
            res.send();
        }); // end of response.on method
        
    }); // end of  https.get method
   
    // res.send('Server is up and running');
 

    // app.use(express.static('public'));

*/