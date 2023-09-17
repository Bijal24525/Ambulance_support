import React, { useEffect } from 'react';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

function LeafletMap({ source, destination }) {
  useEffect(() => {
    // Create a map instance
    const map = L.map('leaflet-map').setView([source.lat, source.lon], 13);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Add markers for source and destination
    L.marker([source.lat, source.lon]).addTo(map).bindPopup('Source');
    L.marker([destination.lat, destination.lon]).addTo(map).bindPopup('Destination');
  }, [source, destination]);

  return (
    <div id="leaflet-map" style={{ width: '100%', height: '400px' }}></div>
  );
}

export default LeafletMap;
