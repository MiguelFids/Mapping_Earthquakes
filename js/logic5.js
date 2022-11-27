// 14.5.5 Mep GeoJSON Line Strings
let torontoNeighborhoodData = "data/torontoNeighborhoods.json"

let map = L.map("mapid").setView([43.651070, -79.347015], 10);

let street = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 10,
    accessToken: API_KEY
}).addTo(map);

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let baseLayers = {
    Streets: street,
    Dark: dark
};

L.control.layers(baseLayers).addTo(map);

d3.json(torontoNeighborhoodData).then(function(data){
    L.geoJSON(data, {
        onEachFeature: function(feature, layer){
            layer.bindPopup("<h3> " + feature.properties.AREA_NAME + " </h3>");
        }
    }).addTo(map);
});

