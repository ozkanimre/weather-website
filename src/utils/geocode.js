const request = require('request')
const geocode = (adress, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + adress + '.json?access_token=pk.eyJ1Ijoib3prYW5pbXJlIiwiYSI6ImNrenlsNnRhcDAxZ3EzaW54aWV3ZjljbjkifQ.N6-rJkz3hYFluzjaQR73Cw&limit=1'
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather services.', undefined)
    } else if (body.features.length === undefined) {
      callback('Unable to find location.', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode