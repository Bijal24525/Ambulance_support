import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TrafficList.css';
import Navbar from '../Navbar/Navbar';

function TrafficList() {
  const [Traffics, setTraffics] = useState([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetch('http://127.0.0.1:5000/traffic')
      .then(response => response.json())
      .then(data => setTraffics(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="traffic-list-container">
        <h1><b>Traffic List</b></h1>
        {Traffics.map(traffic => (
          <div className="traffic-card" key={traffic.traffic_id}>
            <h3><strong>{traffic.name}</strong></h3>
            <p><strong>Email:</strong> {traffic.email}</p>
            <p><strong>Contact:</strong> {traffic.contact}</p>
            <p><strong>Location:</strong> {traffic.location}</p>
            <p><strong>Role:</strong> {traffic.role}</p>
          </div>
        ))}
      </div>
      <div>
        <Link to="/" className="back-button">Back</Link>
      </div>
    </div>
  );
}

export default TrafficList;
