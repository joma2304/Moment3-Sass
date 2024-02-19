"use strict";
// Startvy på kartan
let map = L.map('mapid').setView([62.0, 15.0], 5);

// Lägg till en OpenStreetMap-tile layer till kartan
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); 

// Lägg till en sökfunktion
document.getElementById('searchButton').addEventListener('click', search); //Eventlistner för sökknapp

async function search() {
    let query = document.getElementById('searchInput').value;   //Hämtar input i sökfält
    if (query.length > 0) {
        try {
            // Rensa tidigare sökresultat
            map.eachLayer(function (layer) {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

            const response = await fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(query));
            const data = await response.json();
            if (data.length > 0) {
                let lat = parseFloat(data[0].lat);
                let lon = parseFloat(data[0].lon);
                map.setView([lat, lon], 13); // Sätt ny vy till platsen med zoomnivå 13
                L.marker([lat, lon]).addTo(map); // Lägg till en markör på platsen
            } else {
                alert('Platsen hittades inte.'); //Ifall plats ej hittas
            }
        } catch (error) {
            console.error('Något gick fel:', error); //Om error
        }
    } else {
        alert('Ange en plats att söka efter.'); //Ifall sökfält är tomt
    }
}
