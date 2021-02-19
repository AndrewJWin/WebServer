let center = [39.721337, -101.508596]  // Array of latitude and longitude 
let zoomLevel = 4.4  // 1 = whole world, 10 = large city, 20 = city blocks

// Create the map 
let map = L.map('bridge-map').setView(center, zoomLevel)

// Add the tile layer - roads, streets etc. Without this, nothing to see 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copywrite">OpenStreetMap</a>',    
}).addTo(map)

// Custom Icon - utilizes the bridgeIcon in the base of the folder.
var myIcon = L.icon({
    iconUrl: 'bridgeIcon.png',
    iconSize: [51.2, 51.2]
});

// List of bridges.
bridges =  [
    {"name": "Verrazano-Narrows Bridge", "span": "1298.4", "coordinates": [40.6066, -74.0447] }, 
    {"name": "Golden Gate Bridge", "span": "1280.2", "coordinates": [37.8199, -122.4783] }, 
    {"name": "Mackinac Bridge", "span": "1158.0", "coordinates": [45.8174, -84.7278] }, 
    {"name": "George Washington Bridge", "span": "1067.0", "coordinates": [40.8517, -73.9527] }, 
    {"name": "Tacoma Narrows Bridge", "span": "853.44", "coordinates": [47.2690, -122.5517] }
];

// Looping through and adding the bridges, in case a new long bridge is made.
for (bridge of bridges) {
    marker = L.marker(bridge.coordinates, {icon: myIcon})
    .bindPopup(`${bridge.name}<br>${bridge.span} Meters long`)
    .addTo(map)
}

// Event catching, when you open the pop up, fly to and zoom into the target.
map.on("popupopen", async (e) => {
    map.flyTo(e.popup._latlng, 16);
});