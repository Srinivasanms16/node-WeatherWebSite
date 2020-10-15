const request = require('postman-request');


const geoCode = (search_term,callback)=>{
    const geoCodingURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${search_term}.json?access_token=pk.eyJ1Ijoic3Jpbml2YXNhbm1zMTYiLCJhIjoiY2tleHY3czFhMDViYjJ0bzhydDYxZzNreiJ9.tPvohyJfy_XBEW_1rMA9xQ&limit=1`
  
    request({method:'GET',uri:geoCodingURL,json:true},(err,response,body)=>{
      if(err)
      {
        callback('Not able to connect to GeoCoding Api !',undefined)
      }else if(response.body.features.length == 0)
      {
        callback('Unable to find latitude and longitude for the given place !.',undefined)
      }
      else
      {
        callback(undefined,{
          full_add:response.body.features[0].place_name,
          longitude:response.body.features[0].center[0],
          latitude:response.body.features[0].center[1]
        })
       
      }
    })
  }

  module.exports = geoCode;