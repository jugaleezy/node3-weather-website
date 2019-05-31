const request = require('request')

const geocode = (address, callback) => {
    //url fetched using mapbox api to get lat,long of place
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token='+process.env.MAPBOX_API+'&limit=1'
    
    request({ url, json: true },(error, {body}) =>{
        if(error){
            callback('Unable to connect to location service.', undefined)
        }
        else if (body.features.length === 0) {
            //console.log(response.body.features.length)
            callback('No Such Place Found! Try Again.', undefined)
        }
        else {
            const longitude = body.features[0].center[0]
            const latitude = body.features[0].center[1]
            const location = body.features[0].place_name
            callback(undefined, { latitude,
                longitude,
                location
            })
        }
    })
}

module.exports = geocode