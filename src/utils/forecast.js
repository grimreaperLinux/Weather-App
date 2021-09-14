const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=3e36d08c3646b9314b196098baf7e0b8&query=' + latitude + ',' + longitude + ''
  request({ url: url, json: true }, (error, {body}) => {
    if (error)
      callback('Unable to connect to the INTERNET', undefined)
    else if (body.error) {
      callback('Unable to find location', undefined)
    }
    else {
      callback(undefined, 
        "The temperature of the required place is: " +body.current.temperature+ "C"
      )
    }
  })
}

module.exports = forecast

