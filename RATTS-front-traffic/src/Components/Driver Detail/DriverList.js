// DriverList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DriverList.css';
import Navbar from '../Navbar/Navbar';

function DriverList() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetch('http://127.0.0.1:5000/driver')
      .then(response => response.json())
      .then(data => setDrivers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <Navbar/>
      <div className="driver-list-container">
        <h1><b>Driver List</b></h1>
        {drivers.map(driver => (
          <div className="driver-card" key={driver.driver_id}>
            <h3><strong>{driver.name}</strong></h3>
            <p><strong>Email:</strong> {driver.email}</p>
            <p><strong>Contact:</strong> {driver.contact}</p>
            <p><strong>Driver ID:</strong> {driver.driver_id}</p>
            <p><strong>Role:</strong> {driver.role}</p>
          </div>
        ))}
      </div>
      <div>
        <Link to="/" className="back-button">Back</Link>
      </div>
    </div>
  );
}

export default DriverList;
