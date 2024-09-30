function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: 32.518251, lng: -117.112720 } // Coordenadas iniciales del mapa
    });

    var geocoder = new google.maps.Geocoder();
    var marker = null; // Inicializa la variable marcador

    document.getElementById('coloniadir').addEventListener('change', function () {

        let calle = document.getElementById('ccalle').value;
        let numexterior = document.getElementById('numexterior').value;
        let numinterior = document.getElementById('numinterior').value;
        let cp = document.getElementById('cp').value;
        let entidaddir = document.getElementById('entidaddir').value;
        let municipiodir = document.getElementById('municipiodir').value;
        let coloniadir = document.getElementById('coloniadir').value;
        geocodeAddress(geocoder, map, calle, numexterior,
            numinterior, coloniadir, municipiodir, entidaddir, cp, marker);
    });
}

function setCustomerMap(lat, long, idCliente) {

    var map = new google.maps.Map(document.getElementById(`mapCustomer${idCliente}`), {
        zoom: 17,
        center: { lat: parseFloat(lat), lng: parseFloat(long) } // Coordenadas iniciales del mapa
    });

    var geocoder = new google.maps.Geocoder();
    var marker = new google.maps.Marker({
        position: { lat: parseFloat(lat), lng: parseFloat(long) },
        map: map,
        title: 'Ubicación del cliente'
    });

    // Crea un InfoWindow para mostrar información adicional al hacer clic en el marcador
    var infoWindow = new google.maps.InfoWindow({
        content: '<strong>Ubicación del Cliente</strong><br>Latitud: ' + lat + '<br>Longitud: ' + long
    });

    // Añade un evento de clic al marcador para abrir el InfoWindow
    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    });
}

function geocodeAddress(geocoder, map, calle, numexterior, numinterior,
    coloniadir, municipiodir, entidaddir, cp, marker) {
    let address = `${calle} ${numexterior} ${numinterior} ${coloniadir} 
        ${municipiodir} ${entidaddir} ${cp}`;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            map.setZoom(17); // Ajusta el zoom para un enfoque más cercano

            // Verifica si el marcador ya existe
            if (marker && marker.setMap) {
                // Mueve el marcador existente
                marker.setPosition(null);
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

                marker.addListener('dragend', function () {
                    var pos = marker.getPosition();
                    console.log(pos.lat(), pos.lng());
                    document.getElementById('latitud').value = Math.trunc(pos.lat() * 1e6) / 1e6;
                    document.getElementById('longitud').value = Math.trunc(pos.lng() * 1e6) / 1e6;

                });
            }
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function initMapRoute(latitud, longitud) {
    // Coordenadas de destino
    const destination = { lat: latitud, lng: longitud }; // Coordenadas de ejemplo (Ciudad de México)
    const map = new google.maps.Map(document.getElementById('mapRoute'), {
        zoom: 7,
        center: destination
    });

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    directionsRenderer.setMap(map);

    // Obtener la ubicación actual
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                // Llamar a la función para calcular y mostrar la ruta
                calculateAndDisplayRoute(directionsService, directionsRenderer, currentLocation, destination);

                // Crear marcador en la ubicación de destino
                const marker = new google.maps.Marker({
                    position: destination,
                    map: map,
                    title: 'Destino'
                });

                // Crear el InfoWindow con el botón para iniciar la navegación
                const infoWindow = new google.maps.InfoWindow({
                    content: `
                        <div style="background-color: rgba(128, 128, 0, 0.7); padding: 10px; border-radius: 5px; color: white;">
                            <strong>Destino al Cliente</strong><br>
                            Latitud: ${destination.lat}, Longitud: ${destination.lng}<br>
                            <div style="text-align: center; margin-top: 10px;">
                                <a href="https://www.google.com/maps/dir/?api=1&origin=${currentLocation.lat},${currentLocation.lng}&destination=${destination.lat},${destination.lng}&travelmode=driving" 
                                        target="_blank">
                                    <button type="button" class="btn btn-primary mt-2">Iniciar Navegación</button>
                                </a>
                            </div>
                        </div>
                    `
                });

                // Abrir el InfoWindow automáticamente en el marcador de destino
                infoWindow.open(map, marker);
            },
            () => {
                alert('Error: No se pudo obtener la ubicación actual.');
            }
        );
    } else {
        alert('Error: El navegador no soporta geolocalización.');
    }
}

// Función para calcular y mostrar la ruta
function calculateAndDisplayRoute(directionsService, directionsRenderer, start, end) {
    directionsService.route(
        {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING // O WALKING, BICYCLING, TRANSIT según lo necesario
        },
        (response, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);
            } else {
                alert('Error: No se pudo calcular la ruta. ' + status);
            }
        }
    );
}

