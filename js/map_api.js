var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};
var map;


function style(feature) {
    return {
        fillColor: getColor(feature.properties.pm25_avg),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}


function createmap() {

    map = L.map('map').setView([51.4416, 5.4697], 13);
    var addis = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        id: 'addis',
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    L.geoJson(coorsField, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);

}

function getColor(d) {
    return d > 18.2 ? '#800026' :
        d > 18.0  ? '#BD0026' :
            d > 17.8  ? '#E31A1C' :
                d > 17.6  ? '#FC4E2A' :
                    d > 17.4   ? '#FD8D3C' :
                        d > 17.2   ? '#FEB24C' :
                            d > 17   ? '#FED976' :
                                '#FFEDA0';
}

function onEachFeature(feature, layer) {
    var popupContent = "PM2.5 = ";

    if (feature.properties && feature.properties.pm25_avg) {
        popupContent += feature.properties.pm25_avg;
    }

    layer.bindPopup(popupContent);
}



