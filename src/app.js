const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views/')
const partialsPath = path.join(__dirname, '../templates/partials/')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    desc: 'real time weather application',
    name: 'Özkan'
  })
})


app.get('/about', (req, res) => {
  res.render('about', {
    title: 'about page',
    desc: 'about page description , about page description ,about page description',
    name: 'Özkan'
  })
})


app.get('/help', (req, res) => {
  res.render('help', {
    title: 'help page',
    desc: 'help page description , help page description ,help page description',
    name: 'Özkan'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address.'
    })
  }

  const address = req.query.address
  geocode(address, (error, { latitude, longitude, location } = {}) => {

    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        location: location,
        forecast: forecastData
      })
    })

  })

})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term.'
    })
  }
  res.send({
    products: []
  })
})






app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 - help article not found',
    desc: 'help article that you looking for is not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 - page not found',
    desc: 'page that you looking for is not found'
  })
})

app.listen(port, () => {
  console.log('server ' + port + ' is up and running')
})