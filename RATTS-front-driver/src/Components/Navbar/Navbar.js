import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure to import your CSS file

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to='/'><button className="nav-button">Home</button></Link>
      <Link to='/map'><button className="nav-button">Map</button></Link>
      <Link to='/mydetail'><button className="nav-button">My Detail</button></Link>
      <Link to='/traffic'><button className="nav-button">Contact Traffic</button></Link>
    </div>
  );
}

export default Navbar;
