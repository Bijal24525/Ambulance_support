import React, { useContext, useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvent, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { LoginContext } from '../Context/Context';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './map.css';
import Navbar from '../Navbar/Navbar';

function LocationMap() {
  const mapRef = useRef(null);
  const [destination, setDestination] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [center, setCenter] = useState([27.670937, 85.439572]); // Initial center
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [shortestDistance, setShortestDistance] = useState(null);
  const [longestDistance, setLongestDistance] = useState(null);
  const [shortestRoute, setShortestRoute] = useState(null);
  const [longestRoute, setLongestRoute] = useState(null);


  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude} = position.coords;
          setCenter([latitude, longitude]);
          setCurrentLocation({ lat: latitude, lon: longitude});
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
    let routingControl =null;

    if (map && destination && currentLocation) {
      // Remove previous destination marker and route
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
          layer.remove(); // Use remove() method to remove layers
        }
      });

      // Add new destination marker
      L.marker(destination).addTo(map);

      console.log("Hello from destination");

      console.log(destination);      

      // Create a routing control with the current location as the starting point and the destination
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(currentLocation.lat, currentLocation.lon),
          destination,
        ],
      }).addTo(map);

      // const colors = ['blue', 'green', 'red', 'yellow'];
      // let colorIndex = 0;
      const routes = [];
      // let longestRoute = null;


      routingControl.on('routesfound',(e) => {
        const calculatedRoutes = e.routes;

        let shortestDistance = Infinity;
        let shortestRoute = null;
        let longestDistance = 0;
        let longestRoute = null;

        calculatedRoutes.forEach((route) => {
          const routeDistance = calculateRouteDistance(route.coordinates);

          if (routeDistance < shortestDistance) {
            shortestDistance = routeDistance;
            shortestRoute = route;
          }
      
          if (routeDistance > longestDistance) {
            longestDistance = routeDistance;
            longestRoute = route;
          }
          routes.push(route);

          const polyline = L.polyline(route.coordinates,{
            color: 'blue',
          }).addTo(map);

          // Check if the current route is the shortest or longest
          // if (!shortestRoute || route.summary.totalDistance < shortestRoute.summary.totalDistance) {
          //   if (shortestRoute) {
          //     shortestRoute.polyline.setStyle({ color: 'dimgray' }); // Reset color of previous shortest route
          //   }
          //   shortestRoute = route;
          //   polyline.setStyle({ color: 'red' }); // Set color for shortest route
          // } else if (!longestRoute || route.summary.totalDistance > longestRoute.summary.totalDistance) {
          //   if (longestRoute) {
          //     longestRoute.polyline.setStyle({ color: 'dimgray' }); // Reset color of previous longest route
          //   }
          //   longestRoute = route;
          //   polyline.setStyle({ color: 'dimgray' }); // Set color for longest route
          // }
          // const routeDistance = calculateRouteDistance(route.coordinates);
          
          // if (!shortestDistance || routeDistance < shortestDistance) {
          //   setShortestDistance(routeDistance);
          //   setShortestRoute(route);
          // }

          // if (!longestDistance || routeDistance > longestDistance) {
          //   setLongestDistance(routeDistance);
          //   setLongestRoute(route);
          // }

          polyline.on('click',() =>{
            polyline.setStyle({ color: 'blue'});
          });
        });
        
        //Highlight the shortest route
        // const shortestRoute = getShortestRoute(routes);
        // if(shortestRoute){
        //   shortestRoute.polyline.setStyle({color: 'red'});
        // }
        
      });

      // Fit the map bounds to include both the current location and the destination
      const bounds = L.latLngBounds([currentLocation, destination]);
      map.fitBounds(bounds);

      // Remove the routing control when a new destination is selected
      return () => {
        if (routingControl) {
          routingControl.remove(); // Use remove() method to remove the routing control
        }
      };
    }
  }, [destination, currentLocation]);


  // Function to get the shortest route from an array of routes
  function getShortestRoute(routes) {
    let shortestRoute = null;
    let shortestDistance = Infinity;

    routes.forEach((route) => {
      const routeDistance = calculateRouteDistance(route.coordinates);
      if (routeDistance < shortestDistance) {
        shortestDistance = routeDistance;
        shortestRoute = route;
      }
    });

    return shortestRoute;
  }

  // Function to calculate the distance of a route
  function calculateRouteDistance(coordinates) {
    let distance = 0;

    for (let i = 1; i < coordinates.length; i++) {
      distance += coordinates[i - 1].distanceTo(coordinates[i]);
    }

    return distance;
  }

  function getRandomColor(){
    const letters = '0123456789ABCDEF';
    let color = '#';
    for(let i=0; i<6; i++){
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
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

  const {user, setUser} = useContext(LoginContext)
  const handleLogout=()=>{
      setUser(null)
      // Removing data from local storage
      localStorage.removeItem('userName');

      console.log("logout")
  }

  //for notification service

  const sendNotification = async () => {
    if (!selectedHospital || !selectedHospital.lat || !selectedHospital.lon) {
    // Construct the notification data
      console.log("Hello from Notification");
    return;
    }
    const notificationData = {      
      hospitalLocation: selectedHospital,
      currentUserLocation: currentLocation,
    };

    console.log("Notification Data: ",notificationData);

    try {
      // const response = await axios.post('http://127.0.0.1:5000/send_notification', notificationData);

      axios
      .post('http://127.0.0.1:5000/send_notification', notificationData)
      .then( response => {
        if (response.data.success) {
          console.log(response.data.message);
          toast.success('Notifications sent successfully');



          }
        else {
          toast.error('Failed to send notifications');
          }
      });
      
    } catch (error) {
      console.log('Error sending notifications', error);
    }
  };

  const makeEntry = async(notificationData) => {
    console.log("make entry",notificationData);
    try{
      axios
      .post('http://127.0.0.1:5000/routing',notificationData)
    }
    catch(error){
      console.error("Error while insert");
    }
  };
  const sendSMS = async () => {
    if (!selectedHospital || !selectedHospital.lat || !selectedHospital.lon) {
    // Construct the notification data
      console.log("Hello from SMS");
    return;
    }
    const notificationData = {
      currentUser: user,
      hospitalLocation: selectedHospital,
      currentUserLocation: currentLocation,
    };

    console.log("Notification Data: ",notificationData);

    try {
      // const response = await axios.post('http://127.0.0.1:5000/send_notification', notificationData);

      axios
      .post('http://127.0.0.1:5000/send_sms', notificationData)
      .then( response => {
        if (response.data.success) {
          console.log(response.data.message);
          console.log("hello");
          makeEntry(notificationData);
          toast.success('SMS sent successfully');
          }
        else {
          toast.error('Failed to send sms');
          }
      });

      
      // .then(response =>{
      //   if(response.data.success){
      //     console.log("successfully make entry on database");
      //   }
      //   else{
      //     console.error("Error while making entry on db");
      //   }
      // });

      
    } catch (error) {
      console.log('Error sending sms', error);
    }

  };


  return (
    <div className="Map">
      <Navbar />
      <div
        style={{
          position: 'absolute',
          top: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: '1000',
        }}
      > <p style={{fontSize:22,color:'green'}}>Hello {user}</p>
        <SearchForm onSearch={handleSearch} />
      </div>

      <div style={{display:'flex', alignItems:'center', justifyContent:'right'}}>
          {/* for notification */}
        <button style={{backgroundColor:'blue', borderWidth:'2px',height:40,width:200, color:'white',}} onClick={sendNotification}>Send Notifications</button>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        {/* end of notification */}
        {/* <button style={{backgroundColor:'red', borderWidth:'2px',height:40,width:100,}} onClick={handleLogout}>LOGOUT</button> */}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
        {/* Add the button for sending SMS */}
        <button style={{ backgroundColor: 'blue', borderWidth: '2px', height: 40, width: 200, color: 'white' }} onClick={sendSMS}>
          Send Emergency SMS
        </button>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      </div>
      {/* <div className="instructions-control">
        {shortestDistance && (
          <p>Shortest Distance: {shortestDistance.toFixed(2)} meters</p>
        )}<br/>
        {longestDistance && (
          <p>Longest Distance: {longestDistance.toFixed(2)} meters</p>
        )}
      </div> */}
      <MapContainer center={center} zoom={13} style={{ height: '800px', marginTop: '60px' }} ref={mapRef}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        />
        {currentLocation && (
          <Marker
            position={[currentLocation.lat, currentLocation.lon]}
            icon={L.divIcon({
              className: 'current-location-marker',
              iconSize: [30, 30],
            })}
          />
        )}

        {destination && (
          <Marker
            position={[destination.lat, destination.lng]}
            icon={L.divIcon({
              className: 'custom-destination-marker', // Use your CSS class for destination marker
              iconSize: [30, 30], // Adjust the icon size as needed
            })}
          />
        )}

        {/* {currentLocation && <Marker position={[currentLocation.lat, currentLocation.lon]} />} */}
        {hospitals.map((hospital, index) => {
          console.log('hospital data:', hospital);
          return(
          <Marker
            key={index}
            position={[hospital.lat, hospital.lon,]}
            eventHandlers={{
              click: () => handleMarkerClick(hospital),
              mouseover: () => handleMarkerMouseOver(hospital),
              mouseout: handleMarkerMouseOut,
            }}
            icon={L.divIcon({ className: 'custom-marker-icon', iconSize: [30,30] })}
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
          );
        })}
        <MapClickHandler />
      </MapContainer>
    </div>
  );
}

export default LocationMap;
