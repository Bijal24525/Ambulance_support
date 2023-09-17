import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvent, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import './map.css';


// import { LoginContext } from '../Context/Context';

const LocationMap = () => {
  const mapRef = useRef(null);
  const [destination, setDestination] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [center, setCenter] = useState([27.670937, 85.439572]); // Initial center
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter([latitude, longitude]);
          setCurrentLocation({ lat: latitude, lon: longitude });
          fetchNearbyHospitals({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.log('Error retrieving location', error);
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  const fetchNearbyHospitals = async (location) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lon}&format=json`
      );
      const data = await response.json();
      const query = `hospitals+in+Bhaktapur`;
      const nearbyResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=10`
      );
      const nearbyData = await nearbyResponse.json();
      setHospitals(nearbyData);
    } catch (error) {
      console.log('Error occurred while fetching nearby hospitals', error);
    }
  };

  useEffect(() => {
    const map = mapRef.current;
    if (map && destination && currentLocation) {
      // Remove previous destination marker and route
      map.eachLayer((layer) => {
        if (layer instanceof L.Routing.Control) {
          map.removeControl(layer);
        }
      });
  
      // Remove all markers
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });
  
      // Add new destination marker with custom icon
      const destinationIcon = L.divIcon({ className: 'custom-destination-marker' });
      L.marker(destination, { icon: destinationIcon }).addTo(map);
  
      // Add new current location marker with custom icon
      const currentLocationIcon = L.divIcon({ className: 'custom-current-location-marker' });
      L.marker([currentLocation.lat, currentLocation.lon], { icon: currentLocationIcon }).addTo(map);
  
      // Create a routing control with two waypoints: current location and destination
      const routingControl1 = L.Routing.control({
        waypoints: [
          L.latLng(currentLocation.lat, currentLocation.lon), // Current location as starting point
          destination, // Destination as the endpoint
        ],
      }).addTo(map);
  
      // Create another routing control with reversed waypoints to get another route
      const routingControl2 = L.Routing.control({
        waypoints: [
          destination, // Destination as starting point
          L.latLng(currentLocation.lat, currentLocation.lon), // Current location as the endpoint
        ],
      }).addTo(map);
  
      // Fit the map bounds to include the current location and the destination
      const bounds = L.latLngBounds([currentLocation, destination]);
      map.fitBounds(bounds);
  
      // Remove the routing controls when a new destination is selected
      return () => {
        map.removeControl(routingControl1);
        map.removeControl(routingControl2);
      };
    }
  }, [destination, currentLocation]);
  


  // useEffect(() => {
  //   const map = mapRef.current;
  //   if (map && destination && currentLocation) {
  //     // Remove previous destination marker and route
  //     map.eachLayer((layer) => {
  //       if (layer instanceof L.Routing.Control) {
  //         map.removeControl(layer);
  //       }
  //     });

  //     // Remove all markers
  //     map.eachLayer((layer) => {
  //       if (layer instanceof L.Marker) {
  //         map.removeLayer(layer);
  //       }
  //     });

  //     // Add new destination marker with custom icon
  //     const destinationIcon = L.divIcon({ className: 'custom-destination-marker' });
  //     L.marker(destination, { icon: destinationIcon }).addTo(map);

  //     // Add new current location marker with custom icon
  //     const currentLocationIcon = L.divIcon({ className: 'custom-current-location-marker' });
  //     L.marker([currentLocation.lat, currentLocation.lon], { icon: currentLocationIcon }).addTo(map);

  //     // Create a routing control with the current location as the starting point and the destination
  //     const routingControl = L.Routing.control({
  //       waypoints: [
  //         L.latLng(currentLocation.lat, currentLocation.lon), // Current location as starting point
  //         destination, // Destination as the endpoint
  //       ],
  //     }).addTo(map);

  //     // Fit the map bounds to include both the current location and the destination
  //     const bounds = L.latLngBounds([currentLocation, destination]);
  //     map.fitBounds(bounds);

  //     // Remove the routing control when a new destination is selected
  //     return () => {
  //       map.removeControl(routingControl);
  //     };
  //   }
  // }, [destination, currentLocation]);

  // useEffect(() => {
  //   const map = mapRef.current;
  //   if (map && destination && currentLocation) {
  //     // Remove previous destination marker and route
  //     map.eachLayer((layer) => {
  //       if (layer instanceof L.Marker || layer instanceof L.Routing.Control) {
  //         map.removeLayer(layer);
  //       }
  //     });
  
  //     // Add new destination marker with custom icon
  //     const destinationIcon = L.divIcon({ className: 'custom-destination-marker' });
  //     L.marker(destination, { icon: destinationIcon }).addTo(map);
  
  //     // Add new current location marker with custom icon
  //     const currentLocationIcon = L.divIcon({ className: 'custom-current-location-marker' });
  //     L.marker([currentLocation.lat, currentLocation.lon], { icon: currentLocationIcon }).addTo(map);
  
  //     // Create a routing control with the current location as the starting point and the destination
  //     const routingControl = L.Routing.control({
  //       waypoints: [
  //         L.latLng(currentLocation.lat, currentLocation.lon), // Current location as starting point
  //         destination, // Destination as the endpoint
  //       ],
  //     }).addTo(map);
  
  //     // Fit the map bounds to include both the current location and the destination
  //     const bounds = L.latLngBounds([currentLocation, destination]);
  //     map.fitBounds(bounds);
  
  //     // Remove the routing control when a new destination is selected
  //     return () => {
  //       map.removeControl(routingControl);
  //     };
  //   }
  // }, [destination, currentLocation]);
  

  // useEffect(() => {
  //   const map = mapRef.current;
  //   if (map && destination && currentLocation) {
  //     // Remove previous destination marker and route
  //     map.eachLayer((layer) => {
  //       if (layer instanceof L.Marker || layer instanceof L.Routing.Control) {
  //         map.removeLayer(layer);
  //       }
  //     });
  
  //     // Add new destination marker
  //     L.marker(destination).addTo(map);
  
  //     // Create a routing control with the current location as the starting point and the destination
  //     const routingControl = L.Routing.control({
  //       waypoints: [
  //         L.latLng(currentLocation.lat, currentLocation.lon), // Current location as starting point
  //         destination, // Destination as the endpoint
  //       ],
  //     }).addTo(map);
  
  //     // Fit the map bounds to include both the current location and the destination
  //     const bounds = L.latLngBounds([currentLocation, destination]);
  //     map.fitBounds(bounds);
  
  //     // Remove the routing control when a new destination is selected
  //     return () => {
  //       map.removeControl(routingControl);
  //     };
  //   }
  // }, [destination, currentLocation]);
  

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setDestination(L.latLng(lat, lng));
    setSelectedHospital(null); // Clear selected hospital
  };

  const handleSearch = async (searchInput) => {
    if (searchInput) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${searchInput}&format=json&limit=1`
        );
        const data = await response.json();
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setDestination(L.latLng(lat, lon));
          setSelectedHospital(null); // Clear selected hospital
        } else {
          console.log('Location not found');
        }
      } catch (error) {
        console.log('Error occurred during geocoding', error);
      }
    }
  };

  function SearchForm({ onSearch }) {
    const handleSubmit = (event) => {
      event.preventDefault();
      const searchInput = event.target.elements.search.value;
      onSearch(searchInput);
    };

    return (
      <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
        <input type="text" name="search" placeholder="Search location" />
        <button type="submit">Search</button>
      </form>
    );
  }

  function MapClickHandler() {
    useMapEvent('click', handleMapClick);
    return null;
  }

  const handleMarkerClick = (hospital) => {
    setDestination(L.latLng(hospital.lat, hospital.lon));
    setSelectedHospital(hospital);
  };

  const handleMarkerMouseOver = (hospital) => {
    setSelectedHospital(hospital);
  };

  const handleMarkerMouseOut = () => {
    setSelectedHospital(null);
  };


  // const {user, setUser} = useContext(LoginContext)
  // const handleLogout=()=>{
  //     setUser(null)
  //     // Removing data from local storage
  //     localStorage.removeItem('userName');

  //     console.log("logout")
  // }

  return (
    <div className="App">
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: '1000',
        }}
      > 
      {/* <p style={{fontSize:22,color:'green'}}>Hello {user}</p> */}
        <SearchForm onSearch={handleSearch} />
      </div>
      {/* <div style={{display:'flex', alignItems:'center', justifyContent:'right'}}>
        <button style={{backgroundColor:'red', borderWidth:'2px',height:40,width:100,}} onClick={handleLogout}>LOGOUT</button>
      </div> */}

      <MapContainer center={center} zoom={13} style={{ height: '800px', marginTop: '60px' }} ref={mapRef} markerPane={null}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        />
        {currentLocation && (
          <Marker
            position={[currentLocation.lat, currentLocation.lon]}
            icon={L.divIcon({ className: 'current-location-marker' })}
          />
        )}
        {/* {currentLocation && <Marker position={[currentLocation.lat, currentLocation.lon]} />} */}
        {hospitals.map((hospital, index) => (
          <Marker
            key={index}
            position={[hospital.lat, hospital.lon]}
            eventHandlers={{
              click: () => handleMarkerClick(hospital),
              mouseover: () => handleMarkerMouseOver(hospital),
              mouseout: handleMarkerMouseOut,
            }}
            icon={L.divIcon({ className: 'custom-marker-icon' })}
          >
            {selectedHospital === hospital && (
              <Popup>
                <strong>{hospital.display_name}</strong>
                <br />
                <button onClick={() => setDestination(L.latLng(hospital.lat, hospital.lon))}>
                  Route to Hospital
                </button>
              </Popup>
            )}
          </Marker>
        ))}
        <MapClickHandler />
      </MapContainer>
    </div>
  );
}

export default LocationMap;
