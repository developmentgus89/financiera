function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: 32.518251, lng: -117.112720 } // Coordenadas iniciales del mapa
    });

    var geocoder = new google.maps.Geocoder();
    var marker = null; // Inicializa la variable marcador

    document.getElementById('cp').addEventListener('change', function () {
        geocodePostalCode(geocoder, map, this.value, marker);
    });
}

function geocodePostalCode(geocoder, map, postalCode, marker) {
    geocoder.geocode({ 'address': postalCode }, function (results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            map.setZoom(17); // Ajusta el zoom para un enfoque más cercano

            // Verifica si el marcador ya existe
            if (marker && marker.setMap) {
                // Mueve el marcador existente
                marker.setPosition(results[0].geometry.location);
            } else {
                // Crea un nuevo marcador si no existe uno
                marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    draggable: true // Hace que el marcador sea arrastrable
                });

                var posi = marker.getPosition();

                document.getElementById('latitud').value = posi.lat();
                document.getElementById('longitud').value = posi.lng();
               
                marker.addListener('dragend', function() {
                    var pos = marker.getPosition(); 
                    console.log(pos.lat(), pos.lng());
                    document.getElementById('latitud').value = Math.trunc(pos.lat() * 1e6) / 1e6 ;
                    document.getElementById('longitud').value = Math.trunc(pos.lng() * 1e6) / 1e6 ;
                    
                });
            }
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
