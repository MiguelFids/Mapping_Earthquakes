// console.log("logic.js called");

// // Creating a map helps with multiple tile layers (background image of our maps)
// // Create the map object with center at the San Francisco airport.
// let map = L.map('mapid').setView([37.6214, -122.3790], 5);

// // Create tile layer (the background of our map)
// // this still needs to be added to the tile layer.
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     accessToken: API_KEY
// }); 

// // LA California
// var marker = L.marker([34.0522, -118.2437]).addTo(map);

// // adding streets to the tile layer.
// streets.addTo(map);

// // looping through var cities to attach to map
// cities.forEach(function(city){
//     // using bindPopup() to add information to the 
//     L.circleMarker(city.location,{
//         radius: city.population/30000,
//         color: "black",
//         fillColor: "#ffffa1"
//     })
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3> Population " + city.population + "</h3>")
//     .addTo(map);
// });

// // add a line from LAX to SFO
// // define the start and stop line coordinates
// // let line = [
// //     [33.9416, -118.4085],
// //     [37.6214, -122.3790]
// // ];

// // define multiple lines in one go
// let twoLines = [
//     [33.9416, -118.4085],
//     [37.6214, -122.3790],
//     [40.7899, -111.9791],
//     [47.4502, -122.3088]
// ];

// // this is the function to add the line to the map.
// L.polyline(twoLines, {
//     color:"yellow"
// }).addTo(map);

// Create the map object with center at the San Francisco airport.
let map = L.map('mapid').setView([37.5, -122.5], 10);

// Create tile layer (the background of our map)
// this still needs to be added to the tile layer.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
}); 

streets.addTo(map);

let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"14",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375, 37.61899948120117]}}
]};

var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name":"Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry":{
        "type":"Point",
        "coordinates": [-104.94404, 39.75621]
    }
};

L.geoJSON(geojsonFeature).addTo(map);

// // Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport).addTo(map);

//14.5.2
// Bind a Popup to the Marker

// // add functionality to a marker
// L.geoJson(sanFranAirport, {
//     pointToLayer: function(feature, latlng){
//         console.log(feature);
//         return L.marker(latlng)
//         .bindPopup("<h2>" + feature.properties.city + "</h2>");
//     }
// }).addTo(map);

// using onEachFeature: callback function
L.geoJSON(sanFranAirport, {
    onEachFeature: function(feature, layer){
        layer.bindPopup("<h2>" + feature.properties.faa + "</h2> <hr> <h3>" + feature.properties.name + "</h3>");
    }
}).addTo(map);