console.log("logic.js called");

center = [40.7, -94.5];
zoom_level = 4;

// Creating a map helps with multiple tile layers (background image of our maps)
let map = L.map('mapid').setView(center, zoom_level);

// Create tile layer (the background of our map)
// this still needs to be added to the tile layer.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// adding streets to the tile layer.
streets.addTo(map);