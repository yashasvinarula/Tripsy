var express = require('express');
var path = require('path');
var app = express();
const axios = require('axios');
var firebase = require("firebase");


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/',function(req,res){
    res.render("index");
});

app.post('/', function(req,res){
    
    var source = req.body.source;
    var destination = req.body.destination;
    console.log(source);
    console.log(destination);
    axios.get('https://maps.googleapis.com/maps/api/directions/json?origin=' + source + '&destination=' + destination + '&mode=transit&key=AIzaSyBWkOzyaE4txv7CIklsS5a8UdSeJzKuMEY')
  .then(function(myJson) {
      const datas = [];
        // const steps = myJson.data.routes[0].legs[0].steps;
        for(var j=0;j<myJson.data.routes[0].legs.length;j++){
        const steps = myJson.data.routes[0].legs[j].steps;
        // res.json(myJson.data.routes[0].legs[0].arrival_time.text);
        
        for(let i = 0 ; i<steps.length; i++){
          
              if(steps[i].travel_mode === 'TRANSIT'){
                    const obj = {};
                    obj.html_instructions = steps[i].html_instructions;
                    obj.distance = steps[i].distance.text;
                    obj.duration = steps[i].duration.text;
                    obj.name = steps[i].transit_details.line.name || steps[i].transit_details.line.short_name;
                    obj.type = steps[i].transit_details.line.vehicle.type;
                    obj.arrival_time = myJson.data.routes[0].legs[j].arrival_time.text
                    datas.push(obj);
              }
        }
            
        }
        console.log(datas);
        
        res.render("search", {
    	  datas: datas
                    });
  });

    
})

app.get('/search',function(req,res){
    res.render("search");
});

const port = process.env.PORT || 8080;
const IP = process.env.IP;


app.listen(port , IP, () => console.log("Hi,I am available", port, IP));