const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=88da48eef17ab6e8135debc26bfce581&query=' + latitude + ',' + longitude + ''
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service.', undefined)
    } else if (body.error) {
      callback('Unable to find location.', undefined)
    } else {
      callback(undefined, 'Weather Desc : ' + body.current.weather_descriptions + ', Temperature : ' + body.current.temperature + ' °C, Feelslike : ' + body.current.feelslike+' °C')
    }
  })
}


module.exports = forecast