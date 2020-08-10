const request = require('postman-request')

const forecast = (latitude, longitude, callback) =>
{
   const url = 'http://api.weatherstack.com/current?access_key=aca89f82323cdb32de18ef9ca248e6a5&query='+latitude+","+longitude+"&units=m"

  request({ url, json:true }, (error, {body}) =>
  {
    if(error){  callback("Unable to connect to weather service!",undefined)  }
    else if(body.error){ callbacK("Unable to find location",undefined) }
    else
    {
      callback(undefined,
      {
        description: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelslike: body.current.feelslike
      })
    }
  })
}

module.exports = forecast
