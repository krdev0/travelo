'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


class Place {
    id = (Date.now() + '').slice(-10);

    constructor(coords, description) {
        this.coords = coords;
        this.description = description;
    }
}

class Hotel extends Place {
    constructor(coords, description, price) {
        super(coords, description);
        this.price = price;
    }
}

class Activity extends Place {
    constructor(coords, description, type) {
        super(coords, description);
        this.type = type;
    }
}

const hotel1 = new Hotel([39, -12], 'This is cool hotel located in Portugal', 50);
console.log(hotel1);


// Project architecture
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDescription = document.querySelector('.form__input--description');
const inputPrice = document.querySelector('.form__input--price');
const inputActivity = document.querySelector('.form__input--activity');

class App {
    #map;
    #mapEvent;

    constructor() {
        this._getPosition();

        form.addEventListener('submit', this._newPoint.bind(this));
        inputType.addEventListener('change', this._toggleActivityField);
    }

    _getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
                alert('Could not get your location');
            })
        }

    }

    _loadMap(position) {
        const {latitude} = position.coords;
        const {longitude} = position.coords;

        const coords = [latitude, longitude];

        this.#map = L.map('map').setView(coords, 14);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        L.marker(coords).addTo(this.#map)
            .bindPopup('This is my current location')
            .openPopup();

        this.#map.on('click', this._showForm.bind(this));
    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDescription.focus();
    }

    _toggleActivityField() {
        inputPrice.closest('.form__row').classList.toggle('form__row--hidden');
        inputActivity.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newPoint(e) {
        e.preventDefault();

        // Get data from form
        const type = inputType.value;
        const description = inputDescription.value;

        //Check if data from form is valid

        //If its hotel, create hotel object
        if (type === 'hotel') {
            const price = +inputPrice.value;

            if (!Number.isFinite(price)) return alert('Price has to be positive number!');
        }

        //If its activity, create activity object
        if (type === 'activity') {
            const activity = inputActivity.value;
        }

        const {lat, lng} = this.#mapEvent.latlng;
        L.marker([lat, lng]).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: 'place-popup'
            }))
            .setPopupContent('Place')
            .openPopup();
    }
}

const app = new App();
