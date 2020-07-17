var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};
var map;

function createmap() {

    map = L.map('map').setView([0.5, 102], 13);
    var addis = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        id: 'addis',
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    L.geoJson(coorsField, {
        style: myStyle,
        onEachFeature: onEachFeature
    }).addTo(map);

}

function onEachFeature(feature, layer) {
    var popupContent = "<p>I started out as a GeoJSON " +
        feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

    if (feature.properties && feature.properties.popupContent) {
        popupContent += feature.properties.popupContent;
    }

    layer.bindPopup(popupContent);
}



