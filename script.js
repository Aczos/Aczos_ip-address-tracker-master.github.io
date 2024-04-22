const input = document.querySelector('input');
const ipInfo = document.querySelector('.ip_info');
const locationInfo = document.querySelector('.location');
const timeInfo = document.querySelector('.timezone');
const ispInfo = document.querySelector('.isp');
const btn = document.querySelector('.btn');

const API_LINK = 'https://geo.ipify.org/api/v2/';
const API_KEY = 'at_N8gZcIJPKOl5r6Z23aXCWdzLgFbXK';

const getIp = () => {
    const ipAddress = input.value || '8.8.8.8';
    const URL = `${API_LINK}country,city?apiKey=${API_KEY}&ipAddress=${ipAddress}`;

    fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            ipInfo.textContent = data.ip;
            locationInfo.textContent = `${data.location.city}, ${data.location.country}`;
            timeInfo.textContent = `${data.location.timezone}`;
            ispInfo.textContent = ` ${data.isp}`;

           
            const latitude = data.location.lat;
            const longitude = data.location.lng;
            map.setView([latitude, longitude], 13);

            
            L.marker([latitude, longitude]).addTo(map);
        })
        .catch(error => console.error('Błąd pobierania danych:', error));
}


btn.addEventListener('click', getIp);

var map = L.map('map', { 
    center: [51.505, -0.09], 
    zoom: 13
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

getIp();