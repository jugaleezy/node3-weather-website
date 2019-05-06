const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config.
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location.
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jugal Kamdar'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jugal Kamdar'
    })
})


app.get('/help', (req,res) => {
    res.render('help', {
        title: 'How can i help you?',
        question: 'Can you tell me how to run a js script.',
        name: 'Jugal Kamdar'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({ error: 'Enter the address to search.' })
    }

    const address = req.query.address //address to search
    geocode(address, (geocodeError, { latitude, longitude, location} = {}) => {
        if (geocodeError){
            return res.send({
                error: geocodeError
            })
            //return console.log(geocodeError)
        }
        
        forecast(latitude, longitude, (forecastError, forecastData) => {
            if(forecastError){
                return res.send({ error: forecastError })
                //return console.log(forecastError)
            }
    
            //console.log(location)
            //console.log(forecastData)
            res.send({
                Location: location,
                ForecastData: forecastData,
                Address: address
            })
          })
    })






    // console.log(req.query.search);
    // res.send({today: {
    //     Rain: 30,
    //     temperature: 45.12,
    //     humidity: 30,
    //     Address: req.query.address
    // }})
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Error 404',
        error: 'Help article not found',
        name: 'Jugal Kamdar'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 'Error 404',
        error: 'Page Not Found',
        name: 'Jugal Kamdar'
    })
})

app.listen(port, () => {
    console.log('Express Server started on port '+port)
})