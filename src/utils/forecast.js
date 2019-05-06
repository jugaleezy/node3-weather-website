const request = require('request')

const forecast = (lat, long, callack) => {
    const lat_long = lat + ',' + long
    const url = 'https://api.darksky.net/forecast/28030fced5890112fa07799b7327d046/'+ lat_long + '?units=si'

    request( { url, json: true }, (error, {body}) => {
        if (error) {
            callack("Unable to connect to the service.", undefined)
        }
        else if (body.error) {
            callack("The given location is invalid.", undefined)
        }
        else {
            const rain = body.currently.precipProbability
            const temperature = body.currently.temperature
            const daily = body.daily.data[0].summary
            const show = daily+" It's currently "+temperature+" degree out and there is "+rain+"% chance of rain."
            callack(undefined, show)
        }
    })
}

module.exports = forecast