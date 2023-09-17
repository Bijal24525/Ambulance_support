import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const LocationMap = ({ driverLocation, destination }) => {
  return (
    <MapContainer center={driverLocation} zoom={10} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={driverLocation}>
        <Popup>Driver's Current Location</Popup>
      </Marker>
      <Marker position={destination}>
        <Popup>Destination</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationMap;






// import React, { useEffect, useRef, useState } from 'react';
// import { MapContainer, TileLayer, useMap, useMapEvent, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import 'leaflet-routing-machine';

// function LocationMap() {
//   const mapRef = useRef(null);
//   const [destination, setDestination] = useState(null);
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [center, setCenter] = useState([27.670937, 85.439572]); // Initial center
//   const [hospitals, setHospitals] = useState([]);
//   const [selectedHospital, setSelectedHospital] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       const watchId = navigator.geolocation.watchPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setCenter([latitude, longitude]);
//           setCurrentLocation({ lat: latitude, lon: longitude });
//           fetchNearbyHospitals({ lat: latitude, lon: longitude });
//         },
//         (error) => {
//           console.log('Error retrieving location', error);
//         }
//       );

//       return () => {
//         navigator.geolocation.clearWatch(watchId);
//       };
//     } else {
//       console.log('Geolocation is not supported by this browser.');
//     }
//   }, []);

//   const fetchNearbyHospitals = async (location) => {
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lon}&format=json`
//       );
//       const data = await response.json();
//       const query = `hospitals+in+Bhaktapur`;
//       const nearbyResponse = await fetch(
//         `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=10`
//       );
//       const nearbyData = await nearbyResponse.json();
//       setHospitals(nearbyData);
//     } catch (error) {
//       console.log('Error occurred while fetching nearby hospitals', error);
//     }
//   };

//   useEffect(() => {
//     const map = mapRef.current;
//     if (map && destination && currentLocation) {
//       // Remove previous destination marker and route
//       map.eachLayer((layer) => {
//         if (layer instanceof L.Marker || layer instanceof L.Routing.Control) {
//           map.removeLayer(layer);
//         }
//       });

//       // Add new destination marker
//       L.marker(destination).addTo(map);

//       // Create a routing control with the current location as the starting point and the destination
//       const routingControl = L.Routing.control({
//         waypoints: [
//           L.latLng(currentLocation.lat, currentLocation.lon), // Current location as starting point
//           destination, // Destination as the endpoint
//         ],
//       }).addTo(map);

//       // Fit the map bounds to include both the current location and the destination
//       const bounds = L.latLngBounds([currentLocation, destination]);
//       map.fitBounds(bounds);

//       // Remove the routing control when a new destination is selected
//       return () => {
//         map.removeControl(routingControl);
//       };
//     }
//   }, [destination, currentLocation]);

//   const handleMapClick = (e) => {
//     const { lat, lng } = e.latlng;
//     setDestination(L.latLng(lat, lng));
//     setSelectedHospital(null); // Clear selected hospital
//   };

//   const handleSearch = async (searchInput) => {
//     if (searchInput) {
//       try {
//         const response = await fetch(
//           `https://nominatim.openstreetmap.org/search?q=${searchInput}&format=json&limit=1`
//         );
//         const data = await response.json();
//         if (data.length > 0) {
//           const { lat, lon } = data[0];
//           setDestination(L.latLng(lat, lon));
//           setSelectedHospital(null); // Clear selected hospital
//         } else {
//           console.log('Location not found');
//         }
//       } catch (error) {
//         console.log('Error occurred during geocoding', error);
//       }
//     }
//   };

//   function SearchForm({ onSearch }) {
//     const handleSubmit = (event) => {
//       event.preventDefault();
//       const searchInput = event.target.elements.search.value;
//       onSearch(searchInput);
//     };

//     return (
//       <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
//         <input type="text" name="search" placeholder="Search location" />
//         <button type="submit">Search</button>
//       </form>
//     );
//   }

//   function MapClickHandler() {
//     useMapEvent('click', handleMapClick);
//     return null;
//   }

//   const handleMarkerClick = (hospital) => {
//     setDestination(L.latLng(hospital.lat, hospital.lon));
//     setSelectedHospital(hospital);
//   };

//   const handleMarkerMouseOver = (hospital) => {
//     setSelectedHospital(hospital);
//   };

//   const handleMarkerMouseOut = () => {
//     setSelectedHospital(null);
//   };

//   return (
//     <div className="App">
//       <div
//         style={{
//           position: 'absolute',
//           top: '10px',
//           left: '50%',
//           transform: 'translateX(-50%)',
//           zIndex: '1000',
//         }}
//       >
        
//         <SearchForm onSearch={handleSearch} />
//       </div>
//       <MapContainer center={center} zoom={13} style={{ height: '800px', marginTop: '60px' }} ref={mapRef}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
//         />
//         {currentLocation && <Marker position={[currentLocation.lat, currentLocation.lon]} />}
//         {hospitals.map((hospital, index) => (
//           <Marker
//             key={index}
//             position={[hospital.lat, hospital.lon]}
//             eventHandlers={{
//               click: () => handleMarkerClick(hospital),
//               mouseover: () => handleMarkerMouseOver(hospital),
//               mouseout: handleMarkerMouseOut,
//             }}
//           >
//             {selectedHospital === hospital && (
//               <Popup>
//                 <strong>{hospital.display_name}</strong>
//                 <br />
//                 <button onClick={() => setDestination(L.latLng(hospital.lat, hospital.lon))}>
//                   Route to Hospital
//                 </button>
//               </Popup>
//             )}
//           </Marker>
//         ))}
//         <MapClickHandler />
//       </MapContainer>
//     </div>
//   );
// }

// export default LocationMap;
