// save api url to variable
let url = 'https://api.wheretheiss.at/v1/satellites/25544'

// select and set up the span elements on the html page
let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')
let displayUpdateTime = document.querySelector('#iss-update-time')

let update = 10000
let maxFailedAttempts = 3
let issMarker
let icon = L.icon({
    iconUrl: 'iss_icon.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25] // shifts where the icon is relative to the point on the map you're indicating
})

// set the map up
let map = L.map('iss-map').setView([0, 0], 1) // ([starting position], zoom level)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

iss(maxFailedAttempts)   // call function one time to start
// setInterval(iss, update)     // 10 seconds - changed to recursive setTimeout


// set up the iss function from the callback setInterval function
// this gets updated every 10 seconds
function iss(attempts) {

    if (attempts <= 0) {
        alert('Failed to contact server after several attempts.')
        return
    }
// fetch the api data
    fetch(url)
        .then(res => res.json())
        .then( (issData) => {
            console.log(issData)
            let lat = issData.latitude
            let long = issData.longitude
            let updateTime = new Date()
            
            issLat.innerHTML = lat
            issLong.innerHTML = long
            displayUpdateTime.innerHTML = updateTime

            // create marker if it doesnt exist
            // move it if it does exist
            if (!issMarker) {
                // create marker
                issMarker = L.marker([lat, long], {icon: icon}).addTo(map)
            } else {
                // move marker
                issMarker.setLatLng([lat, long])
            }
    })
    .catch( (err) => {
        attempts--
        console.log('ERROR!', err)
    })
    .finally( () => {
        setTimeout(iss, update, attempts)
    })
}