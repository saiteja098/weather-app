const { json } = require("express");
const express = require("express");
const https = require("node:https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));


app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");

})

app.post("/" , function(req, res){
    const query = req.body.cityName;
    const apiKey = "f4100d35af0a700b3e46ccbf2fe20283";
    const units = "metric";
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;


    https.get(url, function(response){
    console.log(response.statusCode);

     response.on("data", function(data){
         const weatherData = JSON.parse(data);
         const temp = weatherData.main.temp;
         const description = weatherData.weather[0].description;
         const icon = weatherData.weather[0].icon;
         const imageUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";

         

         res.write("<h1>the temperature in "+query+" is "+ temp +"  degree celsius</h1>");
         res.write("the weather is currently " + description);
         res.write("<img src= "+imageUrl+">");
         res.send();
      })

  })

})

app.listen(3000, function(){
    console.log("server is up and running at 3000.")
})


