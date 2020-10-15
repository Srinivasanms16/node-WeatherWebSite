const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocoding = require('./utils/geocoding');
const weatherInfo = require('./utils/WeatherInfo');


const server = express();
const Port = process.env.PORT || 3000;

//paths.
const publicFolder = path.join(__dirname,'../public')
const views = path.join(__dirname,'../templates/views');
const partialviews = path.join(__dirname,'../templates/partialviews')

//setting path to server.
server.set('view engine','hbs');
server.set('views',views);
hbs.registerPartials(partialviews)

//to serve the static files (server side rendering)
server.use(express.static(publicFolder))

server.get('',(req,res)=>{
res.render('index',{title:'weather app',name:'Srinivasan Amarnathan'})
})

server.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Srinivasan Amarnathan',
        job:'Software Engineer'})
})

server.get('/help',(req,res)=>{
res.render('help',{
         title:'Help',
         name:'Srinivasan Amarnathan',
        content:'this site is about weather info'})
})

server.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
      return res.send({
          error:'Please send the address in the query string !'
      });
    }
    const address = req.query.address;

    geocoding(address,(error,{full_add,longitude,latitude}={})=>{
        
       if(error)
       {
        return res.send({
            error:error
        });  
       }
       
        weatherInfo(longitude,latitude,(error,{temp,
            feellike,
            weather_des}={})=>{
            if(error)
            {
                return res.send({
                    error:error
                });
            }
            return res.send({
                address:address,
                full_address:full_add,
                temperature:temp,
                feellike:feellike,
                Weather_Description:weather_des
            });  
        })
       
    })
})

server.get('/help/*',(req,res)=>{
    res.render('notfound',{
        title:'404',
        errormessage:'Help article not found !',
        name:'Srinivasan Amarnathan'
    })
})

server.get('*',(req,res)=>{
    res.render('notfound',{
        title:'404',
        errormessage:'404 - Page not found',
        name:'Srinivasan Amarnathan'
    })
})

server.listen(Port,()=>{
    console.log('Server is Started at port 3000 !');
})


