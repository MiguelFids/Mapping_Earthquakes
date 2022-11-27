// 14.5.5 Mep GeoJSON Line Strings
let torontoData = "data/torontoRoutes.json"

let map = L.map("mapid").setView([43.651070, -79.347015], 5);


// Create tile layer (the background of our map)
// this still needs to be added to the tile layer.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
}).addTo(map); 


//14.5.4
// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let baseMaps = {
    Streets: streets,
    Dark: dark
};

d3.json(torontoData).then(function(data){
    L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr> <h3> Destination: " + feature.properties.dst + "</h3>")
        }
    }).addTo(map)
});

L.control.layers(baseMaps).addTo(map);