const express = require('express');
const ejs = require('ejs');

const https = require('https');
const bodyParser=require('body-parser');

const app=express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
	res.sendFile(__dirname + "/index.html" );

});

    

	
app.post("/",function(req,res){
	console.log(req.body.cityName);
	const query =req.body.cityName;

	const apiKey="08cabeb469013dcb9c1507db580c3910";
	const unit = "metric";
	const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
	console.log(url);

	https.get(url,function(response){
		console.log(response.statusCode);
		response.on("data",function(data){
			console.log(data);
		const weatherData	= JSON.parse(data);	
		console.log(weatherData);
		
const date = weatherData.main.temp;
console.log(date);
const description = weatherData.weather[0].description;
console.log(description);

const icon =weatherData.weather[0].icon;
const imageURL ="http://openweathermap.org/img/wn/" + icon + "@2x.png";
// res.write("<h1>the temperature in "+query+" is " + date + " " +"degree celcius.</h1>" );
// res.write("<p>the weather is currently " + " " + description + " </p>");

// res.write("<img src =" +imageURL +">");
// res.send();
res.render("home",{query: query , date: date, description: description, imgURL: imageURL });
});
});

});



app.listen(3000,function(){
	console.log("server is running on 3000 port");
});
