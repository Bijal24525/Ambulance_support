// UserInformation.js
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../Context/Context';
import axios from 'axios';
import './styles.css';
import Navbar from '../Navbar/Navbar';

function MyDetail() {
    const { user } = useContext(LoginContext);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        // Fetch all driver details
        axios.get('http://localhost:5000/driver')
            .then(response => {
                const driversData = response.data;
                const matchedDriver = driversData.find(driver => driver.name === user);
                if (matchedDriver) {
                    setUserDetails(matchedDriver);
                }
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
    }, [user]);

    return (
        <div>
            <Navbar />
            <h1><b>User Information</b></h1>
            {userDetails ? (
                <div  className="user-information-container">
                    <p><strong>Name:</strong> {userDetails.name}</p>
                    <p><strong>Driver ID:</strong> {userDetails.driver_id}</p>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    <p><strong>Contact:</strong> {userDetails.contact}</p>
                    <p><strong>Location:</strong> {userDetails.location}</p>
                    <p><strong>Role:</strong> {userDetails.role}</p>
                </div>
            ) : (
                <p>Loading user information...</p>
            )}
            <div>
              <Link to="/" className="back-button">Back</Link>
            </div>
        </div>
    );
}

export default MyDetail;
