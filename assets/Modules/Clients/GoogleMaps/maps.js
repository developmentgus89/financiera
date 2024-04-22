function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: 32.518251, lng: -117.112720} // Coordenadas iniciales del mapa
    });

    var geocoder = new google.maps.Geocoder();
    document.getElementById('cp').addEventListener('change', function () {
        geocodePostalCode(geocoder, map, this.value);
    });
}

function geocodePostalCode(geocoder, map, postalCode) {
    geocoder.geocode({ 'address': postalCode }, function (results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            map.setZoom(13); // Ajusta aquí según la precisión deseada
            new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}