'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--description');
const inputDuration = document.querySelector('.form__input--price');

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        const {latitude} = position.coords;
        const {longitude} = position.coords;

        const coords = [latitude, longitude];

        const map = L.map('map').setView(coords, 14);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker(coords).addTo(map)
            .bindPopup('This is my current location')
            .openPopup();

        map.on('click', function (mapEvent) {
            form.classList.remove('hidden');
            // const {lat, lng} = mapEvent.latlng;
            //
            // L.marker([lat, lng]).addTo(map)
            //     .bindPopup(L.popup({
            //         maxWidth: 250,
            //         minWidth: 100,
            //         autoClose: false,
            //         closeOnClick: false,
            //         className: 'place-popup'
            //     }))
            //     .setPopupContent('Place')
            //     .openPopup();
        });
    }, function () {
        alert('Could not get your location');
    })
}

