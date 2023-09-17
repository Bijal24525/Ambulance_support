import React, { useState, useEffect } from 'react';
import './locationRoute.css';
import Navbar from '../Navbar/Navbar';


function LocationRoute() {
  const [routeData, setRouteData] = useState([]);
  const [loading, setLoading] = useState(true);

  



  useEffect(() => {
    // Fetch data from your API
    fetch('http://127.0.0.1:5000/routing') // Replace with your API endpoint
      .then((response) => response.json())
      .then(async (data) => {
        console.log(data);
        // const routeDataWithNames = await fetchPlaceNames(data);
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRouteData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const generateGoogleMapsURL = (source, destination) => {
    const sourceLatLng = source.split(',');
    const destinationLatLng = destination.split(',');
    
    // Construct the Google Maps URL
    const url = `https://www.google.com/maps/dir/?api=1&origin=${sourceLatLng[0]},${sourceLatLng[1]}&destination=${destinationLatLng[0]},${destinationLatLng[1]}`;
    
    return url;
  };



  return (
    <div className="App">
      <div>
        <Navbar />
      </div>
      <h1><b>Route Information</b></h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className='route-table'>
          <thead>
            <tr>
              <th>Driver Name</th>
              <th>Date</th>
              <th>Driver Location</th>
              <th>Destination</th>
              
              <th>View Map</th>
            </tr>
          </thead>
          <tbody>
            {routeData.map((route, index) => (
              
      

              <tr key={index}>
                <td>{route.did}</td>
                <td>{new Date(route.createdAt).toLocaleString()}</td>
                {/* <td>{route.source}</td> */}
                <td>{route.source}</td>
                <td>{route.destination}</td>
                {/* <td>{route.destination}</td> */}
                
                {/* <td>{route.createdAt}</td> */}
                <td>
                  <a
                    href={generateGoogleMapsURL(route.source, route.destination)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <u>Open Google Maps</u>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LocationRoute;