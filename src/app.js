const express = require('express')
const path = require('path')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const app = express()
const hbs = require('hbs')
const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const publicDirectoryPath = path.join(__dirname, '../public')

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather App',
        name: 'Aniket Raj'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "You done fucked up bruh"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error)
            return res.send({ error: error })

        forecast(latitude, longitude, (error, foreCastdata) => {
            if (error)
                return res.send({ error: error })
            res.send({
                location: location,
                forecast: foreCastdata
            })
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Aniket Raj'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help'
    })
})

app.get('/help/*', (req, res) => { // '*' indicates that everything else is a match
    res.render('404', {
        title: '404',
        name: 'Aniket',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => { // '*' indicates that everything else is a match
    res.render('404', {
        title: '404',
        name: 'Aniket',
        errorMessage: '404 not found'
    })
})

app.listen(port, () => {
    console.log('Server is up and running')
})


