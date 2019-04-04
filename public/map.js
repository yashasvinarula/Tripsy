//https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyBWkOzyaE4txv7CIklsS5a8UdSeJzKuMEY
const key = 'AIzaSyBWkOzyaE4txv7CIklsS5a8UdSeJzKuMEY';
fetch('https://maps.googleapis.com/maps/api/directions/json?origin=Madhuban+Chowk&destination=Dwarka+Mor&mode=transit&key=AIzaSyBWkOzyaE4txv7CIklsS5a8UdSeJzKuMEY')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
        console.log(myJson)
        const steps = myJson.routes[0].legs[0].steps;
        for(let i = 0 ; i<steps.length; i++){
              if(steps[i].travel_mode === 'TRANSIT'){
                    const obj = {};
                    obj.html_instructions = steps[i].html_instructions;
                    obj.distance = steps[i].distance.text;
                    obj.duration = steps[i].duration.text;
                    obj.name = steps[i].transit_details.line.name || steps[i].transit_details.line.short_name;
                    obj.type = steps[i].transit_details.line.vehicle.type;
                  //   console.log(steps[i].html_instructions)
                  //   console.log(steps[i].distance.text);
                  //   console.log(steps[i].duration.text);
                  //   console.log(steps[i].transit_details.line.name || steps[i].transit_details.line.short_name);
                  //   console.log(steps[i].transit_details.line.vehicle.type);
                  console.log(obj);
                  
              }
        }
      //   console.log(myJson.routes[0].legs[0].steps)
  });
