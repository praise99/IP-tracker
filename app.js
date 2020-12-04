const personal_api ='at_KhVeburjETf1JtTU7nkdGdeeh1CRO'
const bypass_cors_url = 'https://cors-anywhere.herokuapp.com/'
const api_uri = 'https://geo.ipify.org/api/'
let current_verion = 'v1'

let current_ip = document.querySelector(".ip")
let current_town = document.querySelector(".town")
let current_zone = document.querySelector(".zone")
let current_isp = document.querySelector(".isp")

// form elements 
const entered_ip = document.querySelector(".top-input")
const search_btn = document.querySelector(".cool")


const headers_option = {
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
}

const map = L.map('mapid', {
    'center': [0,0],
    'zoom': 0,
    'layers': [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          })
    ]
})

updateMarker = (update_marker = [42, 42]) => {
    map.setView(update_marker, 13);
    L.marker(update_marker).addTo(map);
}
getIPDetails = (default_ip) => {
    if(default_ip == undefined){
        var ip_url = `${bypass_cors_url}${api_uri}${current_verion}?apiKey=${personal_api}`
       
    }
    else {
        var ip_url = `${bypass_cors_url}${api_uri}${current_verion}?apiKey=${personal_api}&ipAddress=${default_ip}`
    }
    fetch(ip_url, headers_option)
    .then( results => results.json())
    .then( data => {
        current_ip.innerHTML = data.ip
        current_town.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`
        current_zone.innerHTML = data.location.timezone
        current_isp.innerHTML = data.isp

        // update map marker 
        updateMarker([data.location.lat, data.location.lng])
    })
    .catch(error => {
        alert("Unable to get IP details")
        console.log(error)
    })

}
document.addEventListener('load', updateMarker())

search_btn.addEventListener('click', e => {
    e.preventDefault()
    if (entered_ip.value != '' && entered_ip.value != null) {
        getIPDetails(entered_ip.value)
        return
    }
    alert("Please enter a valid IP address");
})