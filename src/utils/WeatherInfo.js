const request = require('postman-request');


const getweatherInfo = (longitude,latitude,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=41553c4aecde3ba992dd6f7fc07983d1&query=${latitude},${longitude}`;
    
    request({method:'GET',uri:url,json:true}, function (error, response, body) {
    if(error)
    {
      callback('Unable to connect to WeatherStack Api !',undefined);
    }else if(response.body.error)
    {
      callback('Unable to find weather for given place !.',undefined)
    }
    else{
      const temp = response.body.current.temperature;
      const feellike = response.body.current.feelslike;
      const name = response.body.location.name;
      const region = response.body.location.region
      callback(undefined,{
        temp,
        feellike,
        name,
        region,
        weather_des:response.body.current.weather_descriptions.join()
      })
    }
    });
    }

    module.exports = getweatherInfo