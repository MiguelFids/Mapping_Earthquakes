let map = L.map("mapid").setView([39.5, -98.5], 10);
var max_zoom = 4;

let street = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: max_zoom,
    accessToken: API_KEY
}).addTo(map);

let satelliteStreets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: max_zoom,
    accessToken: API_KEY
});

let baseMaps = {
    "Streets": street,
    "Satellite": satelliteStreets
};

let myStyle = {
    color: "#ffffa1",
    weight: 2
}


// logic behind the circle size based off of magnitude
function getRadius(magnitude){
    
    // can't have 0 because that means that the earthquake didn't happen
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
}

// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
// Retrieve the earthquake GeoJSON data.
d3.json("data/all_week.geojson.json").then(function(data) {
    
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {

    // We turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
            console.log(data);
        return L.circleMarker(latlng);
    },

    // bind a popup on each feature clicked
    onEachFeature: function(feature, layer){
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    },
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo
    }).addTo(map);
});

var layerControl = L.control.layers(baseMaps).addTo(map);